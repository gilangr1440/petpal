import { useRef, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import HeaderChat from "./header-chat";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { getChatMessages, postChatMessage } from "@/utils/apis/chat/api";

interface IProps {
  roomChatId: number;
}

const RoomChat = ({ roomChatId }: IProps) => {
  const [newChat, setNewChat] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [messages, setMessages] = useState<any[] | null>([]);
  const [sending, setSending] = useState<boolean>(false);

  const [cookies] = useCookies();
  const loginId = cookies.login_id;

  const scrollerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollerRef.current) {
      scrollerRef.current.scrollTop = scrollerRef.current.scrollHeight;
    }
  }, [messages]);

  const getMessages = async () => {
    setLoading(true);
    const newMessages = await getChatMessages(roomChatId);
    if (Array.isArray(newMessages.data)) {
      setMessages((prevMessages: any) => {
        prevMessages.push(...newMessages.data);
        return prevMessages;
      });
    } else {
      console.error(
        "Expected an array of messages, but got:",
        newMessages.data
      );
    }
    setLoading(false);
  };

  useEffect(() => {
    getMessages();
  }, [roomChatId]);

  const sendMessage = async () => {
    if (!newChat.replace(/\s+/g, "")) {
      return;
    }
    setSending(true);
    const response = await postChatMessage(roomChatId, newChat);
    console.log(response);
    if (response) {
      const newMessage = {
        message: newChat,
        sender_id: loginId,
      };
      if (messages) {
        setMessages([...messages, newMessage]);
      } else {
        setMessages([newMessage]);
      }
      setNewChat("");
      setSending(false);
    } else {
      setSending(false);
    }
  };

  return (
    <div className={`relative w-full h-full flex flex-col`}>
      <HeaderChat />
      {loading ? (
        <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 flex justify-center py-5">
          <svg
            className="animate-spin h-5 w-5 text-gray-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12H4zm2 5.291A7.962 7.962 0 014 19.708a7.962 7.962 0 0114-3.708zM12 22C9.715 22 7 20.286 7 18V7c0-3.309 2.715-6 6-6 3.309 0 6 2.691 6 6z"
            />
          </svg>
        </div>
      ) : (
        <div
          id="scroller"
          ref={scrollerRef}
          className="relative flex flex-col gap-3 overflow-y-scroll px-5 pt-3 pb-0"
        >
          {messages && Array.isArray(messages) ? (
            messages.map((message: any, index: number) => (
              <div
                key={index}
                className={`flex ${
                  message.sender_id === loginId
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                <div
                  className={`w-fit rounded-lg p-2 ${
                    message.sender_id === loginId
                      ? "bg-[#9ED1E3]"
                      : "bg-[#C6D6CE]"
                  }`}
                >
                  <p className="text-justify">{message.message}</p>
                </div>
              </div>
            ))
          ) : (
            <p>No messages</p>
          )}
          <div className="sticky top-full right-0 w-full flex items-center gap-3 py-3">
            <Input
              value={newChat}
              onChange={(e) => setNewChat(e.target.value)}
              placeholder="type some text"
            />
            <Button onClick={sendMessage}>
              {sending ? (
                <div className="flex justify-center py-5">
                  <svg
                    className="animate-spin h-5 w-5 text-gray-500"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12H4zm2 5.291A7.962 7.962 0 014 19.708a7.962 7.962 0 0114-3.708zM12 22C9.715 22 7 20.286 7 18V7c0-3.309 2.715-6 6-6 3.309 0 6 2.691 6 6z"
                    />
                  </svg>
                </div>
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
