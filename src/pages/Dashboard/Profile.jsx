import axios from "axios";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";

const Profile = () => {
  const user = useAuth();

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg my-10">

      <div className="flex items-center gap-4 md:gap-6">
        <img
          src={user.user.photoURL || "https://via.placeholder.com/100"}
          alt="Profile"
          className="w-20 h-20 lg:w-24 lg:h-24 rounded-full border-4 border-gray-200"
        />
        <div>
          <p className="text-xl font-medium">{user.user.displayName || "Anonymous"}</p>
          <p className="text-gray-600">{user.user.email}</p>
        </div>
      </div>

      <div className="mt-6 space-y-4">
        <div>
          <h3 className="font-medium text-gray-700">Phone Number</h3>
          <p className="text-gray-500">{user.user.providerData[0].phoneNumber || "Not provided"}</p>
        </div>

        <div>
          <h3 className="font-medium text-gray-700">Address</h3>
          <p className="text-gray-500">Not available</p>
        </div>

        {/* User Bio Section */}
        <div>
          <h3 className="font-medium text-gray-700">Bio</h3>
          <p className="text-gray-500">{user.user.bio || "No bio available"}</p>
        </div>

        {/* Social Links Section */}
        <div>
          <h3 className="font-medium text-gray-700">Social Links</h3>
          <div className="flex gap-4">
            <a href={user.user.linkedin || "#"} target="_blank" className="text-blue-500 hover:underline">LinkedIn</a>
            <a href={user.user.twitter || "#"} target="_blank" className="text-blue-400 hover:underline">Twitter</a>
          </div>
        </div>
        
        {/* Recent Activity Section */}
        <div>
          <h3 className="font-medium text-gray-700">Recent Activity</h3>
          <ul className="space-y-2">
            <li className="text-gray-500">Joined a new group: "Tech Enthusiasts"</li>
            <li className="text-gray-500">Commented on a post: "Great article on AI!"</li>
          </ul>
        </div>

      </div>
    </div>
  );
};

export default Profile;
