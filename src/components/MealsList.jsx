import MealCard from "./MealCard";

const MealsList = ({ meals, onMealDetails }) => {
    // {meals.map((meal) => (
    //     console.log(meal._id)
    //   ))}
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {meals.map((meal) => (
        <MealCard
          key={meal.id}
          meal={meal}
          onDetailsClick={(id) => onMealDetails(meal._id)}
        />
      ))}
    </div>
  );
};

export default MealsList;
