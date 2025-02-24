"use client";

import Image from "next/image";
import React from "react";
import { IoSparkles } from "react-icons/io5";

import AgentCard from "@/components/AgentCard";
import { IoClose } from "react-icons/io5";
import { PiWarningCircleLight } from "react-icons/pi";

import { MuseoModerno } from "next/font/google";
import { IoIosAddCircleOutline } from "react-icons/io";

const museo = MuseoModerno({
  subsets: ["latin"],
  weight: ["400"],
});
import { handleOnDragStart, handleDragOver, handleOnDrop } from "./lib/utils";
import { AgentCardProps } from "./lib/interface";

const agentData = [
  {
    name: "Player 001",
    description: "The mysterious elderly contestant with a hidden agenda.",
    image: "/images/circle-red-preview.png",
    traits: ["Mastermind", "Deceptively Weak", "Cunning"],
  },
  {
    name: "Player 067",
    description: "A determined North Korean defector, skilled in survival.",
    image: "/images/triangle-red-preview.png",
    traits: ["Resourceful", "Brave", "Elusive"],
  },
  {
    name: "Player 456",
    description:
      "The desperate but kind-hearted protagonist with a gambler's luck.",
    image: "/images/circle-red-preview.png",
    traits: ["Lucky", "Empathetic", "Unpredictable"],
  },
  {
    name: "Player 218",
    description:
      "A brilliant but morally conflicted strategist, willing to do anything to win.",
    image: "/images/square-red-preview.png",
    traits: ["Calculating", "Manipulative", "Determined"],
  },
  {
    name: "Player 199",
    description:
      "A kind-hearted migrant worker with exceptional strength and loyalty.",
    image: "/images/circle-red-preview.png",
    traits: ["Strong", "Trustworthy", "Naïve"],
  },
  {
    name: "Player 101",
    description:
      "A violent gangster with a short temper and a taste for chaos.",
    image: "/images/triangle-red-preview.png",
    traits: ["Aggressive", "Unpredictable", "Ruthless"],
  },
  {
    name: "Player 212",
    description: "A loud and unpredictable wildcard who plays mind games.",
    image: "/images/square-red-preview.png",
    traits: ["Manipulative", "Flamboyant", "Survivor"],
  },
  {
    name: "Player 240",
    description: "A quiet but brave contestant with a tragic backstory.",
    image: "/images/circle-red-preview.png",
    traits: ["Selfless", "Courageous", "Loyal"],
  },
];

const Home = () => {
  const [agents, setAgents] = React.useState<AgentCardProps[]>([]);

  console.log(agents);

  return (
    <div className="flex flex-col  items-center p-6  min-h-screen ">
      <Image
        src={"/images/umbrella.png"}
        width={200}
        height={200}
        alt=""
        className="absolute w-72 h-72 inline-block left-[0px] text-gray-800  rotate-[-25deg] opacity-50"
      />
      <Image
        src={"/images/star.png"}
        width={200}
        height={200}
        alt=""
        className="absolute w-96 h-96 inline-block right-[0] bottom-20 text-gray-800 z-0 rotate-[20deg] opacity-50"
      />

      <p className={`text-6xl font-bold mb-4   `}>
        <span className={`text-[#F50276] `}>SQUID</span> CHAIN
      </p>

      <div
        className={`border-2 border-dashed border-[#FCF5E8]  bg-[#2c2c2c] w-[80%]   rounded-lg flex ${
          agents.length >= 3 ? "justify-start" : "justify-center"
        } gap-5 items-center p-7 overflow-x-scroll overflow-y-hidden shadow-lg agentCardScrollBar `}
        onDrop={(e) => handleOnDrop(e, setAgents)}
        onDragOver={handleDragOver}
      >
        {agents.length > 0 ? (
          agents.map((agent, index) => (
            <div
              className="relative flex p-5 gap-5 border rounded-lg bg-[#131313] border-[#F50276] flex-shrink-0  w-[300px]"
              key={index}
            >
              <IoClose
                className="absolute top-3 right-3 hover:bg-[#FCF5E8] rounded-full hover:text-[#F50276] cursor-pointer"
                size={20}
                onClick={() =>
                  setAgents((prev) => prev.filter((_, i) => i !== index))
                }
              />
              <Image
                src={agent.image}
                width={100}
                height={100}
                className="bg-[#FCF5E8] rounded-lg"
                alt={agent.name}
              />

              <div>
                <p className="text-lg  tracking-wide">{agent.name}</p>
                <p className={`text-xs  ${museo.className}`}>
                  {agent.description}
                </p>
              </div>
            </div>
            // <AgentCard
            //   key={index}
            //   name={agent.name}
            //   description={agent.description}
            //   image={agent.image}
            //   traits={agent.traits}
            // />
          ))
        ) : (
          <div className="flex flex-col justify-center items-center">
            <p className={"text-lg text-[#fff] " + museo.className}>
              Drop your agents here
            </p>
            <IoIosAddCircleOutline size={50} />
          </div>
        )}
      </div>

      <button
        disabled={agents.length < 3}
        className={`px-6 py-1 text-md mt-5  rounded-lg ${
          agents.length < 3
            ? "bg-gray-400 text-gray-700 cursor-not-allowed"
            : "bg-[#F50276] text-white hover:bg-[#d40063] cursor-pointer"
        }`}
      >
        Create Game
      </button>

      {agents.length > 0 && agents.length < 3 && (
        <div
          className={`flex gap-3 mt-2 items-center justify-center text-xs text-red-400 ${museo.className} `}
        >
          <PiWarningCircleLight size={20} />
          <p>You need to select at least 3 agents to start the game.</p>
        </div>
      )}

      <div className="w-[92%] absolute bottom-0 ">
        <p className="text-2xl  mb-4">Agents List</p>
        <div className="flex gap-10 overflow-x-scroll overflow-y-hidden pb-5 ">
          {agentData.map((agent, index) => (
            <AgentCard
              key={index}
              name={agent.name}
              description={agent.description}
              image={agent.image}
              onDragStart={(e) => handleOnDragStart(e, agent)}
              traits={agent.traits}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
