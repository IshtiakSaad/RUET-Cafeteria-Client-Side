import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Pagination from "./Pagination";

const ManageFoodReviews = () => {
  const [meals, setMeals] = useState([]); // State to store meals data
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  // Fetch all meals with reviews from the server
  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const response = await axiosSecure.get("/meals");
        const availableMeals = response.data.filter(
          (meal) => meal.reviews?.length > 0
        );
        setMeals(availableMeals);
      } catch (error) {
        console.error("Failed to fetch meals:", error.message);
        toast.error("Failed to load meals.");
      }
    };

    fetchMeals();
  }, [axiosSecure]);

  //   console.log(meals);

  // Handle deleting a review
  const handleDeleteReview = async (mealId, reviewId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this review?"
    );

    if (!confirmed) return;

    try {
      const response = await axiosSecure.delete(
        `/meals/${mealId}/reviews/${reviewId}`
      );

      if (response.status === 200 || response.status === 204) {
        toast.success("Review deleted successfully!");
        const response = await axiosSecure.get("/meals");
        const availableMeals = response.data.filter(
          (meal) => meal.reviews?.length > 0
        );
        setMeals(availableMeals);
      }
    } catch (error) {
      console.error("Failed to delete review:", error.message);
      toast.error("Failed to delete review.");
    }
  };

  // Navigate to view meal details
  const handleViewMeal = (mealId) => {
    navigate(`/meals/${mealId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 lg:px-4 py-8">
      <div className="p-6">
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
        <h2 className="text-2xl font-bold text-white mb-6">All Reviews</h2>
        <div className="overflow-x-auto rounded-lg shadow-md">
          {/* <table className="w-full border-collapse text-left text-gray-200"> */}
          <Pagination
            items={meals}
            itemsPerPage={10}
            renderTableRows={(paginatedMeals) => (
              <>
                <thead>
                  <tr className="bg-purple-600 text-white">
                    <th className="px-4 py-2">Meal Title</th>
                    <th className="px-4 py-2">Likes</th>
                    <th className="px-4 py-2">Reviews Count</th>
                    <th className="px-4 py-2">Reviews</th>
                    <th className="px-4 py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedMeals.map((meal) => (
                    <tr
                      key={meal._id}
                      className="even:bg-gray-800 text-gray-200 odd:bg-gray-900 hover:bg-gray-700 transition-all"
                    >
                      <td className="px-4 py-2">{meal.title}</td>
                      <td className="px-4 py-2">{meal.likes}</td>
                      <td className="px-4 py-2">{meal.reviews.length}</td>
                      <td className="px-4 py-2">
                        {meal.reviews.map((review, index) => (
                          <div
                            key={review._id}
                            className="mb-2 flex justify-between gap-4 items-center"
                          >
                            <p className="mb-1">
                              {index + 1}. {review.content}
                            </p>
                            <button
                              onClick={() =>
                                // console.log(meal._id, review.reviewId)
                                handleDeleteReview(meal._id, review.reviewId)
                              }
                              className="px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-xs"
                            >
                              Delete Review
                            </button>
                          </div>
                        ))}
                      </td>
                      <td className="px-4 py-2 flex gap-2">
                        <button
                          onClick={() => handleViewMeal(meal._id)}
                          className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        >
                          View Meal
                        </button>
                      </td>
                    </tr>
                  ))}
                  {meals.length === 0 && (
                    <tr>
                      <td
                        colSpan="5"
                        className="text-center py-6 text-gray-400 italic"
                      >
                        No meals with reviews found.
                      </td>
                    </tr>
                  )}
                </tbody>
                {/* </table> */}
              </>
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default ManageFoodReviews;
