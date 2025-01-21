import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import mealsData from "../../assets/mockmeals.json"; // Import mock data

const MealDetailPage = () => {
  const { id } = useParams();
  const [meal, setMeal] = useState(null);
  const [likeCount, setLikeCount] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState("");
  const [rating, setRating] = useState(0);

  useEffect(() => {
    // Find meal by id in the mock data
    const fetchedMeal = mealsData.meals.find((meal) => meal.id === id);
    if (fetchedMeal) {
      setMeal(fetchedMeal);
      setLikeCount(fetchedMeal.likes || 0);
      setReviews(fetchedMeal.reviews || []);
    }
  }, [id]);

  const handleLike = () => {
    // Simulate incrementing likes locally
    setLikeCount((prev) => prev + 1);
  };

  const handleRequestMeal = () => {
    alert("Meal request sent! (Mock functionality)");
  };

  const handlePostReview = () => {
    // Simulate posting a review locally
    const newReviewData = {
      id: Date.now().toString(), // Mock unique ID
      content: newReview,
      rating,
    };
    setReviews((prev) => [...prev, newReviewData]);
    setNewReview("");
    setRating(0);
  };

  if (!meal) return <p>Meal not found.</p>;

  // Fetch meal details using the id
  return (
    <div className="w-3/4 mx-auto p-6">
      <div className="flex flex-col lg:flex-row items-start">
        <img
          src={meal.image}
          alt={meal.name}
          className="w-full lg:w-1/2 rounded-lg shadow-md"
        />
        <div className="lg:ml-6 flex-1">
          <h1 className="text-3xl font-bold mb-4">{meal.title}</h1>
          <p className="text-gray-700 mb-2">{meal.description}</p>
          <p className="text-sm text-gray-500 mb-4">
            Posted by: {meal.distributor} | {new Date(meal.postTime).toLocaleDateString()}
          </p>
          <p className="text-lg font-semibold mb-4">Ingredients: {meal.ingredients.join(", ")}</p>
          <p className="text-lg font-bold mb-4">Rating: {meal.rating}/5.0</p>
          <p className="text-lg font-bold mb-4">Price: ${meal.price}</p>
          <button onClick={handleLike} className="btn btn-primary mr-4">
            Like ({likeCount})
          </button>
          <button onClick={handleRequestMeal} className="btn btn-secondary">
            Request Meal
          </button>
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-4">Reviews ({reviews.length})</h2>
        <div className="space-y-4">
          {reviews.map((review) => (
            <div key={review.id} className="p-4 bg-gray-100 rounded-lg shadow">
              <p className="font-semibold">{review.content}</p>
              <p className="text-sm text-gray-500">Rating: {review.rating} / 5</p>
            </div>
          ))}
        </div>
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
