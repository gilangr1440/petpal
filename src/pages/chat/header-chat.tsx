import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { sideMenuChat } from "@/utils/jotai/atom";
import { useAtom } from "jotai";
import { Menu } from "lucide-react";

const HeaderChat = () => {
  const [sideMenu, setSideMenu] = useAtom(sideMenuChat);

  return (
    <div className="sticky top-0 w-full h-16 bg-[#D9D9D9] flex items-center gap-3 p-3">
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
  );
};

export default HeaderChat;
