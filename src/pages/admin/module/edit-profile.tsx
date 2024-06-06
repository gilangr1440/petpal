import Layout from "@/components/layout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import { AdminFormValues, editAdmin, editAdminSchema } from "@/utils/apis/admin";
import { Camera } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { AvailableDays, DoctorFormattedData, Services, getDoctor } from "@/utils/apis/doctor";

type coordinateType = {
  lat: number;
  lng: number;
};

const EditProfileAdmin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [dataDokter, setDataDokter] = useState<Partial<DoctorFormattedData>>({});
  const [available, setAvailable] = useState<AvailableDays[]>([]);
  const [services, setServices] = useState<Services[]>([]);
  const [map, setMap] = useState<any>(null);
  const [coords, setCoords] = useState<coordinateType>({ lat: 0, lng: 0 });
  const { admin } = useAuth();
  const latitude = admin?.coordinate?.split(",")[0];
  const longitude = admin?.coordinate?.split(",")[1];
  const arrAvailable = [];
  const arrService = [];

  for (const [key, value] of Object.entries(available)) {
    if (value) arrAvailable.push(key);
  }
  for (const [key, value] of Object.entries(services)) {
    if (value) arrService.push(key);
  }

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

  const form = useForm<AdminFormValues>({
    resolver: zodResolver(editAdminSchema),
    defaultValues: {
      full_name: "",
      email: "",
      address: "",
      coordinate: "",
      number_phone: "",
    },
  });

  useEffect(() => {
    form.setValue("coordinate", coor ? coor : (admin.coordinate as string));
    form.setValue("full_name", admin.full_name as string);
    form.setValue("email", admin.email as string);
    form.setValue("address", admin.address as string);
    form.setValue("number_phone", admin.number_phone as string);
  }, [lat, lng, admin.full_name, admin.email, admin.number_phone, admin.coordinate, admin.address]);

  const [previewUrl, setPreviewUrl] = useState<string | null | any>(null);

  const handleImageChange = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  async function onSubmit(values: AdminFormValues) {
    try {
      const result = await editAdmin(values);
      toast({
        variant: "success",
        title: `${result.message}`,
      });
    } catch (error) {
      console.log(error);
    }
  }

  const getDataDoctor = async () => {
    try {
      const result = await getDoctor();
      console.log(result);
      setDataDokter(result.data);
      setAvailable(result.data.available_days);
      setServices(result.data.service);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDataDoctor();
  }, []);

  return (
    <Layout>
      <Toaster />
      <div className="flex items-center justify-center sm:justify-start flex-wrap gap-5 sm:gap-10 w-4/5 mx-auto my-10">
        <div className="relative">
          <Avatar className="w-40 h-40 sm:w-60 sm:h-60">
            <AvatarImage src={`${previewUrl ? previewUrl : admin.profile_picture}`} className="w-full h-full object-cover" />
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
          <h1 className="text-3xl font-bold">{admin?.full_name}</h1>
          <h1 className="font-semibold">{admin?.email}</h1>
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
              </div>
              <div className="w-full sm:w-[48%]">
                <FormField
                  control={form.control}
                  name="address"
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
                  name="coordinate"
                  render={({ field }) => (
                    <FormItem className="mb-7">
                      <FormLabel>Koordinat </FormLabel>
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
                        <Input type="text" placeholder="Your Address Koordinat" className="hidden" {...field} />
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
            <div className="flex gap-3 w-4/5 justify-end mx-auto">
              <Button type="button" onClick={() => navigate("/admin/add-doctor")} className="rounded-md bg-[#3487AC] hover:bg-[#3487AC]/80">
                Add New Doctor
              </Button>
              <Button type="submit" className="rounded-md bg-[#3487AC] hover:bg-[#3487AC]/80">
                Edit Profile
              </Button>
            </div>
          </form>
        </Form>
      </div>

      <div className="w-4/5 mx-auto my-5 shadow-md rounded-lg p-5 sm:p-10 flex sm:justify-center md:gap-4 lg:gap-10 flex-wrap">
        <div className="md:w-[30%] lg:w-1/5 h-64">
          <img src="https://source.unsplash.com/random?doctor" alt="doctor" className="w-full h-full object-cover rounded-md" />
        </div>
        <div className="md:w-[65%] lg:w-[75%]">
          <h1 className="text-2xl font-semibold mb-3">{dataDokter?.full_name}</h1>
          <div className="grid grid-cols-2 gap-x-3 w-full sm:w-1/2">
            <div className="border-r border-r-slate-400">
              <h1 className="text-[#777676]">Price</h1>
              <h1 className="text-[#777676]">Rp. {dataDokter?.price}</h1>
            </div>
            <div>
              <h1 className="text-[#777676]">Location</h1>
              <h1 className="text-[#777676]">{admin.address}</h1>
            </div>
          </div>
          <div className="my-10">
            <h1 className="text-2xl font-semibold">About</h1>
            <p className="text-[#777676] lg:w-4/5 text-justify">{dataDokter?.about}</p>
          </div>
          <div>
            <h1 className="text-xl font-semibold my-5">Available days</h1>
            <ul className="flex gap-2">
              {arrAvailable.map((value: string, index: number) => {
                return <li key={index}>{value[0].toUpperCase() + value.slice(1)}</li>;
              })}
            </ul>
          </div>
          <div>
            <h1 className="text-xl font-semibold my-5">Service</h1>
            <ul>
              {arrService.map((value: string, index: number) => {
                return <li key={index}>{value[0].toUpperCase() + value.slice(1)}</li>;
              })}
            </ul>
          </div>
          <div className="flex gap-3 justify-end">
            <Button type="submit" className="rounded-md bg-[#3487AC] hover:bg-[#3487AC]/80">
              Edit Doctor
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default EditProfileAdmin;
