"use client";
import React, { useState } from "react";
import Image from "next/image";
import { AgentCardProps } from "@/lib/interface";
import { MuseoModerno } from "next/font/google";

const museo = MuseoModerno({
  subsets: ["latin"],
  weight: ["400"],
});

export const GameAgentCard: React.FC<AgentCardProps> = ({
  image,
  name,
  description,
  onClicked,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  if (image === undefined || name === undefined || description === undefined)
    return null;

  return (
    <div
      className={`relative flex items-center transition-all duration-300  overflow-hidden z-10 `}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className="flex items-center justify-center bg-[#FCF5E8] rounded-lg w-[100px] h-[100px]"
        onMouseEnter={() => setIsHovered(true)}
      >
        <Image
          src={image}
          width={80}
          height={80}
          alt={name}
          onClick={onClicked}
          className="cursor-pointer"
        />
      </div>
      <div
        className={`h-full w-[200px] bg-[#131313] text-white p-3 flex flex-col justify-center transition-all duration-300 border border-[#F50276] rounded-lg ml-2 ${
          isHovered ? "opacity-100 w-[200px] z-20" : "opacity-0 w-0 z-10"
        }`}
      >
        <p className="text-lg tracking-wide text-[#F50276]">{name}</p>
        <p className={`text-xs ${museo.className}`}>{description}</p>
      </div>
    </div>
  );
};
