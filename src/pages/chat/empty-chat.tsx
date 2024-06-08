import { buttonVariants } from "@/components/ui/button";
import { Link } from "react-router-dom";

const EmptyChat = ({ role }: { role: string }) => {
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

export default EmptyChat;
