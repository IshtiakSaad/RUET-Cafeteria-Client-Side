const FAQSection = () => {
  const faqs = [
    {
      question: "What meal plans are available?",
      answer: "We offer daily, weekly, and monthly meal subscription options.",
    },
    {
      question: "Can I customize my meals?",
      answer:
        "Yes, you can select from vegetarian, non-vegetarian, and dietary-specific meal options.",
    },
    {
      question: "What if I have food allergies?",
      answer:
        "Please inform the management in advance so we can accommodate your needs.",
    },
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-gray-100 to-white text-gray-800 w-11/12 lg:w-3/4 mx-auto rounded-2xl shadow-xl mb-20">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-extrabold text-center mb-8 text-gray-900">
          Frequently Asked Questions
        </h2>

        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div key={index} className="p-6 bg-white shadow-md rounded-xl">
              <h3 className="text-2xl font-semibold text-black ">
                {faq.question}
              </h3>
              <p className="text-gray-600 mt-2">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
