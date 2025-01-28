import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext/AuthContext";
import axios from "axios";
import toast from "react-hot-toast";

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
    if (!user) {
        toast.error(`You must be logged in Subscribe to ${plan.name} plan.`);
      return;
    }

    const cartItem = {
      uid: user.uid,
      email: user.email,
      price: plan.price,
      packageName: plan.name,
    };
    console.log(cartItem);
    axios.post("https://ruet-hostel.vercel.app/cart", cartItem).then((res) => console.log(res.data));

    navigate(`/checkout/${plan.name}`);
  };

  return (
    <section className="w-11/12 lg:w-3/4 mx-auto my-16 text-center">
      <h2 className="text-4xl font-extrabold mb-4 text-gray-800">Membership Plans</h2>
      <p className="text-lg text-gray-600 mb-10">Choose the best plan tailored to your needs.</p>

      {/* Membership Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {membershipPlans.map((plan) => (
          <div
            key={plan.name}
            className="relative group bg-white rounded-xl shadow-xl p-6 transition-transform transform hover:scale-105 hover:shadow-2xl"
          >
            {/* Card Border Effect */}
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-500 to-pink-500 opacity-0 group-hover:opacity-20 pointer-events-none transition-opacity"></div>

            <h3 className="text-2xl font-bold mb-4 text-gray-800">{plan.name}</h3>
            <p className="text-4xl font-extrabold text-gray-900 mb-2">${plan.price}<span className="text-lg">/month</span></p>
            <p className="text-gray-600 mb-6">{plan.description}</p>
            <button
              onClick={() => handleSubscribe(plan)}
              className="w-full py-3 text-white bg-indigo-600 rounded-lg shadow-md font-semibold hover:bg-indigo-700 transition-colors"
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
