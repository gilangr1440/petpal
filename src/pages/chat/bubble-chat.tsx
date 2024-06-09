import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";

interface IProps {
  message: any;
  loginId: number;
  onDelete: () => void; // Add this prop
}

const formatTime = (timeStamp: string) => {
  const date = new Date(timeStamp);
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};

const BubbleChat = ({ message, loginId, onDelete }: IProps) => {
  const isSenderDefined = message.sender && message.sender.id;

  return (
    <div
      className={`w-fit rounded-lg p-2 cursor-pointer ${
        isSenderDefined && loginId === message.sender.id
          ? "justify-self-end bg-blue-200"
          : "justify-self-start bg-gray-300"
      }`}
    >
      <ContextMenu>
        <ContextMenuTrigger>
          <div className="flex items-end justify-start flex-row gap-x-2">
            <h1 className="text-base font-regular">{message.message}</h1>
            <p className="text-xs text-opacity-30 text-black">
              {formatTime(message.time_stamp)}
            </p>
          </div>
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem onClick={onDelete}>Delete</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    </div>
  );
};

export default BubbleChat;
