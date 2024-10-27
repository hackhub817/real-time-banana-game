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

  return (
    <>
      <Navbar bananaCount={bananaCount} />
      <div className="min-h-screen bg-gray-900 text-white p-6 flex justify-center">
        <div className="bg-gray-800 rounded-lg p-8 shadow-lg w-full max-w-4xl">
          <h3 className="text-3xl font-bold text-yellow-400 text-center mb-6">
            🍌 Active Players (Rankwise)
          </h3>
          <ul className="divide-y divide-gray-700 ">
            {players.length > 0 ? (
              players.map((player, index) => (
                <li
                  key={player.id}
                  className="flex mt-2 justify-between items-center py-4 px-6 bg-gray-700 hover:bg-gray-600 rounded-md transition duration-200"
                >
                  <div className="flex items-center ">
                    <span className="text-xl font-semibold text-yellow-300 mr-3">
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
              <p className="text-gray-400 text-center mt-4">
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
