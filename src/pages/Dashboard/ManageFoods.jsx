import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const ManageFoods = () => {
    const [meals, setMeals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sortBy, setSortBy] = useState(""); // "likes" or "reviews"
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();
  
    // Fetch meals from the backend
    const fetchMeals = async (sortOption) => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:3000/meals${sortOption ? `?sortBy=${sortOption}` : ""}`
        );
        setMeals(response.data);
      } catch (error) {
        toast.error("Failed to load meals.");
      } finally {
        setLoading(false);
      }
    };
  
    // Handle delete
    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosSecure.delete(`/meals/${id}`);
                console.log(res.data);
                if (res.data.deletedCount > 0) {
                    // refetch to update the ui
                    fetchMeals();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `Deleted Successfully!`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }


            }
        });
    }
  
    // Handle sort
    const handleSort = (sortOption) => {
      setSortBy(sortOption);
      fetchMeals(sortOption);
    };
  
    // Fetch meals initially
    useEffect(() => {
      fetchMeals(sortBy);
    }, []);
  
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-8">
        <h2 className="text-3xl font-bold mb-8 text-center">Manage Meals</h2>
  
        <div className="flex justify-end mb-4">
          <button
            onClick={() => handleSort("likes")}
            className={`px-4 py-2 rounded-lg font-bold ${
              sortBy === "likes"
                ? "bg-purple-600"
                : "bg-gray-700 hover:bg-purple-500"
            }`}
          >
            Sort by Likes
          </button>
          <button
            onClick={() => handleSort("reviews")}
            className={`ml-4 px-4 py-2 rounded-lg font-bold ${
              sortBy === "reviews"
                ? "bg-purple-600"
                : "bg-gray-700 hover:bg-purple-500"
            }`}
          >
            Sort by Reviews
          </button>
        </div>
  
        {loading ? (
          <p className="text-center text-lg">Loading...</p>
        ) : (
          <table className="w-full table-auto border-collapse border border-gray-700">
            <thead>
              <tr>
                <th className="border border-gray-700 px-4 py-2">Title</th>
                <th className="border border-gray-700 px-4 py-2">Likes</th>
                <th className="border border-gray-700 px-4 py-2">Reviews</th>
                <th className="border border-gray-700 px-4 py-2">Rating</th>
                <th className="border border-gray-700 px-4 py-2">Distributor</th>
                <th className="border border-gray-700 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {meals.map((meal) => (
                <tr key={meal._id}>
                  <td className="border border-gray-700 px-4 py-2">{meal.title}</td>
                  <td className="border border-gray-700 px-4 py-2">{meal.likes || 0}</td>
                  <td className="border border-gray-700 px-4 py-2">
                    {meal.reviews.length || 0}
                  </td>
                  <td className="border border-gray-700 px-4 py-2">
                    {meal.rating.toFixed(1)}
                  </td>
                  <td className="border border-gray-700 px-4 py-2">{meal.distributor}</td>
                  <td className="border border-gray-700 px-4 py-2 space-x-2">
                    <button
                      onClick={() => navigate(`/meals/${meal._id}`)}
                      className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700"
                    >
                      View
                    </button>
                    <button
                      onClick={() => navigate(`/updatefood/${meal._id}`)}
                      className="px-4 py-2 rounded-lg bg-yellow-600 hover:bg-yellow-700"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(meal._id)}
                      className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    );
  };
  
  export default ManageFoods;
  
