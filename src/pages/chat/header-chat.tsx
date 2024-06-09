import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { IConsultation } from "@/utils/apis/chat/interfaces";
import { getConsultations } from "@/utils/apis/clinics/api";
import { sideMenuChat } from "@/utils/jotai/atom";
import { useAtom } from "jotai";
import { Menu } from "lucide-react";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

const HeaderChat = ({ roomChatId }: { roomChatId: number }) => {
  const [sideMenu, setSideMenu] = useAtom(sideMenuChat);
  const [roomChat, setRoomChat] = useState<IConsultation | null>(null);
  const [cookies] = useCookies();
  const role = cookies.role;

  useEffect(() => {
    const getRoomChat = async () => {
      const response = await getConsultations();
      const currentRoomChat = response.data.find(
        (item: IConsultation) => item.id === roomChatId
      );
      setRoomChat(currentRoomChat);
    };
    getRoomChat();
  }, [roomChatId]);

  if (!roomChat) return null;

  return (
    <div className="sticky top-0 w-full h-16 bg-[#D9D9D9] flex items-center justify-between gap-3 p-3">
      <div className="p-5 md:hidden cursor-pointer">
        <Menu />
      </div>
      <div className="flex items-center justify-center flex-row gap-x-2">
        <Avatar className="w-10 h-10">
          <AvatarImage
            src={
              roomChat[role === "admin" ? "user_details" : "doctor_details"]
                .profile_picture
            }
            className="w-full h-full object-cover rounded-full"
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <h1 className="">
          {
            roomChat[role === "admin" ? "user_details" : "doctor_details"]
              .full_name
          }
        </h1>
      </div>
    </div>
  );
};

export default HeaderChat;
