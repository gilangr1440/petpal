import { Link, NavLink, useNavigate } from "react-router-dom";
import { Input } from "./ui/input";
import { Search } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useCookies } from "react-cookie";
import { useToast } from "./ui/use-toast";
import { Toaster } from "./ui/toaster";
import { useAuth } from "@/utils/contexts/auth";

const Navbar = () => {
  const { user, admin } = useAuth();
  const [cookies, setCookie, removeCookie] = useCookies<any>(["token", "role"]);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = () => {
    removeCookie("token", { path: "/" });
    removeCookie("role", { path: "/" });
    toast({
      variant: "success",
      title: "Success logout",
    });
    setTimeout(() => {
      navigate("login");
    }, 2000);
  };

  return (
    <header className="w-full shadow py-1 bg-[#BBD0CB] sticky top-0 z-20">
      <Toaster />
      <div className="flex items-center justify-between mx-5 sm:mx-20">
        <Link to={"/"}>
          <img src="/assets/logo.png" alt="logo-web" width={60} />
        </Link>
        <div className="hidden sm:flex items-center rounded-md px-2 bg-white">
          <Search />
          <Input type="text" placeholder="Search Product" className="border-0 w-80 focus-visible:ring-0 focus-visible:ring-offset-0" />
        </div>

        {cookies.role == "user" ? (
          <DropdownMenu>
            <DropdownMenuTrigger className="outline-none">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Hi, {user.full_name}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Home</DropdownMenuItem>
              <DropdownMenuItem>Clinic</DropdownMenuItem>
              <DropdownMenuItem>History</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Edit Profile</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-500" onClick={handleLogout}>
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : cookies.role == "admin" ? (
          <DropdownMenu>
            <DropdownMenuTrigger className="outline-none">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Hi, {admin.fullName}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Home</DropdownMenuItem>
              <DropdownMenuItem>Clinic</DropdownMenuItem>
              <DropdownMenuItem>History</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Edit Profile</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-500" onClick={handleLogout}>
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <NavLink to={"/register"} className="p-2 rounded-md bg-[#036da1] hover:bg-[#036da1]/70 text-white">
            Register
          </NavLink>
        )}
      </div>
    </header>
  );
};

export default Navbar;
