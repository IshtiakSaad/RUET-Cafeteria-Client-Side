import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext/AuthContext";
import axios from "axios";

const MembershipSection = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const membershipPlans = [
    {
      name: "Silver",
      price: "10",
      description: "Basic membership with essential features.",
      redirectTo: "/checkout/Silver",
    },
    {
      name: "Gold",
      price: "20",
      description: "Intermediate plan with additional benefits.",
      redirectTo: "/checkout/Gold",
    },
    {
      name: "Platinum",
      price: "30",
      description: "Comprehensive plan with all features.",
      redirectTo: "/checkout/Platinum",
    },
  ];

  const handleSubscribe = (plan) => {
    const cartItem = {
      uid: user.uid,
      email: user.email,
      price: plan.price,
      packageName: plan.name,  // Add the package name
    };
    console.log(cartItem);
    axios
      .post("http://localhost:3000/cart", cartItem)
      .then((res) => console.log(res.data));

    navigate(`/checkout/${plan.name}`);  // Navigate with the plan name
  };

  return (
    <section className="w-11/12 lg:w-3/4 mx-auto my-10 text-center">
      <h2 className="text-3xl md:text-4xl font-bold mb-6">Membership Plans</h2>
      <p className="text-lg text-gray-600 mb-10">
        Choose the best plan that fits your needs.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {membershipPlans.map((plan) => (
          <div
            key={plan.name}
            className="card shadow-lg p-6 bg-white rounded-lg transform hover:scale-105 transition-transform"
          >
            <h3 className="text-xl font-bold mb-4 text-indigo-600">
              {plan.name}
            </h3>
            <p className="text-2xl font-semibold mb-2">${plan.price}/month</p>
            <p className="text-gray-500 mb-6">{plan.description}</p>
            <button
              onClick={() => handleSubscribe(plan)}
              className="btn btn-primary w-full py-2 rounded-md font-semibold shadow-md"
            >
              Subscribe
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MembershipSection;
