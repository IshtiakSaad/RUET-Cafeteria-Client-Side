import React from "react";
import MealCard from "./MealCard";

const MealsList = ({ meals, onMealDetails }) => {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {meals.map((meal) => (
          <div
            key={meal.id}
            className="card shadow-md p-4 bg-white rounded-lg"
          >
            <img
              src={meal.image}
              alt={meal.title}
              className="w-full h-40 object-cover rounded-md"
            />
            <h3 className="mt-4 font-bold text-lg">{meal.title}</h3>
            <p className="text-sm text-gray-500">{meal.category}</p>
            <button
              onClick={() => onMealDetails(meal.id)}
              className="btn btn-primary mt-4"
            >
              View Details
            </button>
          </div>
        ))}
      </div>
    );
  };
  

export default MealsList;
