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
      <div className="min-h-screen bg-gray-900 text-white p-8">
        <div className="bg-gray-800 rounded-lg p-6 shadow-md">
          <h3 className="text-2xl font-bold mb-4">Active Players</h3>
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
