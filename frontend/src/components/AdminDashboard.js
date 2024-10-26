import React, { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Navbar from "./Navbar";

const AdminDashboard = () => {
  const [players, setPlayers] = useState([]);
  const [user, setUser] = useState(null);
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlayers = async () => {
      const response = await axios.get(
        "http://localhost:5000/api/admin/players",
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data.players);
      setPlayers(response.data.players);
    };
    fetchPlayers();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser(decoded.user);
      } catch (err) {
        logout(navigate);
      }
    }
  }, [navigate]);

  const handleBlock = async (playerId) => {
    await await axios.patch(
      `http://localhost:5000/admin/player/${playerId}/block`,
      {},
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    setPlayers(players.filter((player) => player._id !== playerId));
  };

  if (!user || user.role !== "admin") {
    return <h2>You are not authorized to view this page.</h2>;
  }
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-900 text-white p-8">
        <h2 className="text-4xl font-bold mb-6">Admin Dashboard</h2>
        <h3 className="text-2xl font-semibold mb-4">Active Players</h3>
        <ul className="bg-gray-800 rounded-lg p-6 shadow-md space-y-4">
          {players && players.length > 0 ? (
            players.map((player) => (
              <li
                key={player._id}
                className="flex justify-between items-center border-b border-gray-700 pb-2"
              >
                <span className="text-lg">{player.username}</span>
                <button
                  onClick={() => handleBlock(player._id)}
                  className="bg-red-500 hover:bg-red-700 text-white font-semibold py-1 px-3 rounded transition duration-200"
                >
                  Block
                </button>
              </li>
            ))
          ) : (
            <li className="text-gray-400">No players found.</li>
          )}
        </ul>
      </div>
    </>
  );
};

export default AdminDashboard;
