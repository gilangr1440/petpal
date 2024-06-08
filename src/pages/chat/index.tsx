import Navbar from "@/components/navbar";
import RoomChat from "./room-chat";
import { useAtom } from "jotai";
import { sideMenuChat } from "@/utils/jotai/atom";
import { useEffect, useState } from "react";
import { getConsultations } from "@/utils/apis/clinics/api";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useCookies } from "react-cookie";
import { toast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import EmptyChat from "./empty-chat";

interface IConsultation {
  ID: number;
  UserDetails: User;
  DoctorDetails: Doctor;
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
  const [selectedRoomChatId, setSelectedRoomChatId] = useState<number | null>(
    null
  );
  const [cookies] = useCookies(["role"]);
  const role = cookies.role;

  const getRoomChat = async () => {
    const response = await getConsultations();
    setRoomChat(response.data);
  };

  useEffect(() => {
    getRoomChat();
  }, []);

  useEffect(() => {
    if (roomChat) {
      const pendingTransactions = roomChat.filter(
        (item) => item.TransactionStatus.toLowerCase() === "pending"
      );
      if (pendingTransactions.length > 0) {
        toast({
          variant: "destructive",
          title: "You have transaction should be paid",
        });
      }
    }
  }, [roomChat]);

  const handleRoomChatClick = (id: number) => {
    setSelectedRoomChatId(id);
  };

  const paidTransaction =
    roomChat &&
    roomChat.filter((item) => item.TransactionStatus.toLowerCase() === "paid");

  const haveAConvertation = paidTransaction && paidTransaction.length > 0;

  return (
    <>
      <Navbar />
      <Toaster />
      {haveAConvertation ? (
        <div className="h-[calc(100vh-68px)] flex items-start justify-start">
          <div
            className={`max-w-[300px] w-full h-full ${
              sideMenu ? "flex" : "hidden"
            } bg-[#64A1B7] md:flex flex-col gap-3 items-center p-3`}
          >
            {paidTransaction.map((item: IConsultation) => (
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
      ) : (
        <EmptyChat role={role} />
      )}
    </>
  );
};

export default Chat;
