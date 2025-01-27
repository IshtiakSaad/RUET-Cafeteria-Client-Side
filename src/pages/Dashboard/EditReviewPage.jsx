import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const EditReviewPage = () => {
  const { reviewId } = useParams(); // Get the review ID from URL params
  const navigate = useNavigate();

  const [review, setReview] = useState(null);
  const [content, setContent] = useState("");
  const [rating, setRating] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Fetch review details when component mounts
  useEffect(() => {
    const fetchReview = async () => {
      try {
        const response = await axios.get(`/reviews/${reviewId}`); // Fetch the review data
        setReview(response.data);
        setContent(response.data.content); // Pre-fill content
        setRating(response.data.rating); // Pre-fill rating
      } catch (error) {
        console.error("Error fetching review:", error);
      }
    };
    fetchReview();
  }, [reviewId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Send PUT request to update the review
      const response = await axios.put(`/meals/${review.mealId}/reviews/${reviewId}`, {
        content,
        rating,
      });

      if (response.status === 200) {
        toast.success("Review updated successfully!");
        navigate(`/dashboard`); // Redirect back to the dashboard or review list after updating
      }
    } catch (error) {
      console.error("Error updating review:", error);
      toast.error("Failed to update review.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!review) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900">
        <p className="text-lg text-gray-300">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 p-6">
      <div className="max-w-lg w-full bg-white/10 backdrop-blur-md border border-white/30 rounded-2xl shadow-xl p-8">
        <h2 className="text-3xl font-semibold text-white text-center mb-6">Edit Your Review</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="content"
              className="block text-lg font-medium text-white mb-2"
            >
              Review Content
            </label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              rows="6"
              placeholder={review.content} // Display existing review as placeholder
              className="w-full px-4 py-3 text-white text-opacity-90 bg-white/10 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-transparent transition duration-300"
            />
          </div>

          <div>
            <label
              htmlFor="rating"
              className="block text-lg font-medium text-white mb-2"
            >
              Rating (1-5)
            </label>
            <input
              id="rating"
              type="number"
              value={rating}
              min="1"
              max="5"
              onChange={(e) => setRating(e.target.value)}
              required
              placeholder={review.rating} // Display existing rating as placeholder
              className="w-full px-4 py-3 text-white text-opacity-90 bg-white/10 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-transparent transition duration-300"
            />
          </div>

          <div className="text-center">
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 px-4 text-lg font-bold rounded-lg shadow-lg transition duration-300 ${
                isLoading
                  ? "bg-indigo-400 text-gray-300"
                  : "bg-gradient-to-r from-teal-500 via-blue-600 to-indigo-700 text-white hover:opacity-90"
              }`}
            >
              {isLoading ? "Updating..." : "Save Review"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditReviewPage;
