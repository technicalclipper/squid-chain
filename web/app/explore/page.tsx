"use client";
import React from "react";
import { useAccount, useReadContract } from "wagmi";
import { wagmiContractConfig } from "../../lib/contract";

const Explore = () => {
  const { address } = useAccount();
  const { data: gameRooms } = useReadContract({
    ...wagmiContractConfig,
    functionName: "getGameRoomsByUser",
    //@ts-expect-error
    args: [address],
  });

  return (
    <div className="flex flex-wrap gap-4">
      {gameRooms?.map((gameRoom, index) => (
        <div
          key={index}
          className="border border-gray-300 rounded-lg p-4 w-72 shadow-md"
        >
          <div className="font-bold mb-2">
            Game ID: {gameRoom.gameId.toString()}
          </div>
          <div>Game Started: {gameRoom.gameStarted.toString()}</div>
          <div>Game Ended: {gameRoom.gameEnded.toString()}</div>
          <div>Current Round: {gameRoom.currentRound.toString()}</div>

          <div className="mt-4 font-bold">Agents</div>
          {gameRoom.agents.map((agent, agentIndex) => (
            <div key={agentIndex} className="mt-2">
              {agent.agentId.toString()} {agent.name}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Explore;
