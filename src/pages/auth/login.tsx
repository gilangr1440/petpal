import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import registerImage from "/assets/auth-image.png";
import logoImage from "/assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { adminLogin, loginSchema, userLogin } from "@/utils/apis/auth";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { useAuth } from "@/utils/contexts/auth";
import { useCookies } from "react-cookie";

const Login = () => {
  const { toast } = useToast();
  const { changeToken } = useAuth();
  const [cookies, setCookie, removeCookie] = useCookies();
  const navigate = useNavigate();
  const [role, setRole] = useState<string>("user");

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    if (role == "user") {
      try {
        const result = await userLogin(values);
        if (result.message == "Login successful! You are now logged in.") {
          changeToken(result.data.token);
          setCookie("token", result.data.token, { path: "/" });
          setCookie("login_id", result.data.id, { path: "/" });
          setCookie("role", role, { path: "/" });
          toast({
            variant: "success",
            title: "Success Login",
          });
          setTimeout(() => {
            navigate("/");
          }, 2000);
        } else if (result.message == "Invalid email or password. Please try again.") {
          toast({
            variant: "destructive",
            title: "Wrong email or password!",
          });
        }
      } catch (error: any) {
        console.log(error);
      }
    } else if (role == "admin") {
      try {
        const result = await adminLogin(values);
        if (result.message == "login successfull") {
          changeToken(result.data.token);
          setCookie("token", result.data.token, { path: "/" });
          setCookie("login_id", result.data.id, { path: "/" });
          setCookie("role", role, { path: "/" });
          toast({
            variant: "success",
            title: "Success Login",
          });
          setTimeout(() => {
            navigate("/");
          }, 2000);
        } else if (result.message == "login gagal: email atau password tidak sesuai") {
          toast({
            variant: "destructive",
            title: "Wrong email or password!",
          });
        } else if (result.message == "login failed: record not found") {
          toast({
            variant: "destructive",
            title: "User not found",
          });
        }
      } catch (error: any) {
        console.log(error);
      }
    }
  };

  function roleHandle(role: string) {
    setRole(role);
  }

  return (
    <main className="min-h-screen min-w-screen flex items-center">
      <Toaster />
      <div className="flex w-full justify-between flex-wrap">
        <div className="w-full sm:w-1/2">
          <Link to={"/"}>
            <img src={logoImage} alt="PetPal" className="w-72 mx-auto" />
          </Link>
          <div className="w-4/5 flex justify-center mx-auto">
            <Tabs defaultValue="user" className="w-full flex flex-col items-center">
              <TabsList>
                <TabsTrigger value="user" onClick={() => roleHandle("user")}>
                  User
                </TabsTrigger>
                <TabsTrigger value="admin" onClick={() => roleHandle("admin")}>
                  Admin
                </TabsTrigger>
              </TabsList>
              <TabsContent value="user">
                <h1 className="text-2xl font-semibold text-center my-5">Sign In</h1>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input id="email" placeholder="youremail@mail.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input id="password" type="password" placeholder="******" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" className="w-full rounded-full bg-gradient-to-r from-[#036DA1] via-[#64A1B7] to-[#C6D6CE] hover:from-[#036DA1]/90 hover:to-[#C6D6CE]/90">
                      Sign In
                    </Button>
                  </form>
                </Form>
              </TabsContent>
              <TabsContent value="admin">
                <h1 className="text-2xl font-semibold text-center my-5">Sign In</h1>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input id="email" placeholder="youremail@mail.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input id="password" type="password" placeholder="******" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" className="w-full rounded-full bg-gradient-to-r from-[#036DA1] via-[#64A1B7] to-[#C6D6CE] hover:from-[#036DA1]/90 hover:to-[#C6D6CE]/90">
                      Sign In
                    </Button>
                  </form>
                </Form>
              </TabsContent>
            </Tabs>
          </div>

          <div className="w-4/5 mx-auto">
            <h1 className="text-center my-5">
              Don’t have an account?{" "}
              <Link to={"/register"} className="text-[#036DA1] hover:text-[#64A1B7]">
                Sign Up
              </Link>
            </h1>
          </div>
        </div>
        <div className="w-1/2 relative hidden sm:block">
          <img src={registerImage} alt="register" className="w-[40vw] absolute hidden sm:block top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        </div>
      </div>
    </main>
  );
};

export default Login;
