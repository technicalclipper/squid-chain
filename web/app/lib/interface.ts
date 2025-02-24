export interface AgentCardProps {
  id: number;
  name: string;
  description: string;
  image: string;
  traits: string[];
  onDragStart?: (
    e: React.DragEvent<HTMLDivElement>,
    data: { name: string; description: string; image: string }
  ) => void;
}
