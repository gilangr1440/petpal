import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";

interface IProps {
  message: any;
  loginId: number;
}

const formatTime = (timeStamp: string) => {
  const date = new Date(timeStamp);
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};

const BubbleChat = ({ message, loginId }: IProps) => {
  return (
    <div
      className={`flex ${
        message.sender_id === loginId ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`w-fit rounded-lg p-2 cursor-pointer ${
          message.sender_id === loginId ? "bg-[#9ED1E3]" : "bg-[#C6D6CE]"
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
            <ContextMenuItem>Delete</ContextMenuItem>
            <ContextMenuItem>Edit</ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>
      </div>
    </div>
  );
};

export default BubbleChat;
