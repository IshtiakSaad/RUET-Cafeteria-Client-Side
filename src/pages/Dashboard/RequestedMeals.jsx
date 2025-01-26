import { useMemo, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const RequestedMeals = () => {
  const axiosSecure = useAxiosSecure();
  const [search, setSearch] = useState(""); // Search state
  const navigate = useNavigate();

  // Fetch users
  const { data: users = [], refetch } = useQuery({
    queryKey: ["users", search],
    queryFn: async () => {
      const res = await axiosSecure.get("/users", {
        params: { search },
        headers: {
          authorization: `Bearer: ${localStorage.getItem("access-token")}`,
        },
      });
      return res.data;
    },
    refetchOnWindowFocus: false, // Disable unnecessary refetching
  });

  // Extract and merge all favorite foods (memoized)
  const requestedMeals = useMemo(() => {
    return users.flatMap((user) =>
      (user.favoriteFoods || []).map((meal) => ({
        ...meal,
        user: {
          email: user.email,
          name: user.displayName || user.name,
          userId: user._id,
        },
      }))
    );
  }, [users]);

  // Handle serving meals
  const handleServeMeal = async (mealId, userId) => {
    console.log(mealId, userId);
    try {
      // Call the API to update the status
      await axiosSecure.patch(`/users/${userId}/favoriteFoods/${mealId}`, {
        status: "delivered",
      });

      refetch();

      // Update the local state to reflect the change
      const updatedMeals = requestedMeals.map((meal) =>
        meal.mealId === mealId ? { ...meal, status: "delivered" } : meal
      );

      //   setRequestedMeals(updatedMeals);

      console.log("Meal status updated successfully.");
    } catch (error) {
      console.error("Error updating meal status:", error);
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen flex flex-col items-center">
      
      <div className="mb-8 text-center p-6 bg-gradient-to-br from-white via-gray-100 to-gray-200 rounded-lg shadow-xl border border-gray-300">
        <p className="text-2xl font-semibold text-black mb-4">
          Back to Admin Dashboard?
        </p>
        <button
          onClick={() => navigate("/admin-dashboard")}
          className="px-8 py-1 bg-gradient-to-r from-indigo-500 via-purple-600 to-indigo-700 text-white rounded-lg text-lg shadow-lg hover:opacity-90 transition duration-300"
        >
          Admin Panel
        </button>
      </div>
      
      {/* Search Bar and Total Meals */}
      <div className="flex flex-col justify-between w-full max-w-5xl sm:flex-row sm:justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 sm:mb-0">
          All Requested Meals
        </h2>

        <div className="flex items-center w-full sm:w-auto">
          <input
            type="text"
            placeholder="Search by username or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input input-bordered w-full sm:w-80 mr-4"
          />
          <h2 className="hidden lg:block text-2xl font-medium text-gray-600">
            Total Meals: <span className="font-semibold">{requestedMeals.length}</span>
          </h2>
        </div>
      </div>


      {requestedMeals.length > 0 ? (
        <div className="overflow-x-auto w-full max-w-5xl">
          <table className="w-full text-left border-collapse border border-gray-300 shadow-lg rounded-lg">
            <thead className="bg-gray-200 text-gray-700 text-sm uppercase tracking-wide">
              <tr>
                <th className="px-6 py-4 border-b border-gray-300">Image</th>
                <th className="px-6 py-4 border-b border-gray-300">Title</th>
                <th className="px-6 py-4 border-b border-gray-300">
                  User Email
                </th>
                <th className="px-6 py-4 border-b border-gray-300">Name</th>
                <th className="px-6 py-4 border-b border-gray-300">Status</th>
                <th className="px-6 py-4 border-b border-gray-300">Action</th>
              </tr>
            </thead>
            <tbody>
              {requestedMeals.map((meal, index) => (
                <tr
                  key={index}
                  className={`${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  } hover:bg-gray-100 transition`}
                >
                  <td className="px-6 py-4">
                    <img
                      src={meal.image}
                      alt={meal.title}
                      className="w-12 h-12 object-cover rounded-lg border border-gray-200 shadow-sm"
                    />
                  </td>
                  <td className="px-6 py-4 text-gray-800 font-medium">
                    {meal.title}
                  </td>
                  <td className="px-6 py-4 text-gray-600">{meal.user.email}</td>
                  <td className="px-6 py-4 text-gray-600">{meal.user.name}</td>
                  <td className="px-6 py-4 text-gray-800">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                        meal.status === "delivered"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {meal.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() =>
                        handleServeMeal(meal._id, meal.user.userId)
                      }
                      disabled={meal.status === "served"}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition focus:outline-none ${
                        meal.status === "delivered"
                          ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                          : "bg-blue-500 text-white hover:bg-blue-600"
                      }`}
                    >
                      {meal.status === "delivered" ? "Served" : "Serve"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-500 text-lg">No requested meals found.</p>
      )}
    </div>
  );
};

export default RequestedMeals;
