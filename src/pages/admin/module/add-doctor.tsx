import Layout from "@/components/layout";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { AvailableDays, DoctorFormValues, DoctorFormattedData, Services, addDoctor, doctorSchema, editDoctor, getDoctor } from "@/utils/apis/doctor";
import { useEffect, useMemo, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { useLocation, useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

const CreateArrFunction = (obj: AvailableDays[] | Services[]) => {
  const arr = [];
  for (const [key, value] of Object.entries(obj)) {
    if (value) arr.push(key);
  }

  return arr;
};

const AddDoctor = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const paramValue = queryParams.get("action");
  const [dataDokter, setDataDokter] = useState<Partial<DoctorFormattedData>>({});
  const [available, setAvailable] = useState<AvailableDays[]>([]);
  const [service, setService] = useState<Services[]>([]);

  const arrAvailable = useMemo(() => {
    return CreateArrFunction(available);
  }, [available]);
  const arrService = useMemo(() => {
    return CreateArrFunction(service);
  }, [service]);

  // console.log(arrAvailable);
  // console.log(arrService);

  // useMemo(() => {
  //   const arrAvailable: string[] = [];
  //   const arrService: string[] = [];

  //   console.log(arrAvailable);
  //   console.log(arrService);
  //   for (const [key, value] of Object.entries(available)) {
  //     if (value) arrAvailable.push(key);
  //   }
  //   for (const [key, value] of Object.entries(service)) {
  //     if (value) arrService.push(key);
  //   }
  // }, [available, service]);

  const buttonTitle = paramValue == "edit" ? "Edit" : "Add";

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
    {
      id: "online_consultations",
      label: "Online Consultations",
    },
  ] as const;

  useEffect(() => {
    if (paramValue == "edit") {
      getDataDoctor();
      hookForm.setValue("full_name", dataDokter?.full_name as string);
      hookForm.setValue("about", dataDokter?.about as string);
      hookForm.setValue("price", String(dataDokter?.price));
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
        online_consultations: values.services.includes("online_consultations") ? true : false,
      },
    };

    if (paramValue == "edit") {
      try {
        const result = await editDoctor(formattedData);
        if (result.message == "Update successful. Doctor's data has been updated.") {
          toast({
            variant: "success",
            title: `${result.message}`,
          });
          setTimeout(() => {
            navigate("/admin/edit-profile");
          }, 2000);
        }
      } catch (error) {
        toast({
          variant: "destructive",
          title: `Something went wrong`,
        });
      }
    } else {
      try {
        const result = await addDoctor(formattedData);
        console.log(result);
        if (result.message == "Unable to add doctor. Please contact our support team.") {
          toast({
            variant: "destructive",
            title: `${result.message}`,
          });
        } else if (result.message == "Doctor added successfully. Thank you.") {
          toast({
            variant: "success",
            title: `${result.message}`,
          });
          setTimeout(() => {
            navigate("/admin/edit-profile");
          }, 2000);
        }
      } catch (error) {
        toast({
          variant: "destructive",
          title: `Something went wrong`,
        });
      }
    }
  }

  const getDataDoctor = async () => {
    try {
      const result = await getDoctor();
      setDataDokter(result.data);
      setAvailable(result.data.available_days);
      setService(result.data.service);
    } catch (error) {
      toast({
        variant: "destructive",
        title: `${error}`,
      });
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
                        <Input id="full_name" placeholder="Doctor's name" {...field} disabled={hookForm.formState.isSubmitting} aria-disabled={hookForm.formState.isSubmitting} />
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
                        <Textarea id="about" placeholder="Tell us a little bit about the doctor" className="resize-none" {...field} disabled={hookForm.formState.isSubmitting} aria-disabled={hookForm.formState.isSubmitting} />
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
                        <Input id="price" type="text" placeholder="Enter price" {...field} disabled={hookForm.formState.isSubmitting} aria-disabled={hookForm.formState.isSubmitting} />
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
                <Button id="submit" type="submit" disabled={hookForm.formState.isSubmitting} aria-disabled={hookForm.formState.isSubmitting}>
                  {hookForm.formState.isSubmitting ? (
                    <p className="flex items-center justify-center gap-x-3 text-sm">
                      <Loader2 className={"animate-spin text-xl "} /> Please wait
                    </p>
                  ) : (
                    buttonTitle
                  )}
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
