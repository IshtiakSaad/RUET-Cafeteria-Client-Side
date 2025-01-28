import { useEffect, useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import useCart from "../../hooks/useCart";
import { toast } from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const CheckoutForm = ({ packageName, price }) => {
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [clientSecret, setClientSecret] = useState("");
  const stripe = useStripe();
  //   const user = useContext(AuthContext);
  const user = useAuth();
  const elements = useElements();
  const [cart, refetch] = useCart();
  const totalPrice = price;
  const navigate = useNavigate();

  // console.log(user.user.email, user.user.uid);
  useEffect(() => {
    axios
      .post("https://ruet-hostel.vercel.app/create-payment-intent", {
        price: totalPrice,
      })
      .then((response) => {
        console.log(response.data);
        setClientSecret(response.data.clientSecret);
      });
  }, [totalPrice]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) return;

    setProcessing(true);

    const card = elements.getElement(CardElement);

    if (card === null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setError(error.message);
      toast.error("Payment method creation failed. Please try again.");
      setProcessing(false);
      return;
    }

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user.email,
          },
        },
      });

    if (confirmError) {
      toast.error("Payment confirmation failed. Please try again.");
      setProcessing(false);
      return;
    }

    if (paymentIntent.status === "succeeded") {
      toast.success("Payment successful! 🎉");

      const payment = {
        email: user.user.email,
        uid: user.user.uid,
        price: totalPrice,
        date: new Date(),
        transactionId: paymentIntent.id,
        cartId: cart.map((item) => item._id),
        menuName: cart.map((item) => item.packageName),
      };

      console.log("Client: ", payment);

      try {
        const res = await axios.post("https://ruet-hostel.vercel.app/payments", payment);
        console.log("Payment Saved: ", res);

        toast.success("Payment saved!");
      } catch (err) {
        console.log(err);
        toast.error("Failed to save payment in the database.");
      }
      refetch();
      setProcessing(false);
      navigate('/');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button
        className="btn"
        type="submit"
        disabled={processing || !stripe || !clientSecret}
      >
        {processing ? "Processing..." : "Pay Now"}
      </button>
      {error && <p className="text-red-500">{error}</p>}
    </form>
  );
};

export default CheckoutForm;
