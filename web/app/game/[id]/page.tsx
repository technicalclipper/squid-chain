"use client";
import React, { useEffect, useState } from "react";
import AgentCard from "@/components/AgentCard";
import Image from "next/image";
import { agentData } from "@/lib/utils";
import { MuseoModerno } from "next/font/google";
import { GameAgentCard } from "@/components/GameAgentCard";
import { AgentCardProps } from "@/lib/interface";
const museo = MuseoModerno({
  subsets: ["latin"],
  weight: ["400"],
});

const GamePage = () => {
  const [temp, setTemp] = useState<number>(0);
  const [selectedAgent, setSelectedAgent] = useState<
    AgentCardProps | undefined
  >(undefined);

  useEffect(() => {
    const interval = setInterval(() => {
      setTemp((prev) => prev + 0.003);
    }, 10);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white relative">
      {/* Moderator in the center */}
      <div className="absolute left-0 w-[20%] bg-[#121212] h-screen">
        Settings
      </div>

      <div className="absolute right-0 w-[20%]  h-screen">
        <div className="bg-[#131313] h-fit">
          <AgentCard
            id={selectedAgent?.id}
            name={selectedAgent?.name}
            description={selectedAgent?.description}
            image={selectedAgent?.image}
            traits={selectedAgent?.traits}
            fromGame={true}
          />
        </div>
        <div className="bg-[#131313]   h-[70%]"></div>
      </div>

      <div>
        <div className="absolute z-10 w-24 h-24 flex items-center justify-center bg-[#F50276] text-white text-lg font-bold rounded-full shadow-lg top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border-4 border-white">
          Moderator
        </div>
        {/* Agent Cards in a circle */}
        <div className="relative  flex items-center justify-center transition-all duration-300">
          {agentData.map((agent, index) => {
            const angle = (index / agentData.length) * (2 * Math.PI);
            const x = 270 * Math.cos(angle + temp);

            const y = 270 * Math.sin(angle + temp);

            console.log(
              `Index : ${index} \n Angle:  ${angle} \n x: ${x},  y: ${y}`
            );
            return (
              <div
                key={agent.id}
                className="absolute "
                style={{ transform: `translate(${x + 105}px, ${y}px)` }}
              >
                <GameAgentCard
                  id={agent.id}
                  image={agent.image}
                  name={agent.name}
                  description={agent.description}
                  traits={agent.traits}
                  onClicked={() => setSelectedAgent(agent)}
                />
                {/* Line connecting to moderator */}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default GamePage;
