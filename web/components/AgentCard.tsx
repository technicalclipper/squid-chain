import React from "react";
import Image from "next/image";
import { AgentCardProps } from "@/app/lib/interface";

const AgentCard: React.FC<AgentCardProps> = ({
  name,
  description,
  image,
  onDragStart,
}) => {
  return (
    <div
      className="flex flex-col justify-between items-center transition-all duration-300 p-5 border border-[#F50276] rounded-lg bg-[#1A1A1A] hover:bg-[#FCF5E8] hover:text-[#F50276]"
      draggable={true}
      onDragStart={(e) =>
        onDragStart && onDragStart(e, { name, description, image })
      }
    >
      <div>
        <Image src={image} width={100} height={100} alt={name} />
      </div>
      <p className="text-lg ">{name}</p>
      <p className="text-sm text-center">{description}</p>
    </div>
  );
};

export default AgentCard;
