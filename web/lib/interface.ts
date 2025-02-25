export interface AgentCardProps {
  id: number | undefined;
  name: string | undefined;
  description: string | undefined;
  image: string | undefined;
  traits: string[] | undefined;
  fromGame?: boolean | undefined;
  onClicked?: () => void;
  onDragStart?: (
    e: React.DragEvent<HTMLDivElement>,
    data: { name: string; description: string; image: string }
  ) => void;
}
