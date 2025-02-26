import { GameCardProps } from "@/lib/interface";
import React from "react";
import { Skeleton } from "./ui/skeleton";

const GameCard: React.FC<GameCardProps> = ({
  gameId,
  gameStarted,
  gameEnded,
  currentRound,
}) => {
  if (
    gameId === undefined ||
    gameStarted === undefined ||
    gameEnded === undefined ||
    currentRound === undefined
  )
    return (
      <div className="w-full flex flex-col justify-between p-5 bg-[#FCF5E8] rounded-lg shadow-md">
        <div className="flex justify-center w-full">
          <Skeleton className="h-[50px] w-[50px] rounded-lg" />
        </div>
        <Skeleton className="h-5 w-[40%] mt-4" />

        <div className="space-y-2 mt-4">
          <Skeleton className="h-2 w-full" />
          <Skeleton className="h-2 w-[90%]" />
        </div>

        <div className="mt-3 flex gap-2 pr-1">
          <Skeleton className="h-4 flex-1 rounded-xl" />
          <Skeleton className="h-4 flex-1 rounded-xl" />
          <Skeleton className="h-4 flex-1 rounded-xl" />
        </div>
      </div>
    );

  return (
    <div className="w-full flex flex-col justify-between border p-5   shadow-md">
      <p className="text-2xl  mb-4">Game Room</p>
      <div className="mb-2">
        <span className="">Game ID:</span> {gameId.toString()}
      </div>
      <div className="mb-2">
        <span className="">Game Started:</span> {gameStarted.toString()}
      </div>
      <div className="mb-2">
        <span className="">Game Ended:</span> {gameEnded.toString()}
      </div>
      <div className="mb-2">
        <span className="">Current Round:</span> {currentRound.toString()}
      </div>
    </div>
  );
};

export default GameCard;
