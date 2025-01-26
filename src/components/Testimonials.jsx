const Testimonials = () => {
    const testimonials = [
      {
        name: "Sarah M.",
        feedback:
          "This system made meal planning so much easier! I love the user-friendly interface.",
        image: "https://randomuser.me/api/portraits/women/1.jpg",
      },
      {
        name: "John D.",
        feedback: "The variety of meals and the review system are fantastic.",
        image: "https://randomuser.me/api/portraits/men/2.jpg",
      },
      {
        name: "Emily R.",
        feedback: "I feel more involved with the hostel meals now. Highly recommend!",
        image: "https://randomuser.me/api/portraits/women/3.jpg",
      },
    ];
  
    return (
      <section className="my-20 py-16 bg-gradient-to-b from-gray-100 to-white text-gray-800 w-11/12 lg:w-3/4 mx-auto rounded-2xl shadow-xl">
        <div className="container mx-auto px-6 text-center">
          {/* Section Title */}
          <h2 className="text-4xl font-extrabold mb-8 text-gray-900">
            What Students Say
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-12">
            Hear how our system is improving the hostel dining experience for
            students.
          </p>
  
          {/* Testimonials Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="relative bg-white p-6 shadow-md rounded-xl transform transition-transform hover:scale-105 hover:shadow-lg"
              >
                {/* Profile Image */}
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-20 h-20 rounded-full mx-auto border-4 border-gray-200 object-cover"
                />
                {/* Name */}
                <h3 className="mt-6 text-xl font-semibold text-gray-900">
                  {testimonial.name}
                </h3>
                {/* Feedback */}
                <p className="mt-4 text-gray-600 leading-relaxed">
                  "{testimonial.feedback}"
                </p>
  
                {/* Decorative Glow */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-400 to-pink-400 opacity-0 transition-opacity duration-300 hover:opacity-20"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };
  
  export default Testimonials;
  