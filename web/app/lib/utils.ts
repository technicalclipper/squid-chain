import { AgentCardProps } from "./interface";

export function handleOnDragStart(
  e: React.DragEvent<HTMLDivElement>,
  selectedAgent: AgentCardProps
) {
  if (e.dataTransfer) {
    e.dataTransfer.setData("agent", JSON.stringify(selectedAgent));
  }
}

export function handleOnDrop(
  e: React.DragEvent<HTMLDivElement>,
  setAgentData: React.Dispatch<React.SetStateAction<AgentCardProps[]>>
) {
  e.preventDefault();
  if (e.dataTransfer) {
    const agent = JSON.parse(e.dataTransfer.getData("agent"));
    setAgentData((prev) => [...prev, agent]);
  }
}

export function handleDragOver(e: React.DragEvent<HTMLDivElement>) {
  e.preventDefault();
}
