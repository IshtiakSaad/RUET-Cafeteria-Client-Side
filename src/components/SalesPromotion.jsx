const SalesPromotions = () => {
    const promotions = [
      {
        icon: "🔥",
        title: "Limited-Time Discount",
        description: "Get 20% off on your first meal subscription!",
      },
      {
        icon: "🥘",
        title: "Combo Meal Offers",
        description: "Enjoy budget-friendly meal combos at discounted rates.",
      },
      {
        icon: "🎁",
        title: "Referral Rewards",
        description: "Invite friends & earn exclusive meal vouchers.",
      },
    ];
  
    return (
      <section className="py-16 bg-gradient-to-b from-gray-100 to-white text-gray-800 w-11/12 lg:w-3/4 mx-auto rounded-2xl shadow-xl mt-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-extrabold mb-8 text-gray-900">
            Special Offers & Discounts
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-12">
            Save more on your meals with our exclusive deals and limited-time offers.
          </p>
  
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {promotions.map((promo, index) => (
              <div
                key={index}
                className="group relative flex flex-col items-center p-8 bg-white shadow-md rounded-xl transition-transform transform hover:scale-105"
              >
                <div className="text-6xl mb-6 text-gray-800 group-hover:scale-110 transition-transform">
                  {promo.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 group-hover:text-red-600 transition-colors">
                  {promo.title}
                </h3>
                <p className="text-gray-600 mt-4">{promo.description}</p>
  
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-500 to-pink-500 opacity-0 group-hover:opacity-10 transition-opacity"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };
  
  export default SalesPromotions;
  