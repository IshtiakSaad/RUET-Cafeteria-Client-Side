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
  //   const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [isAdmin] = useAdmin();
  const BASE_URL = "http://localhost:3000";
  const navigate = useNavigate();

  //   const handleAdminPanelClick = () => {
  //     setShowAdminPanel((prev) => !prev);
  //   };

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
            content: review.content,
            rating: review.rating,
            postedAt: review.postedAt,
          });
        }
      });
    });
    setReviews(extractedReviews);
  }, [allMeals, user]);

  //   const handleDetails = (id) => {
  //     navigate(`/meals/${id}`);
  //   };

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

  const handleDeleteReview = async (reviewId) => {
    try {
      await axios.delete(`/reviews/${reviewId}`);
      setReviews((prev) => prev.filter((review) => review.id !== reviewId));
      alert("Review deleted successfully.");
    } catch (error) {
      console.error(error);
    }
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
              onClick={ () => navigate("/admin-dashboard")}
              className="px-8 py-1 bg-gradient-to-r from-indigo-500 via-purple-600 to-indigo-700 text-white rounded-lg text-lg shadow-lg hover:opacity-90 transition duration-300"
            >
              Admin Panel
            </button>
          </div>
        )}

        {
          <div className="space-y-10">
            {/* Profile */}
            <section className="bg-white shadow-lg rounded-2xl p-6">
              <h2 className="text-2xl font-semibold mb-4">My Profile</h2>
              {user && (
                <div className="flex items-center gap-6">
                  <img
                    src={
                      user.user.photoURL || "https://via.placeholder.com/100"
                    }
                    alt="Profile"
                    className="w-24 h-24 rounded-full border-4 border-gray-200"
                  />
                  <div>
                    <p className="text-xl font-medium">
                      {user.user.displayName || "Anonymous"}
                    </p>
                    <p className="text-gray-600">{user.user.email}</p>
                    <p className="text-gray-600">Badge: <span className="btn btn-outline px-4 btn-sm btn-warning font-bold">{badge}</span></p>
                  </div>
                </div>
              )}
            </section>

            {/* Requested Meals */}
            <section className="bg-white shadow-lg rounded-2xl p-6">
              <h2 className="text-2xl font-semibold mb-4">Requested Meals</h2>
              {requestedMeals.length > 0 ? (
                <ul className="space-y-4">
                  {requestedMeals.map((meal) => (
                    <li
                      key={meal._id}
                      className="flex items-center justify-between"
                    >
                      <div>
                        <p className="font-semibold">{meal.title}</p>
                        <p className="text-gray-500">
                          Likes: {meal.likes || 0}, Reviews:{" "}
                          {meal.reviews?.length || 0}
                        </p>
                      </div>
                      <button
                        onClick={() => handleCancelRequest(meal._id)}
                        className="text-red-600 hover:underline"
                      >
                        Cancel
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">No requested meals found.</p>
              )}
            </section>

            {/* Reviews */}
            <section className="bg-white shadow-lg rounded-2xl p-6">
              <h2 className="text-2xl font-semibold mb-4">My Reviews</h2>
              {reviews.length > 0 ? (
                <ul className="space-y-4">
                  {reviews.map((review) => (
                    <li
                      key={review.id}
                      className="flex items-center justify-between"
                    >
                      <div>
                        <p className="font-semibold">{review.mealTitle}</p>
                        <p className="text-gray-500">{review.content}</p>
                      </div>
                      <button
                        onClick={() => handleDeleteReview(review.id)}
                        className="text-red-600 hover:underline"
                      >
                        Delete
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">No reviews found.</p>
              )}
            </section>

            {/* Payment History */}
            <section className="bg-white shadow-lg rounded-2xl p-6">
              <h2 className="text-2xl font-semibold mb-4">Payment History</h2>
              {payments.length > 0 ? (
                <table className="w-full">
                  <thead>
                    <tr className="text-left">
                      <th className="text-sm">Transaction ID</th>
                      <th className="text-sm">Amount</th>
                      <th className="text-sm">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {payments.map((payment) => (
                      <tr key={payment.id}>
                        <td className="text-sm">{payment.transactionId}</td>
                        <td className="text-sm">${payment.price}</td>
                        <td  className="text-sm">{new Date(payment.date).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className="text-gray-500">No payment history found.</p>
              )}
            </section>
          </div>
        }
      </div>
    </div>
  );
};

export default Dashboard;
