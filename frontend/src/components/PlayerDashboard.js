import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { io } from "socket.io-client";
import Navbar from "./Navbar";

const PlayerDashboard = () => {
  const { user } = useAuth();
  const [bananaCount, setBananaCount] = useState(0);
  const [players, setPlayers] = useState([]);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if (user && user.id) {
      const newSocket = io("http://localhost:5000");
      setSocket(newSocket);

      newSocket.on("connect", () => {
        console.log("Socket connected:", newSocket.id);
      });

      newSocket.on("update_banana_counts", (data) => {
        console.log("Received data from server:", data);

        const formattedPlayers = Object.entries(data).map(
          ([playerId, playerData]) => ({
            id: playerId,
            name: playerData.name,
            count: playerData.count,
          })
        );

        const sortedPlayers = formattedPlayers.sort(
          (a, b) => b.count - a.count
        );

        setPlayers(sortedPlayers);

        const currentUserData = data[user.id];
        if (currentUserData) {
          setBananaCount(currentUserData.count);
        }
      });

      newSocket.on("disconnect", () => {
        console.log("Socket disconnected");
      });

      return () => {
        newSocket.off("update_banana_counts");
        newSocket.disconnect();
      };
    }
  }, [user]);

  const handleClick = () => {
    if (socket && user) {
      socket.emit("banana_click", user.id, (error) => {
        if (error) {
          console.error("Error emitting banana_click:", error);
        }
      });
    }
  };

  return (
    <>
      <Navbar bananaCount={bananaCount} />
      <div className="min-h-screen bg-gray-900 text-white p-6 md:p-8 flex flex-col items-center">
        {/* Title */}
        <h2 className="text-3xl md:text-4xl font-bold text-yellow-400 mb-8 text-center">
          🍌 Player Dashboard
        </h2>

        <div className="bg-gray-800 rounded-lg p-6 shadow-lg mb-8 w-full max-w-lg">
          <button
            onClick={handleClick}
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold py-3 rounded-full transition duration-200 transform hover:scale-105 text-lg"
          >
            + Add Banana
          </button>
          <p className="mt-4 text-center text-xl">
            Your Banana Count:{" "}
            <span className="font-bold text-yellow-400">{bananaCount}</span>
          </p>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 shadow-lg w-full max-w-5xl">
          <h3 className="text-2xl md:text-3xl font-bold mb-6 text-yellow-400 text-center">
            🍌 Active Players
          </h3>
          <ul className="space-y-4">
            {players.length > 0 ? (
              players.map((player, index) => (
                <li
                  key={player.id}
                  className="flex justify-between items-center p-4 bg-gray-700 rounded-md hover:bg-gray-600 transition duration-200"
                >
                  <div className="flex items-center">
                    <span className="text-xl font-semibold text-yellow-300 mr-4">
                      #{index + 1}
                    </span>
                    <span className="text-lg font-medium text-white">
                      {player.name}
                    </span>
                  </div>
                  <span className="text-lg font-semibold text-green-400">
                    {player.count} 🍌
                  </span>
                </li>
              ))
            ) : (
              <p className="text-gray-400 text-center">
                No players available yet.
              </p>
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default PlayerDashboard;
