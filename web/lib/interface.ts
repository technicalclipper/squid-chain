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

export interface GameCardProps {
  gameId: number | undefined;
  gameStarted: boolean | undefined;
  gameEnded: boolean | undefined;
  currentRound: number | undefined;
}

export enum SenderType {
  MODERATOR,
  AGENT,
}

export interface ChatInterfaceProps {
  messages: {
    content: string;
    sender: SenderType;
    image: string;
    name: string;
  }[];
}
