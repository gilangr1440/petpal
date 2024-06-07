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
import { Link } from "react-router-dom";
import { buttonVariants } from "@/components/ui/button";

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
    const pendingTransactions = roomChat.filter(
      (item) => item.TransactionStatus.toLowerCase() === "pending"
    );
    if (pendingTransactions.length > 0) {
      toast({
        variant: "destructive",
        title: "You have transaction should be paid",
      });
    }
  }, [roomChat]);

  const handleRoomChatClick = (id: number) => {
    setSelectedRoomChatId(id);
  };

  const paidTransaction = roomChat.filter(
    (item) => item.TransactionStatus.toLowerCase() === "paid"
  );

  const handleEmptyChat = () => {
    if (role == "user") {
      return (
        <div className="w-full h-[calc(100vh-68px)] flex flex-col items-center justify-center">
          <img src="/public/assets/data-not-dound.png" alt="" />
          <h1 className="text-xl font-semibold">You dont have conversation</h1>
          <Link
            to={"/clinic-lists"}
            className={`${buttonVariants({ variant: "default" })} mt-5`}
          >
            See Doctor
          </Link>
        </div>
      );
    } else if (role == "admin") {
      return (
        <div className="w-full h-[calc(100vh-68px)] flex flex-col items-center justify-center">
          <img src="/public/assets/data-not-dound.png" alt="" />
          <h1 className="text-xl font-semibold">You dont have conversation</h1>
        </div>
      );
    }
  };

  console.log(roomChat);

  return (
    <>
      <Navbar />
      <Toaster />
      {paidTransaction.length > 0 ? (
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
                      item[
                        role === "admin" ? "UserDetails" : "DoctorDetails"
                      ][0].profile_picture
                    }
                    className="w-full h-full object-cover rounded-full"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <h1 className="text-white">
                  {role === "admin"
                    ? item.UserDetails[0].full_name
                    : item.DoctorDetails[0].full_name}
                </h1>
              </div>
            ))}
          </div>
          {selectedRoomChatId && <RoomChat roomChatId={selectedRoomChatId} />}
        </div>
      ) : (
        handleEmptyChat()
      )}
    </>
  );
};

export default Chat;
