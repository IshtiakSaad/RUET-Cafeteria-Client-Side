import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useNavigate } from "react-router-dom";

const ManageUpcomingMeals = () => {
  const [upcomingMeals, setUpcomingMeals] = useState([]);
  const [newMeal, setNewMeal] = useState({
    title: "",
    category: "",
    image: "",
    rating: '',
    price: '',
    distributor: "",
    description: "",
    ingredients: "",
    postTime: new Date().toISOString(),
    reviews: [],
    status: "Upcoming",
  });
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const response = await axiosSecure.get("/meals");
        const filteredMeals = response.data
          .filter((meal) => meal.status === "Upcoming")
          .sort((a, b) => b.likes - a.likes); // Sort by likes descending
        setUpcomingMeals(filteredMeals);
      } catch (error) {
        toast.error("Failed to fetch meals.");
      }
    };
    fetchMeals();
  }, [axiosSecure]);

  const handlePublish = async (mealId) => {
    try {
      const response = await axiosSecure.put(`/update-meals/${mealId}`, { status: "Available" });
      if (response.data.success) {
        toast.success("Meal published successfully!");
        setUpcomingMeals(upcomingMeals.filter((meal) => meal._id !== mealId));
      }
    } catch (error) {
      toast.error("Failed to publish meal.");
    }
  };

  const handleAddMeal = async () => {
    try {
      const mealData = { ...newMeal, ingredients: newMeal.ingredients.split(",") };
      console.log(mealData);
      const response = await axiosSecure.post("/meals", mealData);
      console.log(response.config.data);
      console.log(JSON.parse(response.config.data));
      if (response.data.acknowledged) {
        toast.success("Upcoming meal added!");
        setUpcomingMeals([...upcomingMeals, JSON.parse(response.config.data)]);
        console.log(upcomingMeals);
        document.getElementById("addMealModal").close(); // Close modal after adding the meal
        setNewMeal({
          title: "",
          category: "",
          image: "",
          rating: '',
          price: '',
          distributor: "",
          description: "",
          ingredients: "",
          postTime: new Date().toISOString(),
          reviews: [],
          status: "Upcoming",
        }); // Reset form
        navigate('/manage-upcoming-foods')
      }
    } catch (error) {
      toast.error("Failed to add upcoming meal.");
    }
  };

  // Check if the meals data exists and is an array
  if (!Array.isArray(upcomingMeals) || upcomingMeals.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 p-8">
        <h2 className="text-3xl font-extrabold text-white mb-6">Upcoming Meals</h2>
        <p className="text-white">No upcoming meals available.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 p-8">
      <h2 className="text-3xl font-extrabold text-white mb-6">Upcoming Meals</h2>
      
      <button
        onClick={() => document.getElementById("addMealModal").showModal()}
        className="mb-6 px-6 py-3 bg-purple-600 text-white rounded-lg shadow-md hover:bg-purple-700"
      >
        Add Upcoming Meal
      </button>

      <div className="overflow-x-auto">
        <table className="table-auto w-full text-left text-gray-300">
          <thead className="bg-gray-800">
            <tr>
              <th className="px-4 py-2">Title</th>
              <th className="px-4 py-2">Category</th>
              <th className="px-4 py-2">Likes</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {upcomingMeals.map((meal) => (
              <tr key={meal?._id} className="hover:bg-gray-700">
                <td className="px-4 py-2">{meal?.title}</td>
                <td className="px-4 py-2">{meal?.category}</td>
                <td className="px-4 py-2">{meal?.likes || 0}</td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => handlePublish(meal?._id)}
                    className="px-3 py-1 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition-transform transform hover:scale-105"
                  >
                    Publish
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Dialog Modal for Adding a New Meal */}
      <dialog id="addMealModal" className="modal">
        <div className="modal-box bg-white/30 backdrop-blur-lg border border-white/30 rounded-xl shadow-xl">
          {/* Modal Close Button */}
          <button
            onClick={() => document.getElementById("addMealModal").close()}
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </button>

          <h3 className="text-2xl font-bold text-white mb-4">Add Upcoming Meal</h3>

          {/* Form for Adding New Meal */}
          <div>
            <label className="block text-sm font-medium text-white">Title</label>
            <input
              type="text"
              value={newMeal.title}
              onChange={(e) => setNewMeal({ ...newMeal, title: e.target.value })}
              className="input input-bordered w-full text-black bg-white/10 rounded-md mb-4"
            />
            <label className="block text-sm font-medium text-white">Category</label>
            <input
              type="text"
              value={newMeal.category}
              onChange={(e) => setNewMeal({ ...newMeal, category: e.target.value })}
              className="input input-bordered w-full text-black bg-white/10 rounded-md mb-4"
            />
            <label className="block text-sm font-medium text-white">Image URL</label>
            <input
              type="url"
              value={newMeal.image}
              onChange={(e) => setNewMeal({ ...newMeal, image: e.target.value })}
              className="input input-bordered w-full text-black bg-white/10 rounded-md mb-4"
            />
            <label className="block text-sm font-medium text-white">Rating</label>
            <input
              type="number"
              step="0.1"
              min="0"
              max="5"
              value={newMeal.rating}
              onChange={(e) => setNewMeal({ ...newMeal, rating: parseFloat(e.target.value) })}
              className="input input-bordered w-full text-black bg-white/10 rounded-md mb-4"
            />
            <label className="block text-sm font-medium text-white">Price</label>
            <input
              type="number"
              step="0.01"
              value={newMeal.price}
              onChange={(e) => setNewMeal({ ...newMeal, price: parseFloat(e.target.value) })}
              className="input input-bordered w-full text-black bg-white/10 rounded-md mb-4"
            />
            <label className="block text-sm font-medium text-white">Distributor</label>
            <input
              type="text"
              value={newMeal.distributor}
              onChange={(e) => setNewMeal({ ...newMeal, distributor: e.target.value })}
              className="input input-bordered w-full text-black bg-white/10 rounded-md mb-4"
            />
            <label className="block text-sm font-medium text-white">Description</label>
            <textarea
              value={newMeal.description}
              onChange={(e) => setNewMeal({ ...newMeal, description: e.target.value })}
              className="input input-bordered w-full text-black bg-white/10 rounded-md mb-4"
            />
            <label className="block text-sm font-medium text-white">Ingredients (comma-separated)</label>
            <input
              type="text"
              value={newMeal.ingredients}
              onChange={(e) => setNewMeal({ ...newMeal, ingredients: e.target.value })}
              className="input input-bordered w-full text-black bg-white/10 rounded-md mb-4"
            />
            <label className="block text-sm font-medium text-white">Post Time</label>
            <input
              type="datetime-local"
              value={newMeal.postTime}
              onChange={(e) => setNewMeal({ ...newMeal, postTime: e.target.value })}
              className="input input-bordered w-full text-black bg-white/10 rounded-md mb-4"
            />
          </div>

          <div className="modal-action">
            <button
              className="bg-gradient-to-r from-teal-500 to-green-600 px-6 py-2 rounded-lg text-white font-bold"
              onClick={handleAddMeal}
            >
              Add Meal
            </button>
            <button
              className="bg-gray-500 text-white px-6 py-2 rounded-lg"
              onClick={() => document.getElementById("addMealModal").close()}
            >
              Cancel
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default ManageUpcomingMeals;
