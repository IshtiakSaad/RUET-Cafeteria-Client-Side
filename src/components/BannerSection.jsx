import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // import the carousel's CSS

const Banner = () => {
  return (
    <section className="relative w-11/12 lg:w-3/4 mx-auto rounded-2xl overflow-hidden bg-gradient-to-r from-gray-800 to-gray-900 text-white shadow-2xl">
      {/* Slider Content */}
      <div className="container mx-auto px-8 py-16 text-center lg:text-left relative z-10">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 leading-tight tracking-wide">
          Welcome to Hostel Dining
        </h1>
        <p className="text-base sm:text-lg md:text-xl font-light mb-10">
          Manage your meals, explore categories, and enjoy a seamless hostel
          dining experience.
        </p>

        {/* Search Field */}
        <div className="flex flex-col lg:flex-row lg:justify-start items-center gap-4 lg:gap-6">
          <input
            type="text"
            placeholder="Search meals or categories..."
            className="w-full max-w-lg px-6 py-3 text-gray-900 rounded-full shadow-lg focus:outline-none focus:ring-4 focus:ring-gray-500 transition-all duration-300"
          />
          <button className="btn bg-gray-800 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:bg-gray-700 focus:ring-4 focus:ring-gray-500 transition-all duration-300">
            Search
          </button>
        </div>
      </div>

      {/* Carousel Component */}
      <div className="absolute inset-0 z-0">
        <Carousel
          showArrows={true}
          autoPlay={true}
          infiniteLoop={true}
          interval={5000} // Adjust the timing between slides
          stopOnHover={true}
        >
          <div>
            <img
              src="https://c8.alamy.com/comp/FWX55G/munich-germany-08th-apr-2016-a-view-of-the-employee-cafeteria-during-FWX55G.jpg"
              alt="Banner 1"
            />
            <p className="legend">Hostel Dining 1</p>
          </div>
          <div>
            <img
              src="https://i.insider.com/50cdfae46bb3f7604c000009?width=800&format=jpeg&auto=webp"
              alt="Banner 2"
            />
            <p className="legend">Hostel Dining 2</p>
          </div>
          <div>
            <img
              src="https://cloudfront-eu-central-1.images.arcpublishing.com/irishtimes/RGBAQF5PV4YUCPF2PKY5SYOZQM.jpg"
              alt="Banner 3"
            />
            <p className="legend">Hostel Dining 3</p>
          </div>
        </Carousel>
      </div>

      {/* Subtle Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-transparent to-gray-800 opacity-70"></div>
    </section>
  );
};

export default Banner;
