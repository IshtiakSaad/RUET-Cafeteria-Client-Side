import React, { useState } from "react";
import MealsList from "./MealsList";
import mealsData from "../assets/mockmeals.json"; // Replace with actual data path

const MealsByCategory = () => {
  const [selectedCategory, setSelectedCategory] = useState("Breakfast");

  const filteredMeals = mealsData.meals.filter(
    (meal) => meal.category === selectedCategory
  );

  const handleDetails = (id) => {
    console.log(`Redirect to meal details: /meal/${id}`);
    // Implement navigation logic
  };

  return (
    <div className="w-11/12 lg:w-3/4 mx-auto my-10">
      {/* Tabs */}
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        {["Breakfast", "Lunch", "Dinner", "All"].map((category) => (
          <button
            key={category}
            className={`tab btn px-4 py-2 text-sm md:text-base ${
              selectedCategory === category ? "tab-active btn-warning" : "btn-outline"
            }`}
            onClick={() =>
              setSelectedCategory(category === "All" ? null : category)
            }
          >
            {category}
          </button>
        ))}
      </div>

      {/* Meals List */}
      <MealsList
        meals={selectedCategory ? filteredMeals : mealsData.meals}
        onMealDetails={handleDetails}
      />
    </div>
  );
};

export default MealsByCategory;
