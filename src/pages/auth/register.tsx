import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import registerImage from "/assets/auth-image.png";
import logoImage from "/assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { registerSchema } from "@/utils/apis/auth";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { adminRegister, userRegister } from "@/utils/apis/auth";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";

const Register = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [role, setRole] = useState<string>("user");

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      full_name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof registerSchema>) => {
    console.log(values);
    if (role == "user") {
      try {
        const result = await userRegister(values);
        if (result.message == "success add data") {
          toast({
            variant: "success",
            title: "Success Registered",
          });
          setTimeout(() => {
            navigate("/");
          }, 2000);
        } else if (result.message == "error add data") {
          if (result.data.Message.includes("Duplicate entry")) {
            toast({
              variant: "destructive",
              title: "Email has been registered",
            });
          }
        }
      } catch (error: any) {
        console.log(error);
      }
    } else if (role == "admin") {
      try {
        const result = await adminRegister(values);
        if (result.message == "Registrasi berhasil") {
          toast({
            variant: "success",
            title: "Success Registered",
          });
          setTimeout(() => {
            navigate("/");
          }, 2000);
        } else if (result.message.includes("Duplicate entry")) {
          toast({
            variant: "destructive",
            title: "Email has been registered",
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
    <main className="min-h-screen min-w-screen flex items-center py-10">
      <Toaster />
      <div className="flex w-full justify-between flex-wrap">
        <div className="w-full sm:w-1/2">
          <img src={logoImage} alt="PetPal" className="w-72 mx-auto" />
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
                <h1 className="text-2xl font-semibold text-center my-5">Sign Up</h1>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                      control={form.control}
                      name="full_name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Your Name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="youremail@mail.com" {...field} />
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
                            <Input type="password" placeholder="******" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" className="w-full rounded-full bg-gradient-to-r from-[#036DA1] via-[#64A1B7] to-[#C6D6CE] hover:from-[#036DA1]/90 hover:to-[#C6D6CE]/90">
                      Sign Up
                    </Button>
                  </form>
                </Form>
              </TabsContent>
              <TabsContent value="admin">
                <h1 className="text-2xl font-semibold text-center my-5">Sign Up</h1>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                      control={form.control}
                      name="full_name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Your Name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="youremail@mail.com" {...field} />
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
                            <Input type="password" placeholder="******" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" className="w-full rounded-full bg-gradient-to-r from-[#036DA1] via-[#64A1B7] to-[#C6D6CE] hover:from-[#036DA1]/90 hover:to-[#C6D6CE]/90">
                      Sign Up
                    </Button>
                  </form>
                </Form>
              </TabsContent>
            </Tabs>
          </div>

          <div className="w-4/5 mx-auto">
            <h1 className="text-center my-5">
              Already have an account?{" "}
              <Link to={"/login"} className="text-[#036DA1] hover:text-[#64A1B7]">
                Sign In
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

export default Register;
