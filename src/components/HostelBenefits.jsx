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
      <section className="py-16 bg-gradient-to-b from-gray-100 to-white text-gray-800 w-11/12 lg:w-3/4 mx-auto rounded-2xl shadow-xl">
        <div className="container mx-auto px-6 text-center">
          {/* Section Heading */}
          <h2 className="text-4xl font-extrabold mb-8 text-gray-900">
            Why Choose Our System?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-12">
            Our hostel management system provides the perfect balance of
            convenience, security, and variety to enhance your dining experience.
          </p>
  
          {/* Benefits Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="group relative flex flex-col items-center p-8 bg-white shadow-md rounded-xl transition-transform transform hover:scale-105"
              >
                {/* Icon */}
                <div className="text-6xl mb-6 text-gray-800 group-hover:scale-110 transition-transform">
                  {benefit.icon}
                </div>
                {/* Title */}
                <h3 className="text-2xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
                  {benefit.title}
                </h3>
                {/* Description */}
                <p className="text-gray-600 mt-4">
                  {benefit.description}
                </p>
  
                {/* Subtle Glow */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-500 to-pink-500 opacity-0 group-hover:opacity-10 transition-opacity"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };
  
  export default HostelBenefits;
  