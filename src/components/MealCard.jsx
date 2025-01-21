import React from "react";

const MealCard = ({ meal, onDetailsClick }) => {
  const { title, image, rating, price } = meal;

  return (
    <div className="card bg-base-100 shadow-md rounded-lg overflow-hidden">
      <img
        src={image}
        alt={title}
        className="w-full h-48 object-cover transition-transform duration-200 hover:scale-105"
      />
      <div className="p-4">
        <h2 className="text-lg font-bold text-gray-800 mb-2">{title}</h2>
        <p className="text-sm text-gray-600 mb-2">Rating: ⭐ {rating}</p>
        <p className="text-sm text-gray-600 mb-4">Price: ${price.toFixed(2)}</p>
        <button
          className="btn btn-primary w-full"
          onClick={() => onDetailsClick(meal.id)}
        >
          Details
        </button>
      </div>
    </div>
  );
};

export default MealCard;
