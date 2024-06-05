import Navbar from "@/components/navbar";
import SideMenuChat from "./side-menu-chat";
import RoomChat from "./room-chat";

const Chat = () => {
  return (
    <>
      <Navbar />
      <div className="h-[calc(100vh-68px)] flex items-start justify-start">
        <SideMenuChat />
        <RoomChat />
      </div>
    </>
  );
};

export default Chat;
