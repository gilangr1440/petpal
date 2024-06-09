import Loaders from "@/components/loaders";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
import React from "react";

interface IProps {
  updatedChat: string;
  setUpdatedChat: React.Dispatch<React.SetStateAction<string>>;
  sending: boolean;
  sendMessage: () => void;
  autoScrollToBottom: React.RefObject<HTMLInputElement>;
  handleKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

const FormChat = (props: IProps) => {
  const {
    updatedChat,
    setUpdatedChat,
    sending,
    sendMessage,
    autoScrollToBottom,
    handleKeyDown,
  } = props;
  return (
    <div className="sticky top-full right-0 w-full flex items-center gap-3 py-3">
      <Input
        id="inputChat"
        value={updatedChat}
        onChange={(e) => setUpdatedChat(e.target.value)}
        placeholder="type some text"
        ref={autoScrollToBottom}
        onKeyDown={handleKeyDown}
      />
      <Button onClick={sendMessage}>
        {sending ? <Loaders className="" width="w-5" height="h-5" /> : <Send />}
      </Button>
    </div>
  );
};

export default FormChat;
