import React, { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Navbar from "./Navbar";

const BlogPlayer = () => {
  const [players, setPlayers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/admin/players",
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const sortedPlayers = response.data.players.sort(
          (b, a) => new Date(a.createdAt) - new Date(b.createdAt)
        );

        setPlayers(sortedPlayers);
      } catch (error) {
        console.error("Error fetching players:", error);
      }
    };

    fetchPlayers();
  }, []);

  const handleBlock = async (playerId) => {
    try {
      const response = await axios.patch(
        `http://localhost:5000/api/admin/player/${playerId}/block`,
        {},
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setPlayers(
        players.map((player) =>
          player._id === playerId
            ? { ...player, isBlocked: !player.isBlocked }
            : player
        )
      );
    } catch (error) {
      console.error("Error toggling block status for player:", error);
    }
  };

  const handleDelete = async (playerId) => {
    try {
      await axios.delete(`http://localhost:5000/api/admin/player/${playerId}`, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });

      setPlayers(players.filter((player) => player._id !== playerId));
    } catch (error) {
      console.error("Error deleting player:", error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-900 text-white p-8">
        <h2 className="text-4xl font-bold mb-6">Admin Dashboard</h2>
        <h3 className="text-2xl font-semibold mb-4">All Players</h3>
        <ul className="bg-gray-800 rounded-lg p-6 shadow-md space-y-4">
          {players && players.length > 0 ? (
            players.map((player) => (
              <li
                key={player._id}
                className="flex justify-between items-center border-b border-gray-700 pb-2"
              >
                <span className="text-lg">{player.username}</span>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleBlock(player._id)}
                    className={`${
                      player.isBlocked
                        ? "bg-green-500 hover:bg-green-700"
                        : "bg-red-500 hover:bg-red-700"
                    } text-white font-semibold py-1 px-3 rounded transition duration-200`}
                  >
                    {player.isBlocked ? "Unblock" : "Block"}
                  </button>
                  <button
                    onClick={() => handleDelete(player._id)}
                    className="bg-gray-500 hover:bg-gray-700 text-white font-semibold py-1 px-3 rounded transition duration-200"
                  >
                    Delete
                  </button>
                </div>
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

export default BlogPlayer;
