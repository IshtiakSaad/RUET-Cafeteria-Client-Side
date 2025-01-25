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

  const imageBBKey = "de16ed097feb2e2f18b42f490e78e9cc"; // ImageBB API key
  const [imageFile, setImageFile] = useState(null); // State to store the selected image file
  const [imageError, setImageError] = useState(""); // State for image error messages

  // Function to upload the image to ImageBB and return the image URL
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
        return result.data.url; // Return the image URL
      } else {
        throw new Error("Image upload failed.");
      }
    } catch (error) {
      console.error("Error uploading image:", error.message);
      throw error;
    }
  };

  // Handle form submission
  const onSubmit = async (data) => {
    try {
      // Validate image file
      if (!imageFile) {
        setImageError("Please upload an image");
        return;
      }

      // Upload image and get the URL
      const imageUrl = await uploadImage(imageFile);

      // Prepare food data
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

      // Post the food data to the server
      const response = await axiosSecure.post("http://localhost:3000/meals", foodData);

      if (response.status === 201 || response.status === 200) {
        toast.success("Food added successfully!");
        navigate(`/dashboard`);
        reset();
      }
    } catch (error) {
      toast.error(error.message || "Failed to add food.");
    }
  };

  return (
    <div className="flex items-center justify-center rounded-lg min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 px-4 py-12">
      <div className="backdrop-blur-md bg-white/10 border border-white/20 shadow-lg rounded-xl p-8 max-w-lg w-full">
        <h2 className="text-3xl font-extrabold text-center text-white mb-8">
          Add Food
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Title Field */}
          <div>
            <label className="block text-sm font-medium text-gray-300">
              Title
            </label>
            <input
              type="text"
              {...register("title", { required: "Title is required" })}
              placeholder="Enter food title"
              className="w-full px-4 py-2 bg-transparent border border-gray-400 rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none focus:ring focus:ring-purple-500"
            />
            {errors.title && (
              <p className="text-red-400 text-sm mt-1">{errors.title.message}</p>
            )}
          </div>

          {/* Category Field */}
          <div>
            <label className="block text-sm font-medium text-gray-300">
              Category
            </label>
            <input
              type="text"
              {...register("category", { required: "Category is required" })}
              placeholder="e.g., Breakfast"
              className="w-full px-4 py-2 bg-transparent border border-gray-400 rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none focus:ring focus:ring-purple-500"
            />
            {errors.category && (
              <p className="text-red-400 text-sm mt-1">
                {errors.category.message}
              </p>
            )}
          </div>

          {/* Rating Field */}
          <div>
            <label className="block text-sm font-medium text-gray-300">
              Rating
            </label>
            <input
              type="number"
              step="0.1"
              {...register("rating", { required: "Rating is required" })}
              placeholder="Enter food rating (e.g., 4.5)"
              className="w-full px-4 py-2 bg-transparent border border-gray-400 rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none focus:ring focus:ring-purple-500"
            />
            {errors.rating && (
              <p className="text-red-400 text-sm mt-1">{errors.rating.message}</p>
            )}
          </div>

          {/* Price Field */}
          <div>
            <label className="block text-sm font-medium text-gray-300">
              Price
            </label>
            <input
              type="number"
              step="0.01"
              {...register("price", { required: "Price is required" })}
              placeholder="Enter food price"
              className="w-full px-4 py-2 bg-transparent border border-gray-400 rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none focus:ring focus:ring-purple-500"
            />
            {errors.price && (
              <p className="text-red-400 text-sm mt-1">{errors.price.message}</p>
            )}
          </div>

          {/* Image Upload Field */}
          <div>
            <label className="block text-sm font-medium text-gray-300">
              Upload Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files[0])}
              className="w-full px-4 py-2 bg-transparent border border-gray-400 rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none focus:ring focus:ring-purple-500"
            />
            {imageError && (
              <p className="text-red-400 text-sm mt-1">{imageError}</p>
            )}
          </div>

          {/* Description Field */}
          <div>
            <label className="block text-sm font-medium text-gray-300">
              Description
            </label>
            <textarea
              {...register("description", { required: "Description is required" })}
              placeholder="Enter food description"
              className="w-full px-4 py-2 bg-transparent border border-gray-400 rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none focus:ring focus:ring-purple-500"
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
            <label className="block text-sm font-medium text-gray-300">
              Ingredients
            </label>
            <input
              type="text"
              {...register("ingredients", {
                required: "Ingredients are required",
              })}
              placeholder="Enter ingredients, separated by commas"
              className="w-full px-4 py-2 bg-transparent border border-gray-400 rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none focus:ring focus:ring-purple-500"
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
            className="w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold rounded-lg shadow-md hover:from-purple-700 hover:to-indigo-700 transition-transform transform hover:scale-105"
          >
            Add Food
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddFood;
