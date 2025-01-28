import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";

const AddFood = () => {
  const axiosSecure = useAxiosSecure();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const user = useAuth();

  const imageBBKey = process.env.REACT_APP_IMAGE_BB_KEY;
  console.log(imageBBKey);
  const [imageFile, setImageFile] = useState(null);
  const [imageError, setImageError] = useState("");

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch(
        `https://api.imgbb.com/1/upload?key=${imageBBKey}`,
        {
          method: "POST",
          body: formData,
        }
      );
      const result = await response.json();
      if (result.success) {
        return result.data.url;
      } else {
        throw new Error("Image upload failed.");
      }
    } catch (error) {
      console.error("Error uploading image:", error.message);
      throw error;
    }
  };

  const onSubmit = async (data) => {
    try {
      if (!imageFile) {
        setImageError("Please upload an image");
        return;
      }

      const imageUrl = await uploadImage(imageFile);

      const foodData = {
        ...data,
        image: imageUrl,
        rating: parseFloat(data.rating),
        price: parseFloat(data.price),
        ingredients: data.ingredients
          .split(",")
          .map((ingredient) => ingredient.trim()),
        postTime: new Date().toISOString(),
        likes: 0,
        reviews: [],
        distributorName: user.user.displayName,
        distributorEmail: user.user.email,
        status: "Upcoming",
      };

      const response = await axiosSecure.post(
        "https://ruet-hostel.vercel.app/meals",
        foodData
      );

      if (response.status === 201 || response.status === 200) {
        toast.success("Food added successfully!");
        navigate(`/dashboard`);
        reset();
      }
    } catch (error) {
      toast.error("Failed to add food.");
      console.log(error.message);
    }
  };

  return (
    <div className="bg-gradient-to-br from-gray-100 via-purple-200 to-indigo-100 flex flex-col items-center justify-center py-4 px-4">
      <div className="mb-8 text-center p-6 bg-gradient-to-br from-white via-gray-100 to-gray-200 rounded-lg shadow-xl border border-gray-300">
        <p className="text-2xl font-semibold text-black mb-4">
          Back to Admin Dashboard?
        </p>
        <button
          onClick={() => navigate("/admin-dashboard")}
          className="px-8 py-1 bg-gradient-to-r from-indigo-500 via-purple-600 to-indigo-700 text-black font-medium rounded-lg text-lg shadow-lg hover:opacity-90 transition duration-300"
        >
          Admin Panel
        </button>
      </div>
      <div className="backdrop-blur-lg bg-white border border-white/30 rounded-xl shadow-xl p-8 w-full max-w-lg">
        <h2 className="text-4xl font-extrabold text-center text-black mb-8">
          Add Food
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Title Field */}
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Title
            </label>
            <input
              type="text"
              {...register("title", { required: "Title is required" })}
              placeholder="Enter food title"
              className="w-full px-4 py-3 bg-transparent border border-gray-400 rounded-lg text-black font-medium placeholder-gray-500 focus:outline-none focus:ring focus:ring-indigo-500"
            />
            {errors.title && (
              <p className="text-red-400 text-sm mt-1">
                {errors.title.message}
              </p>
            )}
          </div>

          {/* Category Field */}
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Category
            </label>
            <input
              type="text"
              {...register("category", { required: "Category is required" })}
              placeholder="e.g., Breakfast"
              className="w-full px-4 py-3 bg-transparent border border-gray-400 rounded-lg text-black font-medium placeholder-gray-500 focus:outline-none focus:ring focus:ring-indigo-500"
            />
            {errors.category && (
              <p className="text-red-400 text-sm mt-1">
                {errors.category.message}
              </p>
            )}
          </div>

          {/* Rating Field */}
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Rating
            </label>
            <input
              type="number"
              step="0.1"
              min="0"
              max="5"
              {...register("rating", { required: "Rating is required" })}
              placeholder="Enter food rating (e.g., 4.5)"
              className="w-full px-4 py-3 bg-transparent border border-gray-400 rounded-lg text-black font-medium placeholder-gray-500 focus:outline-none focus:ring focus:ring-indigo-500"
            />

            {errors.rating && (
              <p className="text-red-400 text-sm mt-1">
                {errors.rating.message}
              </p>
            )}
          </div>

          {/* Price Field */}
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Price
            </label>
            <input
              type="number"
              step="0.01"
              {...register("price", { required: "Price is required" })}
              placeholder="Enter food price"
              className="w-full px-4 py-3 bg-transparent border border-gray-400 rounded-lg text-black font-medium placeholder-gray-500 focus:outline-none focus:ring focus:ring-indigo-500"
            />
            {errors.price && (
              <p className="text-red-400 text-sm mt-1">
                {errors.price.message}
              </p>
            )}
          </div>

          {/* Image Upload Field */}
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Upload Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files[0])}
              className="w-full px-4 py-3 bg-transparent border border-gray-400 rounded-lg text-black font-medium placeholder-gray-500 focus:outline-none focus:ring focus:ring-indigo-500"
            />
            {imageError && (
              <p className="text-red-400 text-sm mt-1">{imageError}</p>
            )}
          </div>

          {/* Description Field */}
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Description
            </label>
            <textarea
              {...register("description", {
                required: "Description is required",
              })}
              placeholder="Enter food description"
              className="w-full px-4 py-3 bg-transparent border border-gray-400 rounded-lg text-black font-medium placeholder-gray-500 focus:outline-none focus:ring focus:ring-indigo-500"
              rows="3"
            ></textarea>
            {errors.description && (
              <p className="text-red-400 text-sm mt-1">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Ingredients Field */}
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Ingredients
            </label>
            <input
              type="text"
              {...register("ingredients", {
                required: "Ingredients are required",
              })}
              placeholder="Enter ingredients, separated by commas"
              className="w-full px-4 py-3 bg-transparent border border-gray-400 rounded-lg text-black font-medium placeholder-gray-500 focus:outline-none focus:ring focus:ring-indigo-500"
            />
            {errors.ingredients && (
              <p className="text-red-400 text-sm mt-1">
                {errors.ingredients.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-black font-medium font-bold rounded-lg shadow-lg hover:scale-105 transition-transform"
          >
            Add Food
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddFood;
