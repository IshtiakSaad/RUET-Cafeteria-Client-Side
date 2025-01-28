import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Pagination from "./Pagination";

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
        `https://ruet-hostel.vercel.app/mealsbycategory${
          sortOption ? `?sortBy=${sortOption}` : ""
        }`
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
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.delete(`/meals/${id}`);
        if (res.data.deletedCount > 0) {
          // refetch to update the UI
          fetchMeals();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `Deleted Successfully!`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      }
    });
  };

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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white p-6 md:p-12">
      <div className="mb-8 text-center p-6 bg-gradient-to-r from-white/10 via-white/20 to-white/10 rounded-xl shadow-md">
        <h1 className="text-4xl font-bold mb-4">Manage Meals</h1>
        <button
          onClick={() => navigate("/admin-dashboard")}
          className="px-6 py-2 bg-gradient-to-r from-indigo-500 via-purple-600 to-indigo-700 text-white font-medium rounded-lg shadow-lg hover:opacity-90 transition duration-300"
        >
          Back to Admin Panel
        </button>
      </div>

      <div className="flex justify-end mb-6 gap-4">
        <button
          onClick={() => {
            handleSort("likes");
            toast.success("Sorted by Likes");
          }}
          className={`px-4 py-2 rounded-lg font-medium shadow-md transition-all duration-300 ${
            sortBy === "likes"
              ? "bg-purple-600 text-white"
              : "bg-gray-700 text-gray-300 hover:bg-purple-500"
          }`}
        >
          Sort by Likes
        </button>
        <button
          onClick={() => {
            handleSort("reviews");
            toast.success("Sorted by Reviews Count.")
          }}
          className={`px-4 py-2 rounded-lg font-medium shadow-md transition-all duration-300 ${
            sortBy === "reviews"
              ? "bg-purple-600 text-white"
              : "bg-gray-700 text-gray-300 hover:bg-purple-500"
          }`}
        >
          Sort by Reviews
        </button>
      </div>

      {loading ? (
        <p className="text-center text-lg font-medium">Loading...</p>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow-md">
          <Pagination
            items={meals}
            itemsPerPage={10}
            renderTableRows={(paginatedMeals) => (
              <>
                <thead className="bg-gray-800">
                  <tr>
                    <th className="px-6 py-3 text-gray-300">Title</th>
                    <th className="px-6 py-3 text-gray-300">Likes</th>
                    <th className="px-6 py-3 text-gray-300">Reviews</th>
                    <th className="px-6 py-3 text-gray-300">Rating</th>
                    <th className="px-6 py-3 text-gray-300">Distributor</th>
                    <th className="px-6 py-3 text-gray-300 text-center">
                      Status
                    </th>
                    <th className="px-6 py-3 text-gray-300">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedMeals.map((meal, index) => (
                    <tr
                      key={meal._id}
                      className={`${
                        index % 2 === 0 ? "bg-gray-800" : "bg-gray-700"
                      } hover:bg-gray-600 transition-colors duration-300`}
                    >
                      <td className="px-6 py-3">{meal.title}</td>
                      <td className="px-6 py-3">{meal.likes || 0}</td>
                      <td className="px-6 py-3">{meal.reviews.length || 0}</td>
                      <td className="px-6 py-3">{meal.rating.toFixed(1)}</td>
                      <td className="px-6 py-3">
                        {meal.distributorName || meal.distributor}
                      </td>
                      <td className="px-6 py-3 text-center">
                        <span className="border-1 border solid px-4 py-1 rounded-lg">
                          {meal.status}
                        </span>
                      </td>
                      <td className="px-6 py-3 flex gap-2">
                        <button
                          onClick={() => navigate(`/meals/${meal._id}`)}
                          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-md"
                        >
                          View
                        </button>
                        <button
                          onClick={() => navigate(`/updatefood/${meal._id}`)}
                          className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-black rounded-lg shadow-md"
                        >
                          Update
                        </button>
                        <button
                          onClick={() => handleDelete(meal._id)}
                          className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg shadow-md"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </>
            )}
          />
        </div>
      )}
    </div>
  );
};

export default ManageFoods;
