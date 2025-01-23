import { useNavigate } from "react-router-dom";
import MealsList from "../../components/MealsList";
import { useEffect, useState } from "react";
import axios from "axios";

const Meals = () => {
  const navigate = useNavigate();
  const [mealsData, setMealsData] = useState([]); // Initial state is an array

  useEffect(() => {
    const fetchData = async () => {
      try {
        const mealsResponse = await axios.get("http://localhost:3000/meals"); // API call
        setMealsData(mealsResponse.data); // Set the response directly if it's an array
      } catch (error) {
        console.error("Error fetching meals data:", error);
      }
    };
    fetchData();
  }, []);

  const handleDetails = (id) => {
    console.log(id);
    navigate(`/meals/${id}`); // Navigate to the meal details route
  };

  return (
    <div className="w-11/12 md:w-3/4 mx-auto">
      <h1 className="text-3xl text-center my-4 font-bold">View All Meals</h1>
      {/* Meals List */}
      <MealsList meals={mealsData} onMealDetails={handleDetails} />
    </div>
  );
};

export default Meals;
