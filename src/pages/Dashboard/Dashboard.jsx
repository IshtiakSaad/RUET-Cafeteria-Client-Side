import { useContext, useEffect, useState } from "react";
import axios from "axios";
import AuthContext from "../../context/AuthContext/AuthContext";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";

const Dashboard = () => {
  //   const { user } = useContext(AuthContext); // Get the logged-in user
  const user = useAuth();
  const [requestedMeals, setRequestedMeals] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [badge, setBadge] = useState("");
  const [allMeals, setAllMeals] = useState([]);
  //   const [paymentHistory, setPaymentHistory] = useState([]);
  const BASE_URL = "http://localhost:3000";
  const navigate = useNavigate();
  //   console.log("User:", user);

  // Fetch data for the user dashboard
  useEffect(() => {
    let isMounted = true;

    if (user) {
      const fetchData = async () => {
        try {
          // Fetch all meals
          const resMeals = (await axios.get(`${BASE_URL}/meals`)).data;
          if (isMounted) {
            setAllMeals(resMeals);
          }

          // Fetch user favorites
          try {
            const mealsResponse = await axios.get(
              `${BASE_URL}/users/${user.user.uid}/favorites`
            );

            if (isMounted) {
              setRequestedMeals(mealsResponse.data || []); // Default to an empty array if no data
            }
          } catch (favoritesError) {
            console.warn(
              "No favorites found or endpoint not initialized:",
              favoritesError.message
            );
            if (isMounted) {
              setRequestedMeals([]); // Set to an empty array if the endpoint is missing
            }
          }

          // Fetch user badge
          const fetchedBadge = (
            await axios.get(`${BASE_URL}/users/${user.user.uid}`)
          ).data;
          if (isMounted) {
            setBadge(fetchedBadge.badge);
          }
        } catch (error) {
          console.error("Error fetching dashboard data:", error);
        }
      };

      fetchData();
    }

    return () => {
      isMounted = false; // Clean up to prevent state updates on unmounted components
    };
  }, [user, BASE_URL]);

  useEffect(() => {
    const extractedReviews = [];

    allMeals.map((meal) => {
      if (meal.reviews) {
        meal.reviews.map((review) => {
          if (user.user.uid === review.userId) {
            // Push the relevant data into the temporary array
            extractedReviews.push({
              mealId: meal._id,
              mealTitle: meal.title,
              content: review.content,
              rating: review.rating,
              postedAt: review.postedAt,
            });
          }
          //   console.log(extractedReviews);
        });
      }
    });

    setReviews(extractedReviews);
  }, [allMeals]);

  const handleDetails = (id) => {
    navigate(`/meals/${id}`); // Navigate to the meal details route
  };

  const handleCancelRequest = async (mealId) => {
    try {
      const response = await fetch(
        `${BASE_URL}/users/${user.user.uid}/favorites/${mealId}`,
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

  //   Handle Payment History
  const axiosSecure = useAxiosSecure();
  const { data: payments = [] } = useQuery({
    queryKey: ["payments", user.user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments/${user.user.email}`);
      return res.data;
    },
  });

  //   console.log(payments);

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
              src={user.user.photoURL || "https://via.placeholder.com/100"}
              alt="Profile"
              className="w-20 h-20 rounded-full border"
            />
            <div>
              <p className="text-lg font-medium">
                {user.user.displayName || "Anonymous"}
              </p>
              <p className="text-gray-600">{user.user.email}</p>
              <p className="text-gray-600">Badge: {badge}</p>
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
                  <td className="border-b p-4">{meal.likes || 0}</td>
                  <td className="border-b p-4">{meal.reviews?.length || 0}</td>
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
                <th className="border-b p-4">Rating</th>
                <th className="border-b p-4">Review</th>
                <th className="border-b p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {reviews.map((review) => (
                <tr key={review.id}>
                  <td className="border-b p-4">{review.mealTitle}</td>
                  <td className="border-b p-4">{review.rating}</td>
                  <td className="border-b p-4">{review.content}</td>
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
                      // navigate(`/meals/${id}`)
                      onClick={() => handleDetails(review.mealId)}
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
        {payments.length > 0 ? (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr>
                <th className="border-b p-4">Transaction ID</th>
                <th className="border-b p-4">Amount</th>
                <th className="border-b p-4">Date</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment) => (
                <tr key={payment.id}>
                  <td className="border-b p-4">{payment.transactionId}</td>
                  <td className="border-b p-4">${payment.price}</td>
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
