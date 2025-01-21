
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
    <section className="py-16 bg-base-200 text-gray-800 w-3/4 mx-auto rounded-lg">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-8">What Students Say</h2>
        <div className="flex flex-wrap justify-center gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="w-full md:w-1/3 p-4 bg-gray-50 shadow-md rounded-lg"
            >
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-16 h-16 rounded-full mx-auto"
              />
              <h3 className="text-lg font-semibold mt-4">{testimonial.name}</h3>
              <p className="text-gray-600 mt-2">{testimonial.feedback}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
