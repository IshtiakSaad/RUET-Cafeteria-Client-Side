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
        setAdminInfo(user);

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
    return <div className="text-center text-gray-600">Loading admin profile...</div>;
  }

  return (
    <div className="max-w-lg mx-auto p-8 bg-gradient-to-br from-white via-gray-100 to-gray-200 rounded-lg shadow-xl border border-gray-300">
      <div className="text-center">
        <img
          src={adminInfo.photoURL || "/default-avatar.png"}
          alt="Admin Avatar"
          className="w-28 h-28 mx-auto rounded-full shadow-lg border-4 border-gray-200"
        />
        <h2 className="text-2xl font-bold text-gray-800 mt-4">
          {adminInfo.displayName || "Admin Name"}
        </h2>
        <p className="text-gray-600">{adminInfo.email}</p>
      </div>
      <div className="mt-6 bg-white shadow rounded-lg p-6">
        <p className="text-center text-lg text-gray-800">
          Meals Added: <span className="text-indigo-600 font-semibold">{mealCount}</span>
        </p>
      </div>
    </div>
  );
};

export default AdminProfile;
