import React, { useState, useEffect } from "react";
import LoginForm from "./LoginFom";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [admin, setAdmin] = useState(false);
  let token = localStorage.getItem("jwt");
  const adminStatus = localStorage.getItem("isAdmin");

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  const handleLogout = async () => {
    try {
      await axios.get(`http://localhost:5000/api/auth/logout`, {
        withCredentials: true,
      });
      localStorage.removeItem("jwt");
      localStorage.removeItem("isAdmin");
      navigate("/login");
    } catch (error) {
      console.error(
        "Error logging out:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <>
      {!token ? (
        <LoginForm />
      ) : (
        <>
          <div className="flex gap-4 sm:gap-8 lg:gap-12 flex-end justify-end sm:p-6 p-4">
            <div
              className="text-sm sm:text-lg lg:text-xl text-white font-semibold hover:text-gray-300 hover:shadow-xl cursor-pointer"
              onClick={handleLogout}
            >
              Logout
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Dashboard;
