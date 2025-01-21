import { useNavigate } from "react-router-dom";
import mealsData from "../../assets/mockmeals.json"; 
import MealsList from "../../components/MealsList";

const Meals = () => {
  const navigate = useNavigate();
  console.log(mealsData.meals);
  const handleDetails = (id) => {
    navigate(`/meals/${id}`); // Navigate to the meal details route
  };
  return (
    <div className="w-11/12 md:w-3/4 mx-auto">
        <h1 className="text-3xl text-center my-4 font-bold">View All Meals</h1>
      {/* Meals List */}
      <MealsList meals={mealsData.meals} onMealDetails={handleDetails} />
    </div>
  );
};

export default Meals;
