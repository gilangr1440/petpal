import React, { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout";

import { IProductDetail, ProductFormProps, ProductFormValues } from "@/utils/apis/products/interfaces";

import { productSchema } from "@/utils/apis/products/scheme";
import { useLocation, useNavigate } from "react-router-dom";
import { addProduct, editProduct, getProductDetail } from "@/utils/apis/products";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { Loader2 } from "lucide-react";

const AddEditProducts: React.FC<ProductFormProps> = ({ defaultValues }) => {
  const { toast } = useToast();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const paramValue = queryParams.get("action");
  const idProduct = queryParams.get("id");
  const navigate = useNavigate();

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [detail, setDetail] = useState<Partial<IProductDetail>>({});
  const buttonTitle = paramValue == "edit" ? "Edit" : "Add";

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues,
  });
  const editForm = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      product_name: "",
      price: "",
      stock: "",
      description: "",
    },
  });

  const hookForm = paramValue == "edit" ? editForm : form;

  const getDetail = async (id: number) => {
    try {
      const result = await getProductDetail(id);
      setDetail(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (paramValue == "edit") {
      getDetail(Number(idProduct));
      hookForm.setValue("product_name", String(detail?.product_name));
      hookForm.setValue("price", String(detail?.price));
      hookForm.setValue("stock", String(detail?.stock));
      hookForm.setValue("description", String(detail?.description));
    }
  }, [detail?.product_name, detail?.price, detail?.stock, detail?.description]);

  const onSubmit = async (data: ProductFormValues) => {
    const formattedData = {
      ...data,
      price: parseFloat(data.price as string),
      stock: parseInt(data.stock as string, 10),
    };
    // console.log(formattedData); // Lakukan sesuatu dengan data produk di sini

    if (paramValue == "add") {
      try {
        const result = await addProduct(formattedData);
        toast({
          variant: "success",
          title: `${result.message}`,
        });
        setTimeout(() => {
          navigate("/admin");
        }, 2000);
        console.log(result);
      } catch (error) {
        console.log(error);
      }
    } else if (paramValue == "edit") {
      try {
        const result = await editProduct(formattedData, Number(idProduct));
        toast({
          variant: "success",
          title: `${result.message}`,
        });
        setTimeout(() => {
          navigate("/admin");
        }, 2000);
        console.log(result);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleImageChange = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setSelectedImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  return (
    <Layout>
      <Toaster />
      <div className="min-w-[300px] max-w-[912px] mx-auto h-full pt-20">
        <Form {...hookForm}>
          <form onSubmit={hookForm.handleSubmit(onSubmit)} className="flex items-center justify-start flex-col lg:flex-row rounded-lg p-2 gap-y-8 lg:gap-y-0 gap-x-8 border-2">
            <FormField
              control={hookForm.control}
              name="product_picture"
              render={() => (
                <div className="min-w-[300px] h-full flex items-start justify-center flex-col gap-y-4">
                  <figure className="w-[300px] h-[300px]">
                    <img src={selectedImage ? selectedImage : paramValue == "edit" ? detail.product_picture : "/public/assets/300x300.png"} alt="Product" className="rounded-lg w-full h-full object-cover" />
                  </figure>
                  <FormItem>
                    <FormControl>
                      <Controller
                        name="product_picture"
                        control={hookForm.control}
                        render={({ field }) => (
                          <Input
                            type="file"
                            id="product_picture"
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
                  </FormItem>
                </div>
              )}
            />
            <div className="w-full flex justify-start flex-col gap-y-2">
              <FormField
                control={hookForm.control}
                name="product_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Name</FormLabel>
                    <FormControl>
                      <Input id="product_name" placeholder="Enter product name" {...field} disabled={hookForm.formState.isSubmitting} aria-disabled={hookForm.formState.isSubmitting} />
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
                name="stock"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Stock</FormLabel>
                    <FormControl>
                      <Input id="stock" type="text" placeholder="Enter stock" {...field} disabled={hookForm.formState.isSubmitting} aria-disabled={hookForm.formState.isSubmitting} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={hookForm.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input id="description" type="textarea" placeholder="Enter description" {...field} disabled={hookForm.formState.isSubmitting} aria-disabled={hookForm.formState.isSubmitting} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex items-center justify-start gap-x-4">
                <Button type="submit" id="submit" className="mt-4" disabled={hookForm.formState.isSubmitting} aria-disabled={hookForm.formState.isSubmitting}>
                  {hookForm.formState.isSubmitting ? (
                    <p className="flex items-center justify-center gap-x-3 text-sm">
                      <Loader2 className={"animate-spin text-xl "} /> Please wait
                    </p>
                  ) : (
                    buttonTitle
                  )}
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </Layout>
  );
};

export default AddEditProducts;
