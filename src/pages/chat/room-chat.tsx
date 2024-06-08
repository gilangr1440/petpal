import { useRef, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import HeaderChat from "./header-chat";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { getChatMessages, postChatMessage } from "@/utils/apis/chat/api";
import Loaders from "@/components/loaders";
import BubbleChat from "./bubble-chat";

interface IProps {
  roomChatId: number;
}

const RoomChat = ({ roomChatId }: IProps) => {
  const [newChat, setNewChat] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [messages, setMessages] = useState<any[]>([]);
  const [sending, setSending] = useState<boolean>(false);

  const [cookies] = useCookies();
  const loginId = cookies.login_id;

  const autoScrollToBottom = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (autoScrollToBottom.current) {
      autoScrollToBottom.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []);
  const getMessages = async () => {
    setLoading(true);
    try {
      const newMessages = await getChatMessages(roomChatId);
      if (Array.isArray(newMessages.data)) {
        setMessages((prevMessages) => [...prevMessages, ...newMessages.data]);
      } else {
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMessages();
  }, [roomChatId]);

  useEffect(() => {
    setMessages([]);
  }, [roomChatId]);

  const sendMessage = async () => {
    if (!newChat.trim()) {
      return;
    }
    setSending(true);
    try {
      const response = await postChatMessage(roomChatId, newChat);
      if (response) {
        const newMessage = {
          message: newChat,
          sender_id: loginId,
        };
        setMessages((prevMessages) => [...prevMessages, newMessage]);
        setNewChat("");
      }
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setSending(false);
    }
  };

  console.log(messages);

  return (
    <div className={`relative w-full h-full flex flex-col`}>
      <HeaderChat roomChatId={roomChatId} />
      {loading ? (
        <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 flex justify-center py-5">
          <Loaders />
        </div>
      ) : (
        <div className="h-full relative flex flex-col gap-3 overflow-y-scroll px-5 pt-3 pb-0">
          {messages.length > 0 ? (
            messages.map((message, index) => (
              <BubbleChat key={index} message={message} loginId={loginId} />
            ))
          ) : (
            <p>No messages</p>
          )}
          <div className="sticky top-full right-0 w-full flex items-center gap-3 py-3">
            <Input
              id="inputChat"
              value={newChat}
              onChange={(e) => setNewChat(e.target.value)}
              placeholder="type some text"
              ref={autoScrollToBottom}
            />
            <Button onClick={sendMessage}>
              {sending ? (
                <Loaders className="" width="w-5" height="h-5" />
              ) : (
                <Send />
              )}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoomChat;
