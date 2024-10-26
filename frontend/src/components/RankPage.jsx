import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000", { transports: ["websocket"] });

const RankPage = () => {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Socket connected:", socket.id);
    });

    socket.on("update_banana_counts", (data) => {
      console.log("Received data from server:", data);
      if (data) {
        const sortedPlayers = Object.entries(data).sort(
          ([, countA], [, countB]) => countB - countA
        );
        setPlayers(sortedPlayers);
      } else {
        console.error("No data received from update_banana_counts");
      }
    });

    return () => {
      socket.off("update_banana_counts");
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h3 className="text-3xl font-bold mb-6">Ranking</h3>
      <ul className="bg-gray-800 rounded-lg p-6 shadow-md space-y-4">
        {players.length > 0 ? (
          players.map(([playerId, count]) => (
            <li
              key={playerId}
              className="flex justify-between items-center border-b border-gray-700 pb-2"
            >
              <span className="text-lg">Player {playerId}</span>
              <span className="font-bold">{count} bananas</span>
            </li>
          ))
        ) : (
          <p className="text-gray-400">No players available yet.</p>
        )}
      </ul>
    </div>
  );
};

export default RankPage;
