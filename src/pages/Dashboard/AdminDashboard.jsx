import { useNavigate } from "react-router-dom";
import AdminProfile from "./AdminProfile";

const AdminDashboard = () => {
  const navigate = useNavigate();
  return (
    <div className="rounded-lg p-8 min-h-screen bg-gradient-to-br from-indigo-50 via-indigo-100 to-indigo-50">
      {/* Admin Profile Section */}
      <div className="mb-8">
        <AdminProfile />
      </div>

      {/* Close Admin Panel Button */}
      <div className="mb-8 text-center p-6 bg-gradient-to-br from-white via-gray-100 to-gray-200 rounded-lg shadow-xl border border-gray-300">
        <p className="text-2xl font-semibold text-black mb-4">
          Back to User Dashboard?
        </p>
        <button
          onClick={() => navigate("/dashboard")}
          className="px-8 py-1 bg-gradient-to-r from-indigo-500 via-purple-600 to-indigo-700 text-white rounded-lg text-lg shadow-lg hover:opacity-90 transition duration-300"
        >
          Close Admin Panel
        </button>
      </div>

      {/* Admin Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <button
          onClick={() => navigate("/allusers")}
          className="w-full px-4 py-6 bg-white text-gray-800 font-medium bg-gradient-to-br from-white via-gray-100 to-gray-200 rounded-lg shadow-xl border border-gray-300 hover:shadow-2xl transition duration-300 ease-in-out transform hover:-translate-y-1"
        >
          All Users
          <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-indigo-400 to-pink-400 opacity-0 transition-opacity duration-300 hover:opacity-20"></div>
        </button>
        <button
          onClick={() => navigate("/addfood")}
          className="w-full px-4 py-6 bg-white text-gray-800 font-medium bg-gradient-to-br from-white via-gray-100 to-gray-200 rounded-lg shadow-xl border border-gray-300 hover:shadow-2xl transition duration-300 ease-in-out transform hover:-translate-y-1"
        >
          Add Food
          <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-indigo-400 to-pink-400 opacity-0 transition-opacity duration-300 hover:opacity-20"></div>
        </button>
        <button
          onClick={() => navigate("/managefoods")}
          className="w-full px-4 py-6 bg-white text-gray-800 font-medium bg-gradient-to-br from-white via-gray-100 to-gray-200 rounded-lg shadow-xl border border-gray-300 hover:shadow-2xl transition duration-300 ease-in-out transform hover:-translate-y-1"
        >
          Manage Food
          <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-indigo-400 to-pink-400 opacity-0 transition-opacity duration-300 hover:opacity-20"></div>
        </button>
        <button
          onClick={() => navigate("/serve-meals")}
          className="w-full px-4 py-6 bg-white text-gray-800 font-medium bg-gradient-to-br from-white via-gray-100 to-gray-200 rounded-lg shadow-xl border border-gray-300 hover:shadow-2xl transition duration-300 ease-in-out transform hover:-translate-y-1"
        >
          Serve Meals
          <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-indigo-400 to-pink-400 opacity-0 transition-opacity duration-300 hover:opacity-20"></div>
        </button>
        <button
          onClick={() => navigate("/manage-upcoming-foods")}
          className="w-full px-4 py-6 bg-white text-gray-800 font-medium bg-gradient-to-br from-white via-gray-100 to-gray-200 rounded-lg shadow-xl border border-gray-300 hover:shadow-2xl transition duration-300 ease-in-out transform hover:-translate-y-1"
        >
          Manage Upcoming Food
          <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-indigo-400 to-pink-400 opacity-0 transition-opacity duration-300 hover:opacity-20"></div>
        </button>
        <button
          onClick={() => navigate("/manage-food-reviews")}
          className="w-full px-4 py-6 bg-white text-gray-800 font-medium bg-gradient-to-br from-white via-gray-100 to-gray-200 rounded-lg shadow-xl border border-gray-300 hover:shadow-2xl transition duration-300 ease-in-out transform hover:-translate-y-1"
        >
          Manage Food Reviews
          <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-indigo-400 to-pink-400 opacity-0 transition-opacity duration-300 hover:opacity-20"></div>
        </button>
      </div>
    </div>
  );
};

export default AdminDashboard;
