import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";

const LeaderBoard = () => {
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/admin/leaderboard`,
          {
            withCredentials: true,
          }
        );
        console.log("res", response.data);
        setLeaderboard(response.data);
      } catch (error) {
        console.error("Error fetching leaderboard:", error);
      }
    };
    fetchLeaderboard();
  }, []);

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-900 p-4 md:p-6">
        <div className="w-full max-w-4xl bg-gray-800 rounded-lg shadow-lg p-6 md:p-8">
          <h2 className="text-2xl md:text-4xl font-bold text-yellow-400 text-center mb-6 md:mb-8">
            🏆 Leaderboard
          </h2>
          <ul className="space-y-4 md:space-y-6">
            {leaderboard.map((player, index) => (
              <li
                key={player._id}
                className="flex flex-col md:flex-row justify-between items-center bg-gray-700 px-4 md:px-6 py-3 rounded-md shadow hover:bg-gray-600 transition duration-200"
              >
                <div className="flex items-center space-x-2 md:space-x-4">
                  <span className="text-xl md:text-2xl font-semibold text-yellow-400">
                    #{index + 1}
                  </span>
                  <span className="text-lg md:text-xl font-medium text-white">
                    {player.username}
                  </span>
                </div>
                <span className="text-lg md:text-xl font-semibold text-green-400 mt-2 md:mt-0">
                  {player.bananaCount} 🍌
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default LeaderBoard;
