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
        setIsLoading(true); // Start loading
        const response = await fetch("http://localhost:3000/meals");
        if (!response.ok) {
          throw new Error("Failed to fetch meals data");
        }
        const data = await response.json();
        setMeals(data); // Assuming the response is { meals: [...] }
        console.log(meals);
    } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false); // End loading
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
    navigate(`/meals/${id}`); // Navigate to the meal details route
  };

  if (isLoading) {
    return <p className="text-center">Loading meals...</p>;
  }

  if (error) {
    console.log(error);
    return <p className="text-center text-red-500">Error: {error}</p>;
  }

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
      {filteredMeals.length > 0 ? (
        <MealsList meals={filteredMeals} onMealDetails={handleDetails} />
      ) : (
        <p className="text-center">No meals found for this category.</p>
      )}
    </div>
  );
};

export default MealsByCategory;
