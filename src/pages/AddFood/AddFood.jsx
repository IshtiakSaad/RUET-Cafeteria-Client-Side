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
  console.log(user);

  const onSubmit = async (data) => {
    console.log(data);
    const foodData = {
      ...data,
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
    console.log("Ready: ",foodData);

    try {
      const response = await axiosSecure.post(
        "http://localhost:3000/meals",
        foodData
      );

      if (response.status === 201 || response.status === 200) {
        toast.success("Food added successfully!");
        navigate(`/dashboard`);
        reset();
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || error.message || "Failed to add food.";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="flex items-center justify-center rounded-lg min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 px-4 py-12">
      <div className="backdrop-blur-md bg-white/10 border border-white/20 shadow-lg rounded-xl p-8 max-w-lg w-full">
        <h2 className="text-3xl font-extrabold text-center text-white mb-8">
          Add Food
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
              <p className="text-red-400 text-sm mt-1">
                {errors.title.message}
              </p>
            )}
          </div>

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

          <div>
            <label className="block text-sm font-medium text-gray-300">
              Image URL
            </label>
            <input
              type="url"
              {...register("image", { required: "Image URL is required" })}
              placeholder="Enter image URL"
              className="w-full px-4 py-2 bg-transparent border border-gray-400 rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none focus:ring focus:ring-purple-500"
            />
            {errors.image && (
              <p className="text-red-400 text-sm mt-1">
                {errors.image.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300">
              Rating
            </label>
            <input
              type="number"
              step="0.1"
              {...register("rating", {
                required: "Rating is required",
                min: { value: 0, message: "Rating must be at least 0" },
                max: { value: 5, message: "Rating cannot exceed 5" },
              })}
              placeholder="Enter rating (e.g., 4.5)"
              className="w-full px-4 py-2 bg-transparent border border-gray-400 rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none focus:ring focus:ring-purple-500"
            />
            {errors.rating && (
              <p className="text-red-400 text-sm mt-1">
                {errors.rating.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300">
              Price
            </label>
            <input
              type="number"
              step="0.01"
              {...register("price", { required: "Price is required" })}
              placeholder="Enter price (e.g., 5.99)"
              className="w-full px-4 py-2 bg-transparent border border-gray-400 rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none focus:ring focus:ring-purple-500"
            />
            {errors.price && (
              <p className="text-red-400 text-sm mt-1">
                {errors.price.message}
              </p>
            )}
          </div>


          <div>
            <label className="block text-sm font-medium text-gray-300">
              Description
            </label>
            <textarea
              {...register("description", {
                required: "Description is required",
              })}
              placeholder="Enter description"
              className="w-full px-4 py-2 bg-transparent border border-gray-400 rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none focus:ring focus:ring-purple-500"
              rows="3"
            ></textarea>
            {errors.description && (
              <p className="text-red-400 text-sm mt-1">
                {errors.description.message}
              </p>
            )}
          </div>

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
