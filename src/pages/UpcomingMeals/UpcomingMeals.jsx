import { useNavigate } from "react-router-dom";
import MealsList from "../../components/MealsList";
import { useEffect, useState } from "react";
import axios from "axios";

const UpcomingMeals = () => {
  const navigate = useNavigate();
  const [mealsData, setMealsData] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const [error, setError] = useState(null); // Add error state

  useEffect(() => {
    const fetchData = async () => {
      try {
        const mealsResponse = await axios.get("http://localhost:3000/meals");
        const upcomingMeals = mealsResponse.data.filter(
          (meal) => meal.status === "Upcoming"
        );
        setMealsData(upcomingMeals);
      } catch (error) {
        console.error("Error fetching meals data:", error);
        setError("Failed to load upcoming meals. Please try again later.");
      } finally {
        setLoading(false); // Stop loading once the data is fetched
      }
    };
    fetchData();
  }, []);

  const handleDetails = (id) => {
    navigate(`/meals/${id}`); // Navigate to the meal details route
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-lg font-semibold text-gray-600 animate-pulse">
          Loading upcoming meals...
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-lg font-semibold text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="w-11/12 md:w-3/4 mx-auto py-8">
      <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-6">
        Upcoming Meals
      </h1>
      {/* Meals List */}
      <MealsList meals={mealsData} onMealDetails={handleDetails} />
    </div>
  );
};

export default UpcomingMeals;
