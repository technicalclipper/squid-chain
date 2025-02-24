import React from "react";
import Image from "next/image";
import { MuseoModerno } from "next/font/google";
import { AgentCardProps } from "@/app/lib/interface";

const museo = MuseoModerno({
  subsets: ["latin"],
  weight: ["400"],
});

const AgentCard: React.FC<AgentCardProps> = ({
  name,
  description,
  image,
  traits,
  onDragStart,
}) => {
  const [borderColor, setBorderColor] = React.useState<string>("#06BA99");
  return (
    <div
      onMouseEnter={() => {
        setBorderColor("#F50276");
      }}
      onMouseLeave={() => {
        setBorderColor("#06BA99");
      }}
      className="flex flex-col flex-shrink-0 w-[250px] h-full justify-between items-start transition-all duration-300 p-5 border border-[#F50276] rounded-lg bg-[#131313] hover:bg-[#FCF5E8] hover:text-[#F50276]"
      draggable={true}
      onDragStart={(e) =>
        onDragStart && onDragStart(e, { name, description, image })
      }
    >
      <div className="flex justify-center w-full">
        <Image src={image} width={100} height={100} alt={name} />
      </div>
      <p className="text-2xl  tracking-wide">{name}</p>
      <p className={`text-sm  ${museo.className}`}>{description}</p>
      <div className="flex items-center gap-2 mt-3 w-full overflow-x-scroll agentCardScrollBar pr-1 ">
        {traits.map((trait, index) => (
          <p
            key={index}
            className={`text-xs ${museo.className} bg-white text-black px-3 text-nowrap rounded-md border border-[${borderColor}]`}
          >
            {trait}
          </p>
        ))}
      </div>
    </div>
  );
};

export default AgentCard;
