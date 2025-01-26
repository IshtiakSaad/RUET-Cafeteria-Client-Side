import { useNavigate } from "react-router-dom";
import MealsList from "../../components/MealsList";
import { useEffect, useState } from "react";
import axios from "axios";

const Meals = () => {
  const navigate = useNavigate();
  const [mealsData, setMealsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("");
  const [priceRange, setPriceRange] = useState([0, 100]); // Default price range (minPrice, maxPrice)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const params = {
          searchQuery,
          category,
          minPrice: priceRange[0],
          maxPrice: priceRange[1],
        };

        const mealsResponse = await axios.get("http://localhost:3000/meals", { params });
        const availableMeals = mealsResponse.data.filter(
          (meal) => meal.status === "Available"
        );
        setMealsData(availableMeals);
      } catch (error) {
        console.error("Error fetching meals data:", error);
        setError("Failed to load meals. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [searchQuery, category, priceRange]);

  const handleDetails = (id) => {
    navigate(`/meals/${id}`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-lg font-semibold text-gray-600 animate-pulse">
          Loading meals...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-lg font-semibold text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="w-11/12 md:w-3/4 mx-auto py-8">
      <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-6">View All Meals</h1>

      {/* Search and Filter Controls */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search meals..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="px-4 py-2 border rounded-lg w-full md:w-1/3"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="px-4 py-2 border rounded-lg w-full md:w-1/3"
        >
          <option value="">All Categories</option>
          <option value="Breakfast">Breakfast</option>
          <option value="Lunch">Lunch</option>
          <option value="Dinner">Dinner</option>
          {/* Add more categories as needed */}
        </select>
        <div className="w-full md:w-1/3">
          <input
            type="range"
            min="0"
            max="100"
            step="5"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([priceRange[0], e.target.value])}
            className="w-full"
          />
          <span>Price: ${priceRange[0]} - ${priceRange[1]}</span>
        </div>
      </div>

      <MealsList meals={mealsData} onMealDetails={handleDetails} />
    </div>
  );
};

export default Meals;
