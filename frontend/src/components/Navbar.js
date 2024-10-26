import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.get(`http://localhost:5000/api/auth/logout`, {
        withCredentials: true,
      });
      logout(navigate);
      navigate("/login");
    } catch (error) {
      console.error(
        "Error logging out:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <nav className="bg-gray-800 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Real-Time Dashboard</h1>
        <div className="flex space-x-4">
          {user?.role === "admin" && (
            <>
              <Link to="/create-user" className="hover:underline">
                Create Users
              </Link>
              <Link to="/block-user" className="hover:underline">
                Block User
              </Link>
            </>
          )}
          <Link to="/rank" className="hover:underline">
            Leaderboard
          </Link>
          <button onClick={handleLogout} className="hover:underline">
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
