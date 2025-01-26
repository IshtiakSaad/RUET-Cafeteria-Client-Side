import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useState } from "react";
import Swal from "sweetalert2";
import { FaTrashAlt } from "react-icons/fa";
import { GrUserAdmin } from "react-icons/gr";
import { useNavigate } from "react-router-dom";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [search, setSearch] = useState(""); // Search state
  const navigate = useNavigate();

  // Fetch users with search parameter
  const { data: users = [], refetch } = useQuery({
    queryKey: ["users", search],
    queryFn: async () => {
      const res = await axiosSecure.get("/users", {
        params: { search }, // Pass search query to backend
        headers: {
          authorization: `Bearer: ${localStorage.getItem("access-token")}`,
        },
      });
      return res.data;
    },
  });

  const handleMakeAdmin = (user) => {
    axiosSecure.patch(`/users/admin/${user._id}`).then((res) => {
      if (res.data.modifiedCount > 0) {
        refetch();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${user.displayName} is now an Admin!`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  const handleDeleteUser = (user) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/users/${user._id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "The user has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-white to-gray-200 p-2 lg:p-8">
      
      <div className="mb-8 text-center p-6 bg-gradient-to-br from-white via-gray-100 to-gray-200 rounded-lg shadow-xl border border-gray-300">
        <p className="text-2xl font-semibold text-black mb-4">
          Back to Admin Dashboard?
        </p>
        <button
          onClick={() => navigate("/admin-dashboard")}
          className="px-8 py-1 bg-gradient-to-r from-indigo-500 via-purple-600 to-indigo-700 text-white rounded-lg text-lg shadow-lg hover:opacity-90 transition duration-300"
        >
          Admin Panel
        </button>
      </div>

      {/* Search Bar and Total Users */}
      <div className="flex flex-col sm:flex-row sm:justify-between items-center mb-8">
        <h2 className="text-4xl font-bold text-gray-800 mb-4 sm:mb-0">
          All Users
        </h2>

        <div className="flex items-center w-full sm:w-auto">
          <input
            type="text"
            placeholder="Search by username or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input input-bordered w-full sm:w-80 mr-4 focus:ring-2 focus:ring-indigo-500"
          />
          <h2 className="text-2xl font-medium text-gray-600">
            Total Users: <span className="font-semibold">{users.length}</span>
          </h2>
        </div>
      </div>

      {/* Users Table */}
      <div className="overflow-x-auto shadow-lg rounded-lg bg-white/90">
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead className="bg-gray-800 text-white text-left">
            <tr>
              <th className="px-6 py-3 border-b border-gray-300">#</th>
              <th className="px-6 py-3 border-b border-gray-300">Name</th>
              <th className="px-6 py-3 border-b border-gray-300">Email</th>
              <th className="px-6 py-3 border-b border-gray-300">Subscription</th>
              <th className="px-6 py-3 border-b border-gray-300">Role</th>
              <th className="px-6 py-3 border-b border-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr
                key={user._id}
                className={`${
                  index % 2 === 0 ? "bg-gray-100" : "bg-white"
                } hover:bg-gray-200 transition duration-200`}
              >
                <td className="px-6 py-4 border-b border-gray-300">
                  {index + 1}
                </td>
                <td className="px-6 py-4 border-b border-gray-300">
                  {user.displayName}
                </td>
                <td className="px-6 py-4 border-b border-gray-300">
                  {user.email}
                </td>
                <td className="px-6 py-4 border-b border-gray-300">
                  {user.badge}
                </td>
                <td className="px-6 py-4 border-b border-gray-300">
                  {user.role === "admin" ? (
                    <span className="text-green-600 font-semibold">Admin</span>
                  ) : (
                    <button
                      onClick={() => handleMakeAdmin(user)}
                      className="p-2 rounded-full bg-green-100 hover:bg-green-200 transition duration-300"
                      title="Make Admin"
                    >
                      <GrUserAdmin className="text-green-600 text-xl" />
                    </button>
                  )}
                </td>
                <td className="px-6 py-4 border-b border-gray-300">
                  <button
                    onClick={() => handleDeleteUser(user)}
                    className="p-2 rounded-full bg-red-100 hover:bg-red-200 transition duration-300"
                    title="Delete User"
                  >
                    <FaTrashAlt className="text-red-600 text-xl" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;
