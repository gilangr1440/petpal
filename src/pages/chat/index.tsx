import Navbar from "@/components/navbar";
import RoomChat from "./room-chat";
import { useAtom } from "jotai";
import { sideMenuChat } from "@/utils/jotai/atom";
import { useEffect, useState } from "react";
import { getConsultations } from "@/utils/apis/clinics/api";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useCookies } from "react-cookie";
import { Toaster } from "@/components/ui/toaster";
import EmptyChat from "./empty-chat";
import { IConsultation } from "@/utils/apis/chat/interfaces";
import Loaders from "@/components/loaders";

const Chat = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [consultation, setConsultation] = useState<IConsultation[]>([]);
  const [selectedRoomChatId, setSelectedRoomChatId] = useState<number | null>(
    null
  );
  const [sideMenu] = useAtom<boolean>(sideMenuChat);
  const [cookies] = useCookies(["role"]);
  const role = cookies.role;

  const handleRoomChatClick = (id: number) => {
    setSelectedRoomChatId(id);
  };

  useEffect(() => {
    const fetchConsultations = async () => {
      try {
        const response = await getConsultations();
        setConsultation(response.data);
      } catch (error) {
        console.error("Error fetching consultations:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchConsultations();
  }, []);

  const onlineConsultation =
    consultation &&
    consultation.filter((item) => {
      return item.service.toLowerCase() === "online consultation";
    });

  const haveAConvertation = onlineConsultation && onlineConsultation.length > 0;

  if (loading || !onlineConsultation) {
    return (
      <main className="relative min-h-[400px] w-full flex items-center justify-center">
        <Loaders className="" />
      </main>
    );
  }

  if (!haveAConvertation || consultation === undefined) {
    return <EmptyChat role={role} />;
  }

  return (
    <>
      <Navbar />
      <Toaster />
      <div className="h-[calc(100vh-68px)] flex items-start justify-start">
        <div
          className={`max-w-[300px] w-full h-full ${
            sideMenu ? "flex" : "hidden"
          } bg-[#64A1B7] md:flex flex-col gap-3 items-center p-3`}
        >
          {onlineConsultation.map((item: IConsultation) => (
            <div
              key={item.id}
              className="w-full p-3 rounded-md flex items-center gap-3 bg-[#226583] hover:bg-[#226583]/70 cursor-pointer"
              onClick={() => handleRoomChatClick(item.id)}
            >
              <Avatar className="w-10 h-10">
                <AvatarImage
                  src={
                    item[role === "admin" ? "user_details" : "doctor_details"]
                      .profile_picture
                  }
                  className="w-full h-full object-cover rounded-full"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <h1 className="text-white">
                {role === "admin"
                  ? item.user_details.full_name
                  : item.doctor_details.full_name}
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
