import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getConsultations } from "@/utils/apis/clinics/api";
import { sideMenuChat } from "@/utils/jotai/atom";
import { useAtom } from "jotai";
import { Menu } from "lucide-react";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

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

const HeaderChat = ({ roomChatId }: { roomChatId: number }) => {
  const [sideMenu, setSideMenu] = useAtom(sideMenuChat);
  const [roomChat, setRoomChat] = useState<IConsultation | null>(null);
  const [cookies] = useCookies();
  const role = cookies.role;

  useEffect(() => {
    const getRoomChat = async () => {
      const response = await getConsultations();
      const currentRoomChat = response.data.find(
        (item: any) => item.ID === roomChatId
      );
      setRoomChat(currentRoomChat);
    };
    getRoomChat();
  }, [roomChatId]);

  const handleSideMenu = () => {
    setSideMenu(!sideMenu);
  };
  console.log(sideMenu);

  if (!roomChat) return null;

  return (
    <div className="sticky top-0 w-full h-16 bg-[#D9D9D9] flex items-center justify-between gap-3 p-3">
      <div onClick={handleSideMenu} className="p-5 md:hidden cursor-pointer">
        <Menu />
      </div>
      <div className="flex items-center justify-center flex-row gap-x-2">
        <Avatar className="w-10 h-10">
          <AvatarImage
            src={
              roomChat[role === "admin" ? "UserDetails" : "DoctorDetails"]
                .profile_picture
            }
            className="w-full h-full object-cover rounded-full"
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <h1 className="">
          {
            roomChat[role === "admin" ? "UserDetails" : "DoctorDetails"]
              .full_name
          }
        </h1>
      </div>
    </div>
  );
};

export default HeaderChat;
