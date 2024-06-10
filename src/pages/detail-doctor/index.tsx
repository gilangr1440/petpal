import Layout from "@/components/layout";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { addConsultation, detailClinic } from "@/utils/apis/list-clinics/api";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { ClinicType, ConsultationType } from "@/utils/apis/list-clinics/types";
import { AvailableDays, Services } from "@/utils/apis/doctor";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { addConsultationSchema } from "@/utils/apis/list-clinics/schema";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";

const CreateArrFunction = (obj: AvailableDays[] | Services[]) => {
  const arr = [];
  for (const [key, value] of Object.entries(obj)) {
    if (value) arr.push(key);
  }

  return arr;
};

const DetailDoctor = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { id } = useParams();
  const [detail, setDetail] = useState<Partial<ClinicType>>({});
  const [available, setAvailable] = useState<AvailableDays[]>([]);
  const [service, setService] = useState<Services[]>([]);
  const arrAvailable = useMemo(() => {
    return CreateArrFunction(available);
  }, [available]);
  const arrService = useMemo(() => {
    return CreateArrFunction(service);
  }, [service]);
  const form = useForm<ConsultationType>({
    resolver: zodResolver(addConsultationSchema),
  });

  const getDetailClinic = async (id: string) => {
    try {
      const result = await detailClinic(id);
      console.log(result);
      setDetail(result.data);
      setAvailable(result.data.open);
      setService(result.data.service);
    } catch (error) {
      throw new Error(`${error}`);
    }
  };

  useEffect(() => {
    getDetailClinic(String(id));
  }, []);

  async function onSubmit(data: ConsultationType) {
    const formatted = {
      ...data,
      scheduled_date: format(data.scheduled_date, "yyyy-MM-dd"),
    };
    const id: number = Number(detail?.id_veterinary);
    console.log(formatted);
    try {
      const result = await addConsultation(data, id);
      console.log(result);
      if (result.message == "Consultation created successfully") {
        toast({
          variant: "success",
          title: `${result.message}`,
        });
        setTimeout(() => {
          navigate("/consultation");
        }, 2000);
      }
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  return (
    <Layout>
      <Toaster />
      <div className="w-4/5 mx-auto my-10">
        <h1 className="text-2xl font-bold my-5">{detail?.clinic_name}</h1>
        <div className="w-full shadow-md rounded-lg p-5 sm:p-10 flex sm:justify-center md:gap-4 lg:gap-10 flex-wrap">
          <div className="md:w-[30%] lg:w-1/5 h-64">
            <img src={detail?.veterinary_picture} alt="doctor" className="w-full h-full object-cover rounded-md" />
          </div>
          <div className="md:w-[65%] lg:w-[75%]">
            <h1 className="text-2xl font-semibold mb-3">{detail?.veterinary}</h1>
            <div className="grid grid-cols-2 gap-x-3 w-full sm:w-1/2">
              <div className="border-r border-r-slate-400">
                <h1 className="text-[#777676]">Price</h1>
                <h1 className="text-[#777676]">Rp. {detail?.price}</h1>
              </div>
              <div>
                <h1 className="text-[#777676]">Location</h1>
                <h1 className="text-[#777676]">{detail?.location}</h1>
              </div>
            </div>
            <div className="my-10">
              <h1 className="text-2xl font-semibold">About</h1>
              <p className="text-[#777676] lg:w-4/5 text-justify">{detail?.about}</p>
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
            <div className="my-10">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
                  <FormField
                    control={form.control}
                    name="scheduled_date"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Date of consultation</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button variant={"outline"} className={cn("w-[240px] pl-3 text-left font-normal", !field.value && "text-muted-foreground")}>
                                {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="service"
                    render={({ field }) => (
                      <FormItem className="w-1/2">
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Choose service" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Medical Check-up">Medical Check-up</SelectItem>
                            <SelectItem value="Online Consultation">Online Consultation</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button onClick={} type="submit" className="w-full bg-blue-500">
                    Continue
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DetailDoctor;
