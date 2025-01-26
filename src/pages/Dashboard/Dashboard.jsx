import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import useAdmin from "../../hooks/useAdmin";

const Dashboard = () => {
  const user = useAuth();
  const [requestedMeals, setRequestedMeals] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [badge, setBadge] = useState("");
  const [allMeals, setAllMeals] = useState([]);
  const [isAdmin] = useAdmin();
  const BASE_URL = "http://localhost:3000";
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;
    if (user) {
      const fetchData = async () => {
        try {
          const resMeals = (await axios.get(`${BASE_URL}/meals`)).data;
          if (isMounted) setAllMeals(resMeals);

          const mealsResponse = await axios.get(
            `${BASE_URL}/users/${user.user.uid}/favorites`
          );
          if (isMounted) setRequestedMeals(mealsResponse.data || []);

          const fetchedBadge = (
            await axios.get(`${BASE_URL}/users/${user.user.uid}`)
          ).data;
          if (isMounted) setBadge(fetchedBadge.badge);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      fetchData();
    }
    return () => {
      isMounted = false;
    };
  }, [user, BASE_URL]);

  useEffect(() => {
    const extractedReviews = [];
    allMeals.forEach((meal) => {
      meal.reviews?.forEach((review) => {
        if (user.user.uid === review.userId) {
          extractedReviews.push({
            mealId: meal._id,
            mealTitle: meal.title,
            likes: meal.likes,
            content: review.content,
            rating: review.rating,
            postedAt: review.postedAt,
            reviewId: review.reviewId,
          });
        }
      });
    });
    setReviews(extractedReviews);
  }, [allMeals, user]);

  const handleCancelRequest = async (mealId) => {
    try {
      const response = await fetch(
        `${BASE_URL}/users/${user.user.uid}/favorites/${mealId}`,
        { method: "DELETE" }
      );
      if (!response.ok) throw new Error("Failed to remove meal.");
      setRequestedMeals((prev) => prev.filter((fav) => fav._id !== mealId));
    } catch (error) {
      console.error(error);
    }
  };

  const axiosSecure = useAxiosSecure();
  const { data: payments = [] } = useQuery({
    queryKey: ["payments", user.user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments/${user.user.email}`);
      return res.data;
    },
  });

  console.log(reviews);

  const handleDeleteReview = async (mealId, reviewId) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/meals/${mealId}/reviews/${reviewId}`
      );
      console.log(response);
      setReviews((prev) => prev.filter((review) => review.id !== reviewId));
      alert("Review deleted successfully.");
    } catch (error) {
      console.error("Error deleting review:", error);
    }
  };

  const handleEditReview = (reviewId) => {
    navigate(`/edit-review/${reviewId}`);
  };

  const handleViewMeal = (mealId) => {
    navigate(`/meals/${mealId}`);
  };

  return (
    <div className="px-2 lg:p-8 bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-extrabold mb-6 text-center text-gray-800">
          User Dashboard
        </h1>

        {isAdmin && (
          <div className="mb-8 text-center p-6 bg-gradient-to-r from-gray-800 to-gray-700 rounded-xl shadow-xl">
            <p className="text-2xl font-semibold text-white mb-4">
              Wow. You are an Admin!
            </p>
            <button
              onClick={() => navigate("/admin-dashboard")}
              className="px-8 py-1 bg-gradient-to-r from-indigo-500 via-purple-600 to-indigo-700 text-white rounded-lg text-lg shadow-lg hover:opacity-90 transition duration-300"
            >
              Admin Panel
            </button>
          </div>
        )}

        <div className="space-y-10">
          {/* Profile */}
          <section className="bg-white shadow-lg rounded-2xl p-6">
            <h2 className="text-2xl font-semibold mb-4">My Profile</h2>
            {user && (
              <div className="flex items-center gap-6">
                <img
                  src={user.user.photoURL || "https://via.placeholder.com/100"}
                  alt="Profile"
                  className="w-24 h-24 rounded-full border-4 border-gray-200"
                />
                <div>
                  <p className="text-xl font-medium">
                    {user.user.displayName || "Anonymous"}
                  </p>
                  <p className="text-gray-600">{user.user.email}</p>
                  <p className="text-gray-600">
                    Badge:{" "}
                    <span className="btn btn-outline px-4 btn-sm btn-warning font-bold">
                      {badge}
                    </span>
                  </p>
                </div>
              </div>
            )}
          </section>

          {/* Requested Meals */}
          <section className="bg-white shadow-lg rounded-2xl p-6">
            <h2 className="text-2xl font-semibold mb-4">Requested Meals</h2>
            {requestedMeals.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full table-auto">
                  <thead>
                    <tr className="text-left">
                      <th className="px-4 py-2 text-sm">Meal Title</th>
                      <th className="px-4 py-2 text-sm">Likes</th>
                      <th className="px-4 py-2 text-sm">Reviews</th>
                      <th className="px-4 py-2 text-sm">Status</th>
                      <th className="px-4 py-2 text-sm">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {requestedMeals.map((meal) => (
                      <tr key={meal._id} className="border-b">
                        <td className="px-4 py-2">{meal.title}</td>
                        <td className="px-4 py-2">{meal.likes || 0}</td>
                        <td className="px-4 py-2">
                          {meal.reviews?.length || 0}
                        </td>
                        <td className="px-4 py-2">
                          {meal.status || "Pending"}
                        </td>
                        <td className="px-4 py-2">
                          <button
                            onClick={() => handleCancelRequest(meal._id)}
                            className="text-red-600 hover:underline"
                          >
                            Cancel
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-gray-500">No requested meals found.</p>
            )}
          </section>

          {/* My Reviews */}
          <section className="bg-white shadow-lg rounded-2xl p-6">
            <h2 className="text-2xl font-semibold mb-4">My Reviews</h2>
            {reviews.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full table-auto">
                  <thead>
                    <tr className="text-left bg-gray-100">
                      <th className="px-4 py-2 text-sm">Meal Title</th>
                      <th className="px-4 py-2 text-sm">Likes</th>
                      <th className="px-4 py-2 text-sm">Review</th>
                      <th className="px-4 py-2 text-sm">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reviews.map((review) => (
                      <tr key={review.reviewId} className="border-b">
                        <td className="px-4 py-2 whitespace-nowrap">
                          {review.mealTitle}
                        </td>
                        <td className="px-4 py-2 whitespace-nowrap">
                          {review.likes || 0}
                        </td>
                        <td className="px-4 py-2">{review.content}</td>
                        <td className="flex px-4 py-2 space-x-1">
                          <button
                            onClick={() => handleEditReview(review.reviewId)}
                            className="text-blue-600 hover:underline btn btn-sm btn-outline"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() =>
                              handleDeleteReview(review.mealId, review.reviewId)
                            }
                            className="text-red-600 hover:underline btn btn-sm btn-outline"
                          >
                            Delete
                          </button>
                          <button
                            onClick={() => handleViewMeal(review.mealId)}
                            className="text-green-600 hover:underline btn btn-sm btn-outline"
                          >
                            View Meal
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-gray-500">No reviews found.</p>
            )}
          </section>

          {/* Payment History */}
          <section className="bg-white shadow-lg rounded-2xl p-6">
            <h2 className="text-2xl font-semibold mb-4">Payment History</h2>
            {payments.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full table-auto">
                  <thead>
                    <tr className="text-left">
                      <th className="px-4 py-2 text-sm">Transaction ID</th>
                      <th className="px-4 py-2 text-sm">Amount</th>
                      <th className="px-4 py-2 text-sm">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {payments.map((payment) => (
                      <tr key={payment.id} className="border-b">
                        <td className="px-4 py-2 text-sm">
                          {payment.transactionId}
                        </td>
                        <td className="px-4 py-2 text-sm">${payment.price}</td>
                        <td className="px-4 py-2 text-sm">
                          {new Date(payment.date).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-gray-500">No payment history found.</p>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
