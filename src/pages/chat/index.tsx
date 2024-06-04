import Navbar from "@/components/navbar";
import { useCookies } from "react-cookie";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Menu, Send } from "lucide-react";
import { useEffect, useState } from "react";

import axiosWithConfig from "@/utils/apis/axiosWithConfig";

const getChatMessages = async (chatId: number) => {
  try {
    const response = await axiosWithConfig.get(
      `http://zyannstore.my.id/chats/${chatId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching chat messages:", error);
    return [];
  }
};

const Chat = () => {
  const [sideMenu, setSideMenu] = useState<boolean>(false);
  const [messages, setMessages] = useState<any[] | null>([]);
  const [cookies, setCookie, removeCookie] = useCookies();

  const loginId = cookies.login_id;

  if (loginId) {
    console.log(`Login ID: ${loginId}`);
  } else {
    console.log("No login ID found in cookies");
  }

  useEffect(() => {
    const fetchData = async () => {
      const chatId = 1;
      const messages = await getChatMessages(chatId);
      setMessages(messages.data);
    };

    fetchData();
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
                    className={`w-[45%] bg-${
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
            <Input placeholder="type some text" />
            <Send />
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
