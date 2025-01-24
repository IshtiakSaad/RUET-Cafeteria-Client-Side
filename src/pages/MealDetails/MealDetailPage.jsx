import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AuthContext from "../../context/AuthContext/AuthContext";
import axios from "axios";

const MealDetailPage = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [meal, setMeal] = useState(null);
  const [likeCount, setLikeCount] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState("");
  const [rating, setRating] = useState(0);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const BASE_URL = "http://localhost:3000";
  const navigate = useNavigate();

  // Fetch meal details
  useEffect(() => {
    const fetchMealDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${BASE_URL}/meals/${id}`);
        setMeal(response.data);
        setLikeCount(response.data.likes);
        setReviews(response.data.reviews || []);
      } catch (err) {
        console.error("Error fetching meal details:", err.message);
        setError("Failed to load meal details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchMealDetails();
  }, [id]);

  // Handle liking a meal
  const handleLike = async () => {
    if (!user) {
      alert("You must be logged in to like this meal.");
      return;
    }

    try {
      // Make API call to update like count on the server
      const response = await axios.post(`${BASE_URL}/meals/${id}/like`, {
        userId: user.uid, // Send user ID to track who liked the meal (optional)
      });

    //   console.log(response.data.likes);

      if (response.status === 200) {
        // Update like count on the client
        setLikeCount(response.data.likes);
      }
    } catch (err) {
      console.error("Error liking the meal:", err.message);
      alert("Failed to like the meal. Please try again later.");
    }
  };

  // Handle requesting a meal
  const handleRequestMeal = async () => {
    if (!user) {
      alert("You must be logged in to request a meal.");
      return;
    }
    const requestDetails = {
      ...meal,
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
      alert("Failed to request meal. Please try again.");
    }
  };

  // Handle posting a review
  const handlePostReview = async () => {
    if (!newReview || !rating) {
      alert("Please add both review content and rating.");
      return;
    }

    try {
      const response = await axios.post(`${BASE_URL}/meals/${id}`, {
        userId: user.uid, // Assuming `user` is from context
        content: newReview,
        rating,
      });
      //   console.log(response);
      if (response.status === 200) {
        try {
          setLoading(true);
          const response = await axios.get(`${BASE_URL}/meals/${id}`);
          setReviews(response.data.reviews);
        } catch (err) {
          console.error("Error fetching meal reviews:", err.message);
          setError("Failed to load meal reviews. Please try again later.");
        } finally {
          setLoading(false);
        }

        // console.log(reviews);

        setNewReview(""); // Clear input
        setRating(0); // Reset rating
      }
    } catch (err) {
      console.error("Error posting review:", err.message);
    }
  };

  // Loader state
  if (loading) return <p>Loading meal details...</p>;

  // Error state
  if (error) return <p className="text-center text-red-500">{error}</p>;

  // Render component
  return (
    <div className="w-3/4 mx-auto p-6">
      <div className="flex flex-col lg:flex-row items-start">
        <img
          src={meal?.image || "default-image.jpg"}
          alt={meal?.title || "Meal"}
          className="w-full lg:w-1/2 rounded-lg shadow-md"
        />
        <div className="lg:ml-6 flex-1">
          <h1 className="text-3xl font-bold mb-4">{meal?.title || "Meal"}</h1>
          <p className="text-gray-700 mb-2">{meal?.description || "N/A"}</p>
          <p className="text-sm text-gray-500 mb-4">
            Posted by: {meal?.distributor || "Unknown"} |{" "}
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
          <button onClick={handleLike} className="btn btn-primary mr-4">
            {likeCount>0? `${likeCount} Like`: "Like (0)"}
          </button>
          <button onClick={handleRequestMeal} className="btn btn-secondary">
            Request Meal
          </button>
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-4">
          Reviews ({Array.isArray(reviews) ? reviews.length : 0})
        </h2>
        {Array.isArray(reviews) && reviews.length > 0 ? (
          <div className="space-y-4">
            {reviews.map((review) => (
              <div
                key={review._id}
                className="p-4 bg-gray-100 rounded-lg shadow"
              >
                <p className="font-semibold">{review.content}</p>
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
          <p className="text-gray-500">
            No reviews yet. Be the first to review!
          </p>
        )}

        <div className="mt-6">
          <textarea
            placeholder="Write a review..."
            value={newReview}
            onChange={(e) => setNewReview(e.target.value)}
            className="w-full px-4 py-2 border rounded-md"
          />
          <input
            type="number"
            max="5"
            min="1"
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            className="w-full px-4 py-2 border rounded-md my-2"
          />
          <button onClick={handlePostReview} className="btn btn-primary">
            Post Review
          </button>
        </div>
      </div>
    </div>
  );
};

export default MealDetailPage;
