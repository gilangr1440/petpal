import Navbar from "@/components/navbar";
import RoomChat from "./room-chat";
import { useAtom } from "jotai";
import { sideMenuChat } from "@/utils/jotai/atom";
import { useEffect, useState } from "react";
import { getConsultations } from "@/utils/apis/clinics/api";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useCookies } from "react-cookie";

interface IConsultation {
  ID: number;
  UserDetails: User[];
  DoctorDetails: Doctor[];
  Consultation: string;
  TransactionStatus: string;
  StatusConsultation: string;
  CreatedAt: string;
}

interface User {
  id: number;
  full_name: string;
  profile_picture: string;
}
interface Doctor {
  id: number;
  full_name: string;
  profile_picture: string;
}

const Chat = () => {
  const [sideMenu] = useAtom<boolean>(sideMenuChat);
  const [roomChat, setRoomChat] = useState<IConsultation[]>([]);
  const [selectedRoomChatId, setSelectedRoomChatId] = useState(null);
  const [cookies, setCookie] = useCookies(["role"]);
  const role = cookies.role;

  const getRoomChat = async () => {
    const response = await getConsultations();
    setRoomChat(response.data);
  };

  useEffect(() => {
    getRoomChat();
  }, []);

  const handleRoomChatClick = (id: any) => {
    setSelectedRoomChatId(id);
  };

  return (
    <>
      <Navbar />
      <div className="h-[calc(100vh-68px)] flex items-start justify-start">
        <div
          className={`max-w-[300px] w-full h-full ${
            sideMenu ? "flex" : "hidden"
          } bg-[#64A1B7] md:flex flex-col gap-3 items-center p-3`}
        >
          {roomChat
            .filter((item) => item.TransactionStatus.toLowerCase() === "paid")
            .map((item: any) => (
              <div
                key={item.ID}
                className="w-full p-3 rounded-md flex items-center gap-3 bg-[#226583] hover:bg-[#226583]/70 cursor-pointer"
                onClick={() => handleRoomChatClick(item.ID)}
              >
                <Avatar className="w-10 h-10">
                  <AvatarImage
                    src={
                      item[role === "admin" ? "UserDetails" : "DoctorDetails"]
                        .profile_picture
                    }
                    className="w-full h-full object-cover rounded-full"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <h1 className="text-white">
                  {role === "admin"
                    ? item.UserDetails.full_name
                    : item.DoctorDetails.full_name}
                </h1>
              </div>
            ))}
        </div>
        {selectedRoomChatId && <RoomChat roomChatId={selectedRoomChatId} />}
      </div>
    </>
  );
};

export default Chat;
