"use client";

import Image from "next/image";
import React from "react";

import { MuseoModerno } from "next/font/google";
import AgentCard from "@/components/AgentCard";
import { handleOnDragStart, handleDragOver, handleOnDrop } from "./lib/utils";
import { AgentCardProps } from "./lib/interface";

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
];

const Home = () => {
  const [agents, setAgents] = React.useState<AgentCardProps[]>([]);

  console.log(agents);

  return (
    <div className="flex flex-col justify-center items-center p-6 gap-5 min-h-screen">
      <p className="text-6xl font-bold mb-4">
        <span className={`text-[#F50276]`}>SQUID</span> CHAIN
      </p>

      <div
        className={`border-2 border-[#fff] w-[80%]  rounded-lg flex justify-between items-center p-7  shadow-lg`}
      >
        <div className="grid grid-cols-2 gap-4 w-[35%]">
          {agentData.map((agent, index) => (
            <AgentCard
              key={index}
              name={agent.name}
              description={agent.description}
              image={agent.image}
              onDragStart={(e) => handleOnDragStart(e, agent)}
            />
          ))}
        </div>

        <div
          className=""
          onDrop={(e) => handleOnDrop(e, setAgents)}
          onDragOver={handleDragOver}
        >
          {agents.length > 0 ? (
            agents.map((agent, index) => (
              <AgentCard
                key={index}
                name={agent.name}
                description={agent.description}
                image={agent.image}
              />
            ))
          ) : (
            <div className="w-[200px] h-[200px] border-2 border-[#fff] rounded-lg flex justify-center items-center">
              <p className="text-lg text-[#fff]">Drop your agents here</p>
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4 w-[35%]">
          {agentData.map((agent, index) => (
            <AgentCard
              key={index}
              name={agent.name}
              description={agent.description}
              image={agent.image}
              onDragStart={(e) => handleOnDragStart(e, agent)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
