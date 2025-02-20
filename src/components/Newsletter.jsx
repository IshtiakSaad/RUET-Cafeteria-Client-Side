const NewsletterSection = () => {
    return (
      <section className="py-16 bg-gradient-to-b from-gray-900 to-gray-700 text-white w-11/12 lg:w-3/4 mx-auto rounded-2xl shadow-xl mb-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-extrabold mb-8">
            Stay Updated with Our Meals
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-8">
            Subscribe to receive the latest meal plans, discounts, and special announcements directly in your inbox.
          </p>
  
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full sm:w-2/3 px-5 py-3 rounded-lg text-gray-800 focus:outline-none"
            />
            <button className="bg-indigo-500 hover:bg-indigo-600 px-6 py-3 rounded-lg text-white font-semibold transition">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    );
  };
  
  export default NewsletterSection;
  