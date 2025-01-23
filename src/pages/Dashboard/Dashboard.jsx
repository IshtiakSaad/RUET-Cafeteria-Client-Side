import { useContext, useEffect, useState } from "react";
import axios from "axios";
import AuthContext from "../../context/AuthContext/AuthContext";

const Dashboard = () => {
  const { user } = useContext(AuthContext); // Get the logged-in user
  const [requestedMeals, setRequestedMeals] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [paymentHistory, setPaymentHistory] = useState([]);
  const BASE_URL = "http://localhost:3000";

  // Fetch data for the user dashboard
  useEffect(() => {
    if (user) {
      const fetchData = async () => {
        try {
          const mealsResponse = await axios.get(
            `${BASE_URL}/users/${user.uid}/favorites`
          );
          //   const reviewsResponse = await axios.get(`/reviews?uid=${user.uid}`);
          //   const paymentsResponse = await axios.get(`/payments?uid=${user.uid}`);

          setRequestedMeals(mealsResponse.data);
          //   setReviews(reviewsResponse.data);
          //   setPaymentHistory(paymentsResponse.data);
        } catch (error) {
          console.error("Error fetching dashboard data:", error);
        }
      };

      fetchData();
    }
  }, [user]);

  const handleCancelRequest = async (mealId) => {
    try {
      const response = await fetch(
        `${BASE_URL}/users/${user.uid}/favorites/${mealId}`,
        {
          method: "DELETE",
        }
      );

      const result = await response.json(); // Parse JSON response

      if (!response.ok) {
        throw new Error(
          result.error || "Failed to remove meal from favorites."
        );
      }

      if (response.ok) {
        setRequestedMeals((prev) => {
            const updated = prev.filter((fav) => fav._id !== mealId);
            console.log("Updated favorites:", updated);
            return updated;
        });
      }
      return result; // Return the successful result
    } catch (error) {
      console.error("Error removing favorite meal:", error);
      throw error; // Propagate the error for caller to handle
    }
  };

  const handleDeleteReview = async (reviewId) => {
    try {
      await axios.delete(`/reviews/${reviewId}`);
      setReviews((prev) => prev.filter((review) => review.id !== reviewId));
      alert("Review deleted successfully.");
    } catch (error) {
      console.error("Error deleting review:", error);
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">Dashboard</h1>

      {/* My Profile Section */}
      <div className="bg-white p-6 shadow rounded mb-8">
        <h2 className="text-2xl font-semibold mb-4">My Profile</h2>
        {user && (
          <div className="flex items-center space-x-4">
            <img
              src={user.photoURL || "https://via.placeholder.com/100"}
              alt="Profile"
              className="w-20 h-20 rounded-full border"
            />
            <div>
              <p className="text-lg font-medium">
                {user.displayName || "Anonymous"}
              </p>
              <p className="text-gray-600">{user.email}</p>
              <p className="text-gray-600">Badge: {user.badge || "Bronze"}</p>
            </div>
          </div>
        )}
      </div>

      {/* Requested Meals Section */}
      <div className="bg-white p-6 shadow rounded mb-8">
        <h2 className="text-2xl font-semibold mb-4">Requested Meals</h2>
        {requestedMeals.length > 0 ? (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr>
                <th className="border-b p-4">Meal Title</th>
                <th className="border-b p-4">Likes</th>
                <th className="border-b p-4">Reviews Count</th>
                <th className="border-b p-4">Status</th>
                <th className="border-b p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {requestedMeals.map((meal) => (
                <tr key={meal._id}>
                  <td className="border-b p-4">{meal.title}</td>
                  <td className="border-b p-4">{meal.likes}</td>
                  <td className="border-b p-4">{meal.reviews_count}</td>
                  <td className="border-b p-4">{meal.status}</td>
                  <td className="border-b p-4">
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
        ) : (
          <p className="text-gray-600">No requested meals found.</p>
        )}
      </div>

      {/* My Reviews Section */}
      <div className="bg-white p-6 shadow rounded mb-8">
        <h2 className="text-2xl font-semibold mb-4">My Reviews</h2>
        {reviews.length > 0 ? (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr>
                <th className="border-b p-4">Meal Title</th>
                <th className="border-b p-4">Likes</th>
                <th className="border-b p-4">Review</th>
                <th className="border-b p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {reviews.map((review) => (
                <tr key={review.id}>
                  <td className="border-b p-4">{review.mealTitle}</td>
                  <td className="border-b p-4">{review.likes}</td>
                  <td className="border-b p-4">{review.review}</td>
                  <td className="border-b p-4 space-x-2">
                    <button
                      className="text-blue-600 hover:underline"
                      onClick={() => alert(`Edit review ${review.id}`)}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteReview(review.id)}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => alert(`View meal ${review.mealId}`)}
                      className="text-indigo-600 hover:underline"
                    >
                      View Meal
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-600">No reviews found.</p>
        )}
      </div>

      {/* Payment History Section */}
      <div className="bg-white p-6 shadow rounded">
        <h2 className="text-2xl font-semibold mb-4">Payment History</h2>
        {paymentHistory.length > 0 ? (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr>
                <th className="border-b p-4">Transaction ID</th>
                <th className="border-b p-4">Amount</th>
                <th className="border-b p-4">Date</th>
              </tr>
            </thead>
            <tbody>
              {paymentHistory.map((payment) => (
                <tr key={payment.id}>
                  <td className="border-b p-4">{payment.transactionId}</td>
                  <td className="border-b p-4">${payment.amount.toFixed(2)}</td>
                  <td className="border-b p-4">
                    {new Date(payment.date).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-600">No payment history found.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
