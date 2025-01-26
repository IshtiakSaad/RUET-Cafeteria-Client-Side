const MealCard = ({ meal, onDetailsClick }) => {
    const { title, image, rating, price, id } = meal;
  
    return (
      <div className="max-w-sm w-full mx-auto bg-white rounded-xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-2xl">
        <img
          src={image}
          alt={title}
          className="w-full h-48 object-cover transition-transform duration-300 hover:scale-110"
        />
        <div className="p-6">
          <h2 className="text-2xl font-extrabold text-gray-800 mb-2">{title}</h2>
          <p className="text-sm text-gray-600 mb-2">Rating: ⭐ {rating}</p>
          <p className="text-lg font-semibold text-gray-700 mb-4">Price: ${price.toFixed(2)}</p>
          <button
            className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-2 px-4 rounded-lg shadow-lg hover:bg-indigo-700 transition duration-300"
            onClick={() => onDetailsClick(id)}
          >
            View Details
          </button>
        </div>
      </div>
    );
  };
  
  export default MealCard;
  