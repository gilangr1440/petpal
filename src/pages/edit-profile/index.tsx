import Layout from "@/components/layout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserTypeZod, editUserSchema } from "@/utils/apis/user/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useEffect, useState } from "react";

import { MapContainer, Marker, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";
import { useAuth } from "@/utils/contexts/auth";
import { editUser } from "@/utils/apis/user/api";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";

type coordinateType = {
  lat: number;
  lng: number;
};

const EditProfile = () => {
  const { toast } = useToast();
  const [map, setMap] = useState<any>(null);
  const [coords, setCoords] = useState<coordinateType>({ lat: 0, lng: 0 });
  const { user } = useAuth();
  const splitAddress = user.address?.split(",");
  const latitude = splitAddress && splitAddress[splitAddress.length - 2];
  const longitude = splitAddress && splitAddress[splitAddress.length - 1];
  const alamatSlice = splitAddress?.splice(0, splitAddress.length - 2).toString();
  console.log(alamatSlice);

  useEffect(() => {
    if (!map) return;

    map.addEventListener("click", (e: any) => {
      setCoords({ lat: e.latlng.lat, lng: e.latlng.lng });
    });
  }, [map]);

  const { lat, lng } = coords;

  const customIcon = new Icon({
    iconUrl: "../../../public/assets/placeholder.png",
    iconSize: [38, 38],
  });

  const form = useForm<z.infer<typeof editUserSchema>>({
    resolver: zodResolver(editUserSchema),
    defaultValues: {
      full_name: "",
      email: "",
      alamat: "",
      koordinat: "",
      number_phone: "",
    },
  });

  useEffect(() => {
    form.setValue("koordinat", `${lat.toFixed(3)}, ${lng.toFixed(3)}` as string);
    form.setValue("full_name", user.full_name as string);
    form.setValue("email", user.email as string);
    form.setValue("alamat", alamatSlice as string);
    form.setValue("number_phone", user.number_phone as string);
  }, [lat, lng, user.full_name, user.email, user.number_phone]);

  const [previewUrl, setPreviewUrl] = useState<string | null | any>(null);

  const handleImageChange = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  async function onSubmit(values: UserTypeZod) {
    console.log(values);
    try {
      const result = await editUser(values);
      toast({
        variant: "success",
        title: `${result.message}`,
      });
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Layout>
      <Toaster />
      <div className="flex items-center justify-center sm:justify-start flex-wrap gap-5 sm:gap-10 w-4/5 mx-auto my-10">
        <div className="relative">
          <Avatar className="w-40 h-40 sm:w-60 sm:h-60">
            <AvatarImage src={`${previewUrl ? previewUrl : user.profile_picture}`} className="w-full h-full object-cover" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
        <div>
          <h1 className="text-3xl font-bold">{user.full_name}</h1>
          <h1 className="font-semibold">{user.email}</h1>
        </div>
      </div>

      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="flex flex-wrap w-4/5 sm:justify-between mx-auto">
              <div className="w-full sm:w-[48%]">
                <FormItem className="mb-4">
                  <FormLabel>Profile Picture</FormLabel>
                  <FormControl>
                    <Controller
                      name="profile_picture"
                      control={form.control}
                      render={({ field }) => (
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              field.onChange(file);
                              handleImageChange(file);
                            }
                          }}
                        />
                      )}
                    />
                  </FormControl>
                  <FormMessage />
                  <p className="text-sm text-red-500">{Boolean(form.formState.errors["profile_picture"]?.message) && form.formState.errors.profile_picture?.message?.toString()}</p>
                </FormItem>
                <FormField
                  control={form.control}
                  name="full_name"
                  render={({ field }) => (
                    <FormItem className="mb-4">
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
                    <FormItem className="mb-4">
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="youremail@mail.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="w-full sm:w-[48%]">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="mb-4">
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="******" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="alamat"
                  render={({ field }) => (
                    <FormItem className="mb-4">
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Input placeholder="Your Address" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="koordinat"
                  render={({ field }) => (
                    <FormItem className="mb-7">
                      <FormLabel>Coordinate </FormLabel>
                      <Dialog>
                        <DialogTrigger className="hover:text-slate-400 text-xs">Select Coordinate</DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Select your coordinate</DialogTitle>
                            <DialogDescription>cari alamat anda di kolom pencarian lalu pilih koordinat dengan cara klik tepat pada alamat anda di peta</DialogDescription>
                          </DialogHeader>
                          <div>
                            <MapContainer center={[-6.2, 106.816]} zoom={13} style={{ height: "50vh" }} ref={setMap}>
                              <TileLayer attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                              <Marker position={[lat, lng]} icon={customIcon} />
                            </MapContainer>
                            {lat && (
                              <div>
                                <b>latitude</b>: {lat?.toFixed(3)} <br />
                                <b>longitude</b>: {lng?.toFixed(3)}
                              </div>
                            )}
                          </div>
                        </DialogContent>
                      </Dialog>
                      <div className="flex gap-3">
                        <h1>
                          <b>latitude</b>: {latitude}
                        </h1>
                        <h1>
                          <b>longitude</b>: {longitude}
                        </h1>
                      </div>
                      <FormControl>
                        <Input type="hidden" placeholder="Your Address Koordinat" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="number_phone"
                  render={({ field }) => (
                    <FormItem className="mb-4">
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input type="text" placeholder="0898369234" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="flex flex-wrap w-4/5 sm:justify-end mx-auto">
              <Button type="submit" className="rounded-md bg-[#3487AC] hover:bg-[#3487AC]/80">
                Edit Profile
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </Layout>
  );
};

export default EditProfile;
