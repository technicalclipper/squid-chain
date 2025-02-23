"use client";

import Image from "next/image";
import React from "react";

import { MuseoModerno } from "next/font/google";

const museo = MuseoModerno({
  subsets: ["latin"],
  weight: ["400"],
});

const agentData = [
  {
    name: "Player 001",
    description: "The mysterious elderly contestant.",
    image: "/images/circle-red-preview.png",
  },
  {
    name: "Player 067",
    description: "A determined North Korean defector.",
    image: "/images/triangle-red-preview.png",
  },
  {
    name: "Player 456",
    description: "The desperate but kind-hearted protagonist.",
    image: "/images/circle-red-preview.png",
  },
  {
    name: "Player 218",
    description: "A brilliant but morally conflicted strategist.",
    image: "/images/square-red-preview.png",
  },
  {
    name: "Player 101",
    description: "A violent gangster with a short temper.",
    image: "/images/triangle-red-preview.png",
  },
  {
    name: "Player 199",
    description: "A kind-hearted migrant worker from Pakistan.",
    image: "/images/square-red-preview.png",
  },
];

const Home = () => {
  return (
    <div className="flex flex-col justify-center items-center p-6 gap-5 min-h-screen">
      <p className="text-6xl font-bold mb-4">
        <span className={`text-[#F50276]`}>SQUID</span> CHAIN
      </p>

      <div
        className={`border-2 border-[#fff] w-[80%] h-[80vh] rounded-lg flex justify-between p-4  shadow-lg`}
      >
        <div className="grid grid-cols-2 gap-4 w-[35%]">
          {agentData.map((agent, index) => (
            <div
              key={index}
              className="flex flex-col justify-between items-center transition-all duration-300 p-5 border border-[#F50276] rounded-lg bg-[#1A1A1A] hover:bg-[#FCF5E8] hover:text-[#F50276]"
            >
              <div>
                <Image
                  src={agent.image}
                  width={100}
                  height={100}
                  alt={agent.name}
                />
              </div>
              <p className="text-lg ">{agent.name}</p>
              <p className={`text-sm text-center ${museo.className}`}>
                {agent.description}
              </p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-4 w-[35%]">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className={`p-5 border border-[#F50276] rounded-lg hover:bg-[#F50276] hover:text-white transition-colors`}
            >
              <p>Agent {index + 1}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
