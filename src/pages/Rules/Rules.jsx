const RulesAndGuidelines = () => {
    return (
      <div className="container min-h-screen mx-auto p-6 rounded-lg max-w-3xl">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Rules & Guidelines</h1>
        <p className="text-gray-700 text-lg text-center mb-4">
          Welcome to RUET Hostel. Please adhere to the following rules to ensure a smooth and respectful living experience.
        </p>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <ul className="list-disc pl-6 space-y-3 text-gray-700 text-lg">
            <li>Maintain cleanliness in the dining and common areas.</li>
            <li>Respect meal timings and avoid food wastage.</li>
            <li>Guests are not allowed in the dining area without prior permission.</li>
            <li>Report any issues with meals or facilities to the management promptly.</li>
            <li>Follow proper queue etiquette while taking food.</li>
            <li>Noise levels should be kept to a minimum, especially during rest hours.</li>
            <li>Personal belongings should be secured properly; management is not responsible for lost items.</li>
            <li>Any misconduct or violation of rules will result in appropriate disciplinary action.</li>
          </ul>
        </div>
      </div>
    );
  };
  
  export default RulesAndGuidelines;
  