import { useState, useEffect } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { toast } from "react-hot-toast";
import useAuth from "../../hooks/useAuth";

const AdminProfile = () => {
  const [adminInfo, setAdminInfo] = useState(null);
  const [mealCount, setMealCount] = useState(0);
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        // Set the admin info
        setAdminInfo(user);

        // Only fetch meal count if user email exists
        if (user?.email) {
          const mealResponse = await axiosSecure.get(`/meals/count/${user.email}`);
          setMealCount(mealResponse.data.count);
        }
      } catch (error) {
        toast.error("Failed to fetch admin profile data.");
      }
    };

    if (user) {
      fetchAdminData();
    }
  }, [user, axiosSecure]);

  if (!adminInfo) {
    return <div className="text-white">Loading admin profile...</div>;
  }

  return (
    <div className="bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 p-8">
      <div className="max-w-md mx-auto bg-white/10 backdrop-blur-lg p-6 rounded-lg shadow-md border border-gray-700">
        <img
          src={adminInfo.photoURL || "/default-avatar.png"}
          alt="Admin Avatar"
          className="w-24 h-24 mx-auto rounded-full shadow-lg mb-4"
        />
        <h2 className="text-2xl font-bold text-white text-center mb-2">
          {adminInfo.displayName || "Admin Name"}
        </h2>
        <p className="text-gray-300 text-center mb-4">{adminInfo.email}</p>
        <p className="text-lg text-white font-semibold text-center">
          Meals Added: <span className="text-green-400">{mealCount}</span>
        </p>
      </div>
    </div>
  );
};

export default AdminProfile;
