import { useNavigate } from "react-router-dom";

const MembershipSection = () => {

    const navigate = useNavigate();

  const membershipPlans = [
    {
      name: "Silver",
      price: "$10/month",
      description: "Basic membership with essential features.",
      redirectTo: "/checkout/Silver",
    },
    {
      name: "Gold",
      price: "$20/month",
      description: "Intermediate plan with additional benefits.",
      redirectTo: "/checkout/Gold",
    },
    {
      name: "Platinum",
      price: "$30/month",
      description: "Comprehensive plan with all features.",
      redirectTo: "/checkout/Platinum",
    },
  ];

  const handleSubscribe = (url) => {
    navigate('/cart')
    console.log(`Redirect to: ${url}`);
    // Implement navigation logic (e.g., using React Router)
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
            <h3 className="text-xl font-bold mb-4 text-indigo-600">{plan.name}</h3>
            <p className="text-2xl font-semibold mb-2">{plan.price}</p>
            <p className="text-gray-500 mb-6">{plan.description}</p>
            <button
              onClick={() => handleSubscribe(plan.redirectTo)}
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
