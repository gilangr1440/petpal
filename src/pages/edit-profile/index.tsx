import Layout from "@/components/layout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserFormValues, editUserSchema } from "@/utils/apis/user/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useEffect, useState } from "react";

import { MapContainer, Marker, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";
import { useAuth } from "@/utils/contexts/auth";
import { editUser } from "@/utils/apis/user/api";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { Camera, Loader2 } from "lucide-react";

type coordinateType = {
  lat: number;
  lng: number;
};

const EditProfile = () => {
  const { toast } = useToast();
  const [map, setMap] = useState<any>(null);
  const [coords, setCoords] = useState<coordinateType>({ lat: 0, lng: 0 });
  const { user } = useAuth();
  const latitude = user?.coordinate?.split(",")[0];
  const longitude = user?.coordinate?.split(",")[1];

  useEffect(() => {
    if (!map) return;

    map.addEventListener("click", (e: any) => {
      setCoords({ lat: e.latlng.lat, lng: e.latlng.lng });
    });
  }, [map]);

  const { lat, lng } = coords;
  const coor = lat != 0 && lng != 0 ? `${lat.toFixed(3)}, ${lng.toFixed(3)}` : null;

  const customIcon = new Icon({
    iconUrl: "../../../public/assets/placeholder.png",
    iconSize: [38, 38],
  });

  const form = useForm<UserFormValues>({
    resolver: zodResolver(editUserSchema),
    defaultValues: {
      full_name: "",
      email: "",
      address: "",
      coordinate: "",
      number_phone: "",
    },
  });

  useEffect(() => {
    form.setValue("coordinate", coor ? coor : (user.coordinate as string));
    form.setValue("full_name", user.full_name as string);
    form.setValue("email", user.email as string);
    form.setValue("address", user.address as string);
    form.setValue("number_phone", user.number_phone as string);
  }, [lat, lng, user.full_name, user.email, user.number_phone, user.address, user.coordinate]);

  const [previewUrl, setPreviewUrl] = useState<string | null | any>(null);

  const handleImageChange = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  async function onSubmit(values: UserFormValues) {
    try {
      const result = await editUser(values);
      toast({
        variant: "success",
        title: `${result.message}`,
      });
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
          <label htmlFor="upload">
            <div className="absolute bottom-0 right-0 bg-white hover:bg-gray-300 p-2 cursor-pointer rounded-full">
              <Camera size={40} />
            </div>
          </label>
          <p className="text-sm text-red-500">{Boolean(form.formState.errors["profile_picture"]?.message) && form.formState.errors.profile_picture?.message?.toString()}</p>
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
                <FormField
                  control={form.control}
                  name="profile_picture"
                  render={() => (
                    <FormItem className="mb-4 hidden">
                      <FormLabel>Profile Picture</FormLabel>
                      <FormControl>
                        <Controller
                          name="profile_picture"
                          control={form.control}
                          render={({ field }) => (
                            <Input
                              type="file"
                              accept="image/*"
                              id="upload"
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
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="full_name"
                  render={({ field }) => (
                    <FormItem className="mb-4">
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input id="full_name" placeholder="Your Name" {...field} />
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
                    <FormItem className="mb-4">
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input id="password" type="password" placeholder="******" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="w-full sm:w-[48%]">
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem className="mb-4">
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Input id="address" placeholder="Your Address" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="coordinate"
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
                        <Input type="text" id="coordinate" placeholder="Your Address Koordinat" className="hidden" {...field} />
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
                        <Input id="number_phone" type="text" placeholder="0898369234" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="flex flex-wrap w-4/5 sm:justify-end mx-auto">
              <Button type="submit" className="rounded-md bg-[#3487AC] hover:bg-[#3487AC]/80">
                {form.formState.isSubmitting ? (
                  <p className="flex items-center justify-center gap-x-3 text-sm">
                    <Loader2 className={"animate-spin text-xl "} /> Please wait
                  </p>
                ) : (
                  "Edit Profile"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </Layout>
  );
};

export default EditProfile;
