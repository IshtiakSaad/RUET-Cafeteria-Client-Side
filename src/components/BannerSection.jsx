const BannerSection = () => {
    return (
      <section className="relative w-3/4 mx-auto rounded-lg overflow-hidden bg-gradient-to-r from-zinc-800 via-gray-500 to-black text-white">
        {/* Slider/Banner */}
        <div className="container mx-auto px-6 py-16 text-center lg:text-left relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Welcome to Hostel Dining
          </h1>
          <p className="text-lg md:text-xl mb-8">
            Manage your meals, explore categories, and enjoy a better hostel
            dining experience.
          </p>
  
          {/* Search Field */}
          <div className="flex justify-center lg:justify-start items-center gap-2">
            <input
              type="text"
              placeholder="Search meals or categories..."
              className="w-full max-w-md px-4 py-2 text-gray-800 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-300"
            />
            <button className="btn btn-primary px-6 py-2 rounded-md font-semibold shadow-md hover:bg-indigo-600">
              Search
            </button>
          </div>
        </div>
  
        {/* Decorative Image/Illustration */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://college.harvard.edu/sites/default/files/styles/max_800_x_985/public/2021-11/annenberg1.jpg?itok=TmbpheIL"
            alt="Banner Background"
            className="w-full h-full object-cover opacity-40"
          />
        </div>
      </section>
    );
  };
  
  export default BannerSection;
  