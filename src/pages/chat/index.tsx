import Navbar from "@/components/navbar";
import { useCookies } from "react-cookie";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Menu, Send } from "lucide-react";
import { useEffect, useState } from "react";

import axiosWithConfig from "@/utils/apis/axiosWithConfig";
import { Button } from "@/components/ui/button";

const getChatMessages = async (chatId: number) => {
  try {
    const response = await axiosWithConfig.get(
      `${import.meta.env.VITE_BASE_URL}/chats/${chatId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching chat messages:", error);
    return [];
  }
};

const postChatMessage = async (chatId: number, message: string) => {
  try {
    const response = await axiosWithConfig.post(
      `${import.meta.env.VITE_BASE_URL}/chats/${chatId}`,
      { message }
    );
    return response.data;
  } catch (error) {
    console.error("Error sending chat message:", error);
    return null;
  }
};

const Chat = () => {
  const [sideMenu, setSideMenu] = useState<boolean>(false);
  const [messages, setMessages] = useState<any[] | null>([]);
  const [newChat, setNewChat] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [cookies] = useCookies();
  const loginId = cookies.login_id;

  const getMessages = async () => {
    setLoading(true);
    const chatId = 1;
    const messages = await getChatMessages(chatId);
    setMessages(messages.data);
    setLoading(false);
  };

  const sendMessage = async () => {
    setLoading(true);
    const chatId = 1;
    const response = await postChatMessage(chatId, newChat);
    if (response) {
      setNewChat("");
      getMessages();
    } else {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMessages();
  }, []);

  useEffect(() => {
    const messageBody = document.querySelector("#scroller");
    if (messageBody) {
      messageBody.scrollTop =
        messageBody.scrollHeight - messageBody.clientHeight;
    }
  }, [messages]);

  return (
    <>
      <Navbar />
      <div className="flex h-[88.8vh]">
        <div
          className={`w-3/12 h-full ${
            sideMenu ? "flex w-[50%]" : "hidden"
          } bg-[#64A1B7] md:flex flex-col gap-3 items-center p-3`}
        >
          <div className="w-full p-3 rounded-md flex items-center gap-3 bg-[#226583] hover:bg-[#226583]/70 cursor-pointer">
            <Avatar className="w-10 h-10">
              <AvatarImage
                src="https://github.com/shadcn.png"
                className="w-full h-full object-cover rounded-full"
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <h1 className="text-white">John Doe</h1>
          </div>
          <div className="w-full p-3 rounded-md flex items-center gap-3 bg-[#3487AC] hover:bg-[#226583]/70 cursor-pointer">
            <Avatar className="w-10 h-10">
              <AvatarImage
                src="https://github.com/shadcn.png"
                className="w-full h-full object-cover rounded-full"
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <h1 className="text-white">John Doe</h1>
          </div>
        </div>
        <div
          className={` ${
            sideMenu ? "w-[50%]" : "w-full"
          } md:w-9/12 h-full flex flex-col`}
        >
          <div className="w-full h-16 bg-[#D9D9D9] flex items-center gap-3 p-3">
            <div
              onClick={() => {
                setSideMenu(!sideMenu);
              }}
              className="p-5 md:hidden"
            >
              <Menu />
            </div>
            <Avatar className="w-10 h-10">
              <AvatarImage
                src="https://github.com/shadcn.png"
                className="w-full h-full object-cover rounded-full"
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <h1 className="">John Doe</h1>
          </div>
          <div
            id="scroller"
            className="flex-grow flex flex-col gap-3 overflow-y-scroll p-5"
          >
            {messages && Array.isArray(messages) ? (
              messages.map((message: any, index: number) => (
                <div
                  key={index}
                  className={`flex justify-${
                    loginId === message.sender_id ? "end" : "start"
                  }`}
                >
                  <div
                    className={`w-fit max-w-[45%] bg-${
                      loginId === message.sender_id ? "[#9ED1E3]" : "[#C6D6CE]"
                    } p-3 rounded-md`}
                  >
                    <p className="text-justify">{message.message}</p>
                  </div>
                </div>
              ))
            ) : (
              <p>No messages</p>
            )}
          </div>
          <div className="w-full flex items-center gap-3 p-3">
            <Input
              value={newChat}
              onChange={(e) => setNewChat(e.target.value)}
              placeholder="type some text"
            />
            <Button onClick={sendMessage} disabled={loading}>
              {loading ? (
                <div role="status">
                  <svg
                    aria-hidden="true"
                    className="w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                  <span className="sr-only">Loading...</span>
                </div>
              ) : (
                <Send />
              )}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chat;
<div className="flex justify-end">
  <div className="w-[45%] bg-[#9ED1E3] p-3 rounded-md">
    <p className="text-justify">
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Recusandae, quae
      officia nemo excepturi quos qui dolorum natus, quo dignissimos reiciendis
      cumque ducimus veniam? Eos, doloribus.
    </p>
  </div>
</div>;
