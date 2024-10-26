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
      <div className="min-h-screen bg-gray-900 text-white p-8">
        <h2 className="text-4xl font-bold mb-6">Player Dashboard</h2>
        <div className="bg-gray-800 rounded-lg p-6 shadow-md mb-8">
          <button
            onClick={handleClick}
            className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition duration-200"
          >
            Banana
          </button>
          <p className="mt-4 text-lg">
            Your Banana Count: <span className="font-bold">{bananaCount}</span>
          </p>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 shadow-md">
          <h3 className="text-2xl font-bold mb-4">Players</h3>
          <ul className="space-y-2">
            {players.length > 0 ? (
              players.map((player) => (
                <li
                  key={player.id}
                  className="flex justify-between border-b border-gray-700 pb-2"
                >
                  <span className="text-lg">{player.name}</span>
                  <span className="font-bold">{player.count} bananas</span>
                </li>
              ))
            ) : (
              <p className="text-gray-400">No players available yet.</p>
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default PlayerDashboard;
