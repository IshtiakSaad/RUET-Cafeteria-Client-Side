import { useNavigate } from "react-router-dom";
import AdminProfile from "./AdminProfile";

const AdminDashboard = () => {
  const navigate = useNavigate();
  return (
    <div className="rounded-lg p-8 min-h-screen bg-gradient-to-br from-gray-500 to-gray-50">
      <div className="mb-8">
        <AdminProfile />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <button
          onClick={() => navigate("/allusers")}
          className="w-full px-4 py-6 bg-white text-gray-800 font-medium rounded-lg shadow-lg hover:shadow-2xl transition duration-300 ease-in-out transform hover:-translate-y-1"
        >
          All Users
        </button>
        <button
          onClick={() => navigate("/addfood")}
          className="w-full px-4 py-6 bg-white text-gray-800 font-medium rounded-lg shadow-lg hover:shadow-2xl transition duration-300 ease-in-out transform hover:-translate-y-1"
        >
          Add Food
        </button>
        <button
          onClick={() => navigate("/managefoods")}
          className="w-full px-4 py-6 bg-white text-gray-800 font-medium rounded-lg shadow-lg hover:shadow-2xl transition duration-300 ease-in-out transform hover:-translate-y-1"
        >
          Manage Food
        </button>
        <button
          onClick={() => navigate("/manage-upcoming-foods")}
          className="w-full px-4 py-6 bg-white text-gray-800 font-medium rounded-lg shadow-lg hover:shadow-2xl transition duration-300 ease-in-out transform hover:-translate-y-1"
        >
          Manage Upcoming Food
        </button>
      </div>
    </div>
  );
};

export default AdminDashboard;
