import { useState, useEffect } from "react";

const images = [
  "https://eatdrinkflash.co.uk/wp-content/uploads/2021/06/DSC00807-scaled.jpg",
  "https://www.eat-and-breathe.co.uk/app/uploads/2023/12/SG231006_STM_GRP_E_B_Food_Photography_Blog_Assets_Oct_2023_1920x500_top_banner1__1_-768x500.jpeg",
  "https://www.photojaanic.com/blog/wp-content/uploads/sites/2/2017/07/food-photography-tips-photojaanic-3-1-1080x720.jpg",
];

const Banner = () => {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000); // Change image every 5 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-11/12 xl:w-3/4 mx-auto rounded-2xl overflow-hidden shadow-xl min-h-[400px] sm:min-h-[550px] lg:min-h-[650px] transition-all duration-700">
      {/* Image Slideshow */}
      <div className="absolute inset-0 transition-opacity duration-1000 ease-in-out">
        {images.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`Slide ${index + 1}`}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
              index === currentImage ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
      </div>

      {/* Overlay for Readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900/80 to-gray-800/40 z-10"></div>

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-20 px-6 sm:px-12">
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
          Welcome to RUET Hostel
        </h1>
        <p className="text-sm sm:text-lg font-light text-gray-300 mt-3 max-w-xl">
          Manage your meals, explore categories, and enjoy a seamless hostel
          dining experience.
        </p>

        {/* Search Field */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full max-w-lg mt-6">
          <input
            type="text"
            placeholder="Search meals or categories..."
            className="w-full px-6 py-3 rounded-full shadow-lg text-gray-900 focus:outline-none focus:ring-4 focus:ring-blue-500 transition-all duration-300 placeholder-gray-400"
          />
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-semibold shadow-lg focus:ring-4 focus:ring-blue-500 transition-all duration-300">
            Search
          </button>
        </div>
      </div>
    </section>
  );
};

export default Banner;
