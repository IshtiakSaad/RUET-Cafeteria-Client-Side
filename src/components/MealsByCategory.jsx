import { useState, useEffect } from "react";
import MealsList from "./MealsList";
import { useNavigate } from "react-router-dom";

const MealsByCategory = () => {
  const [meals, setMeals] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Breakfast");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch meals from the API
  useEffect(() => {
    const fetchMeals = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("http://localhost:3000/meals");

        if (!response.ok) {
          throw new Error("Failed to fetch meals data");
        }

        const data = await response.json();
        const availableMeals = data.filter((meal) => meal.status === "Available");
        setMeals(availableMeals);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMeals();
  }, []);

  // Filter meals based on the selected category
  const filteredMeals = selectedCategory
    ? meals.filter((meal) => meal.category === selectedCategory)
    : meals;

  // Handle meal details navigation
  const handleDetails = (id) => {
    navigate(`/meals/${id}`);
  };

  if (isLoading) {
    return <p className="text-center text-gray-600 text-lg">Loading meals...</p>;
  }

  if (error) {
    console.error(error);
    return (
      <p className="text-center text-red-500 font-semibold">
        Error: {error}
      </p>
    );
  }

  return (
    <div className="w-11/12 lg:w-3/4 mx-auto my-12">
      {/* Tabs */}
      <div className="flex flex-wrap justify-center gap-4 lg:gap-6 mb-8">
        {["Breakfast", "Lunch", "Dinner", "All"].map((category) => (
          <button
            key={category}
            className={`px-5 py-2 text-sm md:text-base rounded-full font-medium transition-all duration-300 shadow-md ${
              selectedCategory === category
                ? "bg-gray-800 text-white hover:bg-gray-700"
                : "bg-gray-200 text-gray-600 hover:bg-gray-300"
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
      {filteredMeals.length > 0 ? (
        <MealsList meals={filteredMeals} onMealDetails={handleDetails} />
      ) : (
        <p className="text-center text-gray-600 text-lg">
          No meals found for this category.
        </p>
      )}
    </div>
  );
};

export default MealsByCategory;
