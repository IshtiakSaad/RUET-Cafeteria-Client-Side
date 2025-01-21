import React from "react";

const HostelBenefits = () => {
  const benefits = [
    {
      icon: "🍽️",
      title: "Diverse Meals",
      description: "Enjoy a variety of cuisines catered to your preferences.",
    },
    {
      icon: "⚡",
      title: "Fast Updates",
      description: "Get instant updates on daily and upcoming meals.",
    },
    {
      icon: "🔒",
      title: "Secure Reviews",
      description: "Submit feedback securely and anonymously.",
    },
  ];

  return (
    <section className="py-16 bg-gray-50 text-gray-800 w-3/4 mx-auto rounded-lg">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-8">Why Choose Our System?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="flex flex-col items-center p-6 bg-white shadow-md rounded-lg"
            >
              <span className="text-5xl">{benefit.icon}</span>
              <h3 className="text-xl font-semibold mt-4">{benefit.title}</h3>
              <p className="text-gray-600 mt-2">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HostelBenefits;
