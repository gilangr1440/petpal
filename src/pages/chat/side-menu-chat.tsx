import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getConsultations } from "@/utils/apis/clinics/api";
import { sideMenuChat } from "@/utils/jotai/atom";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";

const SideMenuChat = () => {
  const [sideMenu] = useAtom<boolean>(sideMenuChat);

  const [roomChat, setRoomChat] = useState([]);

  const getRoomChat = async () => {
    const response = await getConsultations();
    setRoomChat(response.data);
  };

  useEffect(() => {
    getRoomChat();
  }, []);
  return (
    <div
      className={`max-w-[300px] w-full h-full ${
        sideMenu ? "flex" : "hidden"
      } bg-[#64A1B7] md:flex flex-col gap-3 items-center p-3`}
    >
      {roomChat.map((item: any) => (
        <div
          key={item.ID}
          className="w-full p-3 rounded-md flex items-center gap-3 bg-[#226583] hover:bg-[#226583]/70 cursor-pointer"
        >
          <Avatar className="w-10 h-10">
            <AvatarImage
              src={item.DoctorDetails.profile_picture}
              className="w-full h-full object-cover rounded-full"
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <h1 className="text-white">{item.DoctorDetails.full_name}</h1>
        </div>
      ))}
    </div>
  );
};

export default SideMenuChat;
