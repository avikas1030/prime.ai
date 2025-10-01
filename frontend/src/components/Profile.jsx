
import React from "react";
import { FaUserCircle, FaEnvelope } from "react-icons/fa"; // icons from react-icons

const Profile = ({ profile }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 flex flex-col md:flex-row items-center md:items-start gap-6 transition-transform transform hover:-translate-y-1 hover:shadow-lg">
      
      {/* User Avatar / Logo */}
      {/* <div className="text-blue-500 text-6xl md:text-8xl flex-shrink-0">
        <FaUserCircle />
      </div> */}
      
      {/* Profile Info */}
      <div className="flex-1 space-y-3">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          Profile
        </h2>

        <div className="flex items-center gap-2 text-gray-700">
          <FaUserCircle className="text-blue-500" />
          <span className="font-medium">Name:</span>
          <span className="text-gray-900">{profile.userName}</span>
        </div>

        <div className="flex items-center gap-2 text-gray-700">
          <FaEnvelope className="text-green-500" />
          <span className="font-medium">Email:</span>
          <span className="text-gray-900">{profile.email}</span>
        </div>
      </div>
      
    </div>
  );
};

export default Profile;
