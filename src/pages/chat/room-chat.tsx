import { useRef, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import HeaderChat from "./header-chat";
import {
  getChatMessages,
  postChatMessage,
  deleteChatBubble,
} from "@/utils/apis/chat/api";
import Loaders from "@/components/loaders";
import BubbleChat from "./bubble-chat";
import FormChat from "./form-chat";
import { useAtom } from "jotai";
import { loadingRoomChat } from "@/utils/jotai/atom";

interface IProps {
  roomChatId: number;
}

const RoomChat = ({ roomChatId }: IProps) => {
  const [updatedChat, setUpdatedChat] = useState<string>("");
  const [loading, setLoading] = useAtom(loadingRoomChat);
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
        setMessages(newMessages.data);
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
    if (!updatedChat.trim()) {
      return;
    }
    setSending(true);
    try {
      const response = await postChatMessage(roomChatId, updatedChat);
      if (response) {
        const newMessage = {
          message: updatedChat,
          sender: { id: loginId },
          time_stamp: new Date().toISOString(),
        };
        setMessages((prevMessages) => [...prevMessages, newMessage]);
        setUpdatedChat("");
      }
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setSending(false);
    }
  };

  const handleDelete = async (bubbleId: number) => {
    try {
      const response = await deleteChatBubble(roomChatId, bubbleId);
      if (response) {
        setMessages((prevMessages) => prevMessages.filter((message) => message.id !== bubbleId));
      }
    } catch (error) {
      console.error("Error deleting message:", error);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      sendMessage();
    }
  };

  if (loading) {
    return (
      <main className="relative min-h-[400px] w-full flex items-center justify-center">
        <Loaders className="" />
      </main>
    );
  }

  return (
    <div className={`relative w-full h-full flex flex-col`}>
      <HeaderChat roomChatId={roomChatId} />
      {loading ? (
        <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 flex justify-center py-5">
          <Loaders />
        </div>
      ) : (
        <div className="h-full relative flex flex-col gap-3 overflow-y-scroll px-5 pt-3 pb-0">
          <section className="grid grid-cols-1 grid-flow-row auto-rows-max gap-y-2">
            {messages.length > 0 ? messages.map((message, index) => <BubbleChat key={index} message={message} loginId={loginId} onDelete={() => handleDelete(message.id)} />) : <p>No messages</p>}
          </section>
          <FormChat sendMessage={sendMessage} updatedChat={updatedChat} handleKeyDown={handleKeyDown} sending={sending} autoScrollToBottom={autoScrollToBottom} setUpdatedChat={setUpdatedChat} />
        </div>
      )}
    </div>
  );
};

export default RoomChat;
