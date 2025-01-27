import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AuthContext from "../../context/AuthContext/AuthContext";
import axios from "axios";
import { toast } from "react-hot-toast";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";

const MealDetailPage = () => {
  const { id } = useParams();
  const {user} = useAuth();
  const [meal, setMeal] = useState(null);
  const [likeCount, setLikeCount] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState("");
  const [rating, setRating] = useState(0);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const BASE_URL = "http://localhost:3000";
  const navigate = useNavigate();
  const [currentMeal, setCurrentMeal] = useState("");
  const axiosSecure = useAxiosSecure();
  const [userBadge, setUserBadge] = useState('');
  const [liked, setLiked] = useState(false);

  // Fetch meal details
  useEffect(() => {
    const fetchMealDetails = async () => {
      try {
        setLoading(true);
  
        const res = await axiosSecure.get(`/users/${user.uid}`);
        setUserBadge(res.data.badge);
  
        const response = await axios.get(`${BASE_URL}/meals/${id}`);
        setMeal(response.data);
        setCurrentMeal(response.data.status);
        setLikeCount(response.data.likes);
        setReviews(response.data.reviews || []);
        
        // Check if likedBy exists and if the user has liked this meal
        if (response.data.likedBy && response.data.likedBy.includes(user.uid)) {
          setLiked(true);  // User has already liked the meal
        } else {
          setLiked(false); // User has not liked the meal
        }
      } catch (err) {
        console.error("Error fetching meal details:", err.message);
        setError("Failed to load meal details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchMealDetails();
  }, [id, user.uid]);  // Also depend on user.uid to handle changes in the logged-in user
  

  // Handle liking a meal
  const handleLike = async () => {
    if (!user) {
        toast.error("You must be logged in to like this meal.");
      return;
    }
    
    // console.log(meal);
    // console.log(user);
    // console.log(liked);

    if(liked===true){
        return;
    }
    else{
        setLiked(true);
        // // console.log(user.uid, liked)
        const res = await axios.post("http://localhost:3000/liked", { userId: user.uid, mealId: meal._id});
        console.log(res);
    }


    if( (userBadge==='Bronze' || userBadge==='bronze') && (meal.status==='Upcoming')){
        toast.error("You must be Gold/Silver/Platinum User to like this meal.");
        return;
    }

    try {
      const response = await axios.post(`${BASE_URL}/meals/${id}/like`, {
        userId: user.uid,
      });

      if (response.status === 200) {
        setLikeCount(response.data.likes);
      }

      // If likes reach 10, set status to Available (publish)
      if (response.data.likes >= 10 && currentMeal !== "Available") {
        setCurrentMeal("Available");
        await axiosSecure.put(`/update-meals/${id}`, { status: "Available" });
      }
    } catch (err) {
      console.error("Error liking the meal:", err.message);
    }
  };

  // Handle requesting a meal
  const handleRequestMeal = async () => {
    if (!user) {
        toast.error("You must be logged in to request a meal.");
      return;
    }
    const requestDetails = {
      ...meal,
      status: 'requested',
      requestedBy: user.uid,
    };

    try {
      const response = await axios.post(
        `${BASE_URL}/users/${user.uid}/favorites`,
        { mealID: requestDetails }
      );
      if (response.status === 200) {
        navigate("/");
      }
    } catch (err) {
      console.error("Error requesting meal:", err.message);
      toast.error("Failed to request meal. Please try again.");
    }
  };

  // Handle posting a review
  const handlePostReview = async () => {
    if (!user) {
        toast.error("You must be logged in to post review");
      return;
    }

    if (!newReview || !rating) {
      toast.error("Please add both review content and rating.");
      return;
    }

    try {
      const response = await axios.post(`${BASE_URL}/meals/${id}`, {
        userId: user.uid,
        content: newReview,
        rating,
      });
      if (response.status === 200) {
        setLoading(true);
        const response = await axios.get(`${BASE_URL}/meals/${id}`);
        setReviews(response.data.reviews);
        setLoading(false);
        setNewReview("");
        setRating(0);
      }
    } catch (err) {
      console.error("Error posting review:", err.message);
    }
  };

  // Loader state
  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-lg text-gray-700">Loading meal details...</p>
      </div>
    );

  // Error state
  if (error)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-center text-red-500">{error}</p>
      </div>
    );

  // Render component
  return (
    <div className="min-h-screen bg-gradient-to-tr from-gray-100 via-white to-gray-200 p-8">
      <div className="w-full lg:w-3/4 mx-auto bg-white/90 shadow-lg rounded-2xl p-8">
        <div className="flex flex-col lg:flex-row items-start gap-6">
          <img
            src={meal?.image || "default-image.jpg"}
            alt={meal?.title || "Meal"}
            className="w-full lg:w-1/2 rounded-lg shadow-md"
          />
          <div className="flex-1">
            <h1 className="text-4xl font-extrabold text-gray-800 mb-4">
              {meal?.title || "Meal"}
            </h1>
            <p className="text-gray-700 text-lg mb-2">
              {meal?.description || "N/A"}
            </p>
            <p className="text-sm text-gray-500 mb-4">
              Posted by: {meal?.distributor || meal?.distributorName || "Unknown"} |{" "}
              {meal?.postTime
                ? new Date(meal.postTime).toLocaleDateString()
                : "Unknown Date"}
            </p>
            <p className="text-lg font-semibold mb-4">
              Ingredients:{" "}
              {meal?.ingredients?.join(", ") || "No ingredients listed"}
            </p>
            <p className="text-lg font-bold mb-4">
              Rating: {meal?.rating || 0}/5.0
            </p>
            <p className="text-lg font-bold mb-4">
              Price: ${meal?.price || "N/A"}
            </p>
            <div className="flex items-center gap-4">
              <button
                onClick={handleLike}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition duration-300"
              >
                {likeCount > 0 ? `${likeCount} Like` : "Like (0)"}
              </button>
              {currentMeal === "Available" && (
                <button
                  onClick={handleRequestMeal}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg shadow-lg hover:bg-green-700 transition duration-300"
                >
                  Request Meal
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Review Section */}
        <div className="mt-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Reviews ({Array.isArray(reviews) ? reviews.length : 0})
          </h2>
          {Array.isArray(reviews) && reviews.length > 0 ? (
            <div className="space-y-6">
              {reviews.map((review) => (
                <div
                  key={review._id}
                  className="p-6 bg-gray-50 rounded-xl shadow"
                >
                  <p className="text-lg font-semibold">{review.content}</p>
                  <p className="text-sm text-gray-500">
                    Rating: {review.rating} / 5
                  </p>
                  <p className="text-sm text-gray-400">
                    Posted on: {new Date(review.postedAt).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No reviews yet. Be the first to review!</p>
          )}

          <div className="mt-8">
            <textarea
              placeholder="Write a review..."
              value={newReview}
              onChange={(e) => setNewReview(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow"
            />
            <input
              type="number"
              max="5"
              min="1"
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow mt-4"
            />
            <button
              onClick={handlePostReview}
              className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-lg shadow-lg hover:bg-purple-700 transition duration-300"
            >
              Post Review
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MealDetailPage;
