import { useMemo } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const RequestedMeals = () => {
  const axiosSecure = useAxiosSecure();

  // Fetch users
  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users", {
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
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">
        Requested Meals
      </h2>
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
                      onClick={() => handleServeMeal(meal._id, meal.user.userId)}
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
