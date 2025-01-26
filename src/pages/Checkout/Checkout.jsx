import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm"; // A component to handle the Stripe payment form

const stripePromise = loadStripe(
  "pk_test_51QklKNJfTblUr6MpB6dNv17yk7sovWbanNNLNkQSEyDQdEbSDve4MWoccacRCKxo9N9IISkKwHgGbhXnOEDJAhMv00nQliqlqc"
); // Replace with your Stripe public key

const Checkout = () => {
  const { packageName } = useParams(); // Retrieve the package name from URL
  const [packageDetails, setPackageDetails] = useState(null);

  useEffect(() => {
    // Fetch the package details for the selected plan
    const plans = {
      Silver: {
        price: 10,
        description: "Basic membership with essential features.",
      },
      Gold: {
        price: 20,
        description: "Intermediate plan with additional benefits.",
      },
      Platinum: {
        price: 30,
        description: "Comprehensive plan with all features.",
      },
    };

    setPackageDetails(plans[packageName]);
  }, [packageName]);

  if (!packageDetails) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-100 via-white to-blue-200">
        <p className="text-lg font-semibold text-gray-600 animate-pulse">Loading package details...</p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-tl from-blue-50 via-white to-indigo-100 py-32 py-20">
      <div className="w-full max-w-md p-8 bg-white shadow-xl rounded-2xl mx-auto">
        <h2 className="text-3xl font-extrabold text-indigo-600 mb-4 text-center">
          Checkout for {packageName} Plan
        </h2>
        <p className="text-lg text-gray-700 mb-4 text-center">
          {packageDetails.description}
        </p>
        <p className="text-xl font-semibold text-gray-800 mb-6 text-center">
          Price: ${packageDetails.price}/month
        </p>

        {/* Load Stripe Elements */}
        <div className="border-t border-gray-200 pt-6">
          <Elements stripe={stripePromise}>
            <CheckoutForm
              packageName={packageName}
              price={packageDetails.price}
            />
          </Elements>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
