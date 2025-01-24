import { useContext, useEffect, useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import AuthContext from "../../context/AuthContext/AuthContext";
import useCart from "../../hooks/useCart";

const CheckoutForm = ({ packageName, price }) => {
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [clientSecret, setClientSecret] = useState("");
  const stripe = useStripe();
  const user = useContext(AuthContext);
  const elements = useElements();
  const [cart, refetch] = useCart();
  const totalPrice = price;

  useEffect(() => {
    axios
      .post("http://localhost:3000/create-payment-intent", {
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
      console.log(error);
      setProcessing(false);
      return;
    }

    // Send the token and package info to your backend to complete the purchase
    // const paymentData = {
    //   token: token.id,
    //   packageName,
    //   price,
    // };

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
      console.log("confirmError: ", confirmError);
      setProcessing(false);

      return;
    }
    if (paymentIntent.status === "succeeded") {
      console.log(paymentIntent);
      setProcessing(false);

      const payment = {
        email: user.email,
        price: totalPrice,
        date: new Date(),
        transactionId: paymentIntent.id,
        cartId: cart.map(item => item._id),
        menuName: cart.map(item => item.packageName),
      }

      const res = await axios.post('/payment', payment);
      console.log("Payment Saved: ",res);

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
