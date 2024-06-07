import Layout from "@/components/layout";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const FormSchema = z.object({
  day: z.enum(["Senin", "Selasa", "Rabu", "Kamis", "Jum'at", "Sabtu", "Minggu"], {
    required_error: "You need to select the day.",
  }),
  service: z.string({
    required_error: "Please select a service.",
  }),
});

const DetailDoctor = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
  }
  return (
    <Layout>
      <div className="w-4/5 mx-auto my-10">
        <h1 className="text-2xl font-bold my-5">Clinic 1</h1>
        <div className="w-full shadow-md rounded-lg p-5 sm:p-10 flex sm:justify-center md:gap-4 lg:gap-10 flex-wrap">
          <div className="md:w-[30%] lg:w-1/5 h-64">
            <img src="https://source.unsplash.com/random?doctor" alt="doctor" className="w-full h-full object-cover rounded-md" />
          </div>
          <div className="md:w-[65%] lg:w-[75%]">
            <h1 className="text-2xl font-semibold mb-3">Drh. John Doe</h1>
            <div className="grid grid-cols-2 gap-x-3 w-full sm:w-1/2">
              <div className="border-r border-r-slate-400">
                <h1 className="text-[#777676]">Price</h1>
                <h1 className="text-[#777676]">Rp. 100.000</h1>
              </div>
              <div>
                <h1 className="text-[#777676]">Location</h1>
                <h1 className="text-[#777676]">Bandung, West Java</h1>
              </div>
            </div>
            <div className="my-10">
              <h1 className="text-2xl font-semibold">About</h1>
              <p className="text-[#777676] lg:w-4/5 text-justify">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta tempora facilis necessitatibus neque, nostrum sequi aliquid iste harum accusamus itaque perferendis autem ea optio dignissimos tenetur? Officiis aliquid dolorum
                molestias.
              </p>
            </div>
            <div>
              <h1 className="text-xl font-semibold my-5">Available days</h1>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
                  <FormField
                    control={form.control}
                    name="day"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormControl>
                          <RadioGroup id="day" onValueChange={field.onChange} defaultValue={field.value} className="flex flex-col space-y-1 mb-5">
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="Senin" />
                              </FormControl>
                              <FormLabel className="font-normal">Senin</FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="selasa" />
                              </FormControl>
                              <FormLabel className="font-normal">Selasa</FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="Rabu" />
                              </FormControl>
                              <FormLabel className="font-normal">Rabu</FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="Kamis" />
                              </FormControl>
                              <FormLabel className="font-normal">Kamis</FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="Jum'at" />
                              </FormControl>
                              <FormLabel className="font-normal">Jum'at</FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="Sabtu" />
                              </FormControl>
                              <FormLabel className="font-normal">Sabtu</FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="Minggu" />
                              </FormControl>
                              <FormLabel className="font-normal">Minggu</FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
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
                            <SelectItem value="medical-checkup">Medical Checkup</SelectItem>
                            <SelectItem value="konsultasi-online">Konsultasi Online</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full bg-blue-500">
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
