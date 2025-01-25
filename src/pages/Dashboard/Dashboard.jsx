import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import AdminDashboard from "./AdminDashboard";
import useAdmin from "../../hooks/useAdmin";

const Dashboard = () => {
  const user = useAuth();
  const [requestedMeals, setRequestedMeals] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [badge, setBadge] = useState("");
  const [allMeals, setAllMeals] = useState([]);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [isAdmin] = useAdmin();
  const BASE_URL = "http://localhost:3000";
  const navigate = useNavigate();

  const handleAdminPanelClick = () => {
    setShowAdminPanel((prev) => !prev);
  };

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
          console.error("Error fetching dashboard data:", error);
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
      if (meal.reviews) {
        meal.reviews.forEach((review) => {
          if (user.user.uid === review.userId) {
            extractedReviews.push({
              mealId: meal._id,
              mealTitle: meal.title,
              content: review.content,
              rating: review.rating,
              postedAt: review.postedAt,
            });
          }
        });
      }
    });
    setReviews(extractedReviews);
  }, [allMeals]);

  const handleCancelRequest = async (mealId) => {
    try {
      const response = await fetch(
        `${BASE_URL}/users/${user.user.uid}/favorites/${mealId}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        setRequestedMeals((prev) =>
          prev.filter((fav) => fav._id !== mealId)
        );
      }
    } catch (error) {
      console.error("Error removing favorite meal:", error);
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

  const handleDetails = (id) => navigate(`/meals/${id}`);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-center">
          {showAdminPanel ? "Admin Dashboard" : "User Dashboard"}
        </h1>
        {isAdmin && (
          <div className="flex justify-center mb-8">
            <button
              onClick={handleAdminPanelClick}
              className="px-6 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white transition-shadow shadow-lg hover:shadow-indigo-700/50"
            >
              {showAdminPanel ? "Close Admin Panel" : "Open Admin Panel"}
            </button>
          </div>
        )}

        {showAdminPanel && <AdminDashboard />}

        {!showAdminPanel && (
          <>
            {/* Profile Section */}
            <div className="bg-white/10 p-8 rounded-lg shadow-lg mb-10">
              <h2 className="text-2xl font-semibold mb-6">My Profile</h2>
              <div className="flex items-center space-x-6">
                <img
                  src={user.user.photoURL || "/default-avatar.png"}
                  alt="Profile"
                  className="w-24 h-24 rounded-full shadow-md border-2 border-gray-600"
                />
                <div>
                  <p className="text-xl font-medium">
                    {user.user.displayName || "Anonymous"}
                  </p>
                  <p className="text-gray-400">{user.user.email}</p>
                  <p className="text-sm text-gray-500">Badge: {badge}</p>
                </div>
              </div>
            </div>

            {/* Requested Meals */}
            <div className="bg-white/10 p-8 rounded-lg shadow-lg mb-10">
              <h2 className="text-2xl font-semibold mb-6">Requested Meals</h2>
              {requestedMeals.length > 0 ? (
                <table className="w-full text-left text-sm border-separate border-spacing-2">
                  <thead>
                    <tr>
                      <th className="border-b pb-2">Meal Title</th>
                      <th className="border-b pb-2">Likes</th>
                      <th className="border-b pb-2">Reviews</th>
                      <th className="border-b pb-2">Status</th>
                      <th className="border-b pb-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {requestedMeals.map((meal) => (
                      <tr key={meal._id}>
                        <td>{meal.title}</td>
                        <td>{meal.likes || 0}</td>
                        <td>{meal.reviews?.length || 0}</td>
                        <td>{meal.status}</td>
                        <td>
                          <button
                            onClick={() => handleCancelRequest(meal._id)}
                            className="text-red-500 hover:underline"
                          >
                            Cancel
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className="text-gray-500">No requested meals found.</p>
              )}
            </div>

            {/* Payment History */}
            <div className="bg-white/10 p-8 rounded-lg shadow-lg">
              <h2 className="text-2xl font-semibold mb-6">Payment History</h2>
              {payments.length > 0 ? (
                <table className="w-full text-left text-sm border-separate border-spacing-2">
                  <thead>
                    <tr>
                      <th className="border-b pb-2">Transaction ID</th>
                      <th className="border-b pb-2">Amount</th>
                      <th className="border-b pb-2">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {payments.map((payment) => (
                      <tr key={payment.id}>
                        <td>{payment.transactionId}</td>
                        <td>${payment.price}</td>
                        <td>
                          {new Date(payment.date).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className="text-gray-500">No payment history found.</p>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
