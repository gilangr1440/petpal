import Layout from "@/components/layout";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { AvailableDays, DoctorFormValues, DoctorFormattedData, Services, addDoctor, doctorSchema, getDoctor } from "@/utils/apis/doctor";
import { useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { useLocation, useNavigate } from "react-router-dom";

const AddDoctor = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const paramValue = queryParams.get("action");
  const [dataDokter, setDataDokter] = useState<Partial<DoctorFormattedData>>({});
  const [available, setAvailable] = useState<AvailableDays[]>([]);
  const [service, setService] = useState<Services[]>([]);
  const arrAvailable: string[] = [];
  const arrService: string[] = [];

  for (const [key, value] of Object.entries(available)) {
    if (value) arrAvailable.push(key);
  }
  for (const [key, value] of Object.entries(service)) {
    if (value) arrService.push(key);
  }

  const form = useForm<DoctorFormValues>({
    resolver: zodResolver(doctorSchema),
    defaultValues: {
      full_name: "",
      about: "",
      price: "",
      available_days: [],
      services: [],
    },
  });

  const editForm = useForm<DoctorFormValues>({
    resolver: zodResolver(doctorSchema),
    defaultValues: {
      full_name: "",
      about: "",
      price: "",
      available_days: [],
      services: [],
    },
  });

  const hookForm = paramValue == "edit" ? editForm : form;

  const days = [
    {
      id: "monday",
      label: "Monday",
    },
    {
      id: "tuesday",
      label: "Tuesday",
    },
    {
      id: "wednesday",
      label: "Wednesday",
    },
    {
      id: "thursday",
      label: "Thursday",
    },
    {
      id: "friday",
      label: "Friday",
    },
  ] as const;

  const services = [
    {
      id: "vaccinations",
      label: "Vaccinations",
    },
    {
      id: "operations",
      label: "Operations",
    },
    {
      id: "mcu",
      label: "Medical Check-up",
    },
  ] as const;

  useEffect(() => {
    if (paramValue == "edit") {
      getDataDoctor();
      hookForm.setValue("full_name", dataDokter.full_name as string);
      hookForm.setValue("about", dataDokter.about as string);
      hookForm.setValue("price", dataDokter.price as string);
      hookForm.setValue("available_days", arrAvailable);
      hookForm.setValue("services", arrService);
    }
  }, [dataDokter?.full_name, dataDokter?.about, dataDokter?.price]);

  const [previewUrl, setPreviewUrl] = useState<string | null | any>(null);

  const handleImageChange = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  async function onSubmit(values: DoctorFormValues) {
    console.log(values);
    const formattedData = {
      ...values,
      price: parseFloat(values.price as string),
      available_days: {
        monday: values.available_days.includes("monday") ? true : false,
        tuesday: values.available_days.includes("tuesday") ? true : false,
        wednesday: values.available_days.includes("wednesday") ? true : false,
        thursday: values.available_days.includes("thursday") ? true : false,
        friday: values.available_days.includes("friday") ? true : false,
      },
      services: {
        vaccinations: values.services.includes("vaccinations") ? true : false,
        operations: values.services.includes("operations") ? true : false,
        mcu: values.services.includes("mcu") ? true : false,
      },
    };

    console.log(formattedData);

    try {
      const result = await addDoctor(formattedData);
      console.log(result);
      toast({
        variant: "success",
        title: `Success add doctor`,
      });
      setTimeout(() => {
        navigate("/admin/edit-profile");
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  }

  const getDataDoctor = async () => {
    try {
      const result = await getDoctor();
      setDataDokter(result.data);
      setAvailable(result.data.available_days);
      setService(result.data.service);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <Toaster />
      <div className="w-4/5 mx-auto my-5">
        <h1 className="text-2xl font-semibold">Add Doctor</h1>
        <div className="flex gap-5 w-full p-5 shadow-lg rounded-lg my-5">
          <div className="w-48 h-60 rounded-md shadow-lg">
            <img src={`${previewUrl ? previewUrl : dataDokter?.profile_picture ? dataDokter?.profile_picture : "/assets/placeholder-image.png"}`} className="w-full h-full object-cover rounded-md" />
            <label htmlFor="upload">
              <div className="w-full p-1 rounded-md bg-slate-300 hover:bg-slate-200 text-center cursor-pointer my-3">Choose Picture</div>
            </label>
          </div>
          <div className="flex-grow">
            <Form {...hookForm}>
              <form onSubmit={hookForm.handleSubmit(onSubmit)} className="space-y-8 w-3/4">
                <FormField
                  control={hookForm.control}
                  name="profile_picture"
                  render={() => (
                    <FormItem className="mb-4 hidden">
                      <FormLabel>Doctor Picture</FormLabel>
                      <FormControl>
                        <Controller
                          name="profile_picture"
                          control={hookForm.control}
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
                  control={hookForm.control}
                  name="full_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input id="full_name" placeholder="Doctor's name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={hookForm.control}
                  name="about"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>About</FormLabel>
                      <FormControl>
                        <Textarea id="about" placeholder="Tell us a little bit about the doctor" className="resize-none" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={hookForm.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price</FormLabel>
                      <FormControl>
                        <Input id="price" type="text" placeholder="Enter price" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={hookForm.control}
                  name="available_days"
                  render={() => (
                    <FormItem>
                      <div className="mb-4">
                        <FormLabel className="text-base">Available Days</FormLabel>
                      </div>
                      {days.map((item) => (
                        <FormField
                          key={item.id}
                          control={hookForm.control}
                          name="available_days"
                          render={({ field }) => {
                            return (
                              <FormItem key={item.id} className="flex flex-row items-start space-x-3 space-y-0">
                                <FormControl>
                                  <Checkbox
                                    id="available_days"
                                    checked={field.value?.includes(item.id)}
                                    onCheckedChange={(checked) => {
                                      return checked ? field.onChange([...field.value, item.id]) : field.onChange(field.value?.filter((value) => value !== item.id));
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="font-normal">{item.label}</FormLabel>
                              </FormItem>
                            );
                          }}
                        />
                      ))}
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={hookForm.control}
                  name="services"
                  render={() => (
                    <FormItem>
                      <div className="mb-4">
                        <FormLabel className="text-base">Services</FormLabel>
                      </div>
                      {services.map((item) => (
                        <FormField
                          key={item.id}
                          control={hookForm.control}
                          name="services"
                          render={({ field }) => {
                            return (
                              <FormItem key={item.id} className="flex flex-row items-start space-x-3 space-y-0">
                                <FormControl>
                                  <Checkbox
                                    id="services"
                                    checked={field.value?.includes(item.id)}
                                    onCheckedChange={(checked) => {
                                      return checked ? field.onChange([...field.value, item.id]) : field.onChange(field.value?.filter((value) => value !== item.id));
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="font-normal">{item.label}</FormLabel>
                              </FormItem>
                            );
                          }}
                        />
                      ))}
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button id="submit" type="submit">
                  {paramValue == "edit" ? "Edit Doctor" : "Add Doctor"}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AddDoctor;
