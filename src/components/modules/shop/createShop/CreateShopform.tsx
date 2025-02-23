"use client";
import Logo from "@/assets/svgs/Logo";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
// import { zodResolver } from "@hookform/resolvers/zod";
// import Link from "next/link";
import { FieldValues,  SubmitHandler,  useForm } from "react-hook-form";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";
import NMImageUploader from "@/components/ui/core/NMImageUploader";
import { useState } from "react";
import ImagePreviewer from "@/components/ui/core/NMImageUploader/ImagePreviewer";
import { createShop } from "@/services/Shop";

const CreateShopForm = () => {
  const [imageFiles, setImageFiles] = useState<File[] | []>([])
  const [imagePreview, setImagePreview] = useState<string[]|[]>([])
  const form = useForm({
    // resolver:zodResolver(registerSchema)
  });
  const  {formState:{isSubmitting}} = form
  const onSubmit:SubmitHandler<FieldValues> = async(data) => {
    const servicesOffered = data?.servicesOffered?.split(",").map((service: string) => service.trim()).filter((service:string) => service !== "")
    const modifiedData = {
      ...data,
       servicesOffered,
       establishedYear: Number(data?.establishedYear),

     }
    try {
      const formData = new FormData()
      formData.append("data",JSON.stringify(modifiedData))
      formData.append("logo",JSON.stringify(imageFiles[0]))
      const res = await createShop(formData)
      console.log(res)
      if(res?.success){
        toast.success(res?.message)
      }else{
        toast.error(res?.message)
      }
      
    } catch (error) {
      console.log(error)
    }

  };
  return (
    <div className="max-w-[70vw] mx-auto border-2 border-gray-400 p-8 my-16 rounded-xl">
        <div className="flex items-center gap-2 justify-center">
            <Logo/>
            <div>
                <h1 className="text-3xl font-semibold">Create Your Shop</h1>
                <p className="text-gray-400 font-semibold">Join us today and start your journey</p>
            </div>
        </div>
      <Form {...form}>
        <form className=" mt-8   space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid md:grid-cols-4 grid-cols-  gap-4 ">

            {/* Shop Name */}
        <FormField
    control={form.control}
    name="shopName"
    render={({field}) => (
        <FormItem className="col-span-2">
        <div className="flex  items-center justify-between">
        <FormLabel  >Shop Name</FormLabel>
        <FormMessage className="text-xs" />
        </div>
        <FormControl>
            <Input  {...field} value={field.value || ""}/>
        </FormControl>
      </FormItem>
    )}
    />
  {/* Business License Number  */}
        <FormField
    control={form.control}
    name="businessLicenseNumber"
    render={({field}) => (
        <FormItem className=" h-full col-span-2">
        <div className="flex items-center justify-between">
        <FormLabel  >Business License Number</FormLabel>
        <FormMessage  className="text-xs" />
        </div> 
        <FormControl>
            <Input {...field} type="text" value={field.value || ""}/>
        </FormControl>
        
      </FormItem>
    )}
    />
  {/* Address */}
        <FormField
    control={form.control}
    name="address"
    render={({field}) => (
        <FormItem className="col-span-2">
        <div className="flex items-center justify-between">
        <FormLabel  >Address</FormLabel>
        <FormMessage className="text-xs"  />
        </div>
        <FormControl>
            <Input {...field} type="text" value={field.value || ""}/>
        </FormControl>
      </FormItem>
    )}
    />
  {/* Contact Number */}
        <FormField
    control={form.control}
    name="contactNumber"
    render={({field}) => (
        <FormItem className="col-span-2">
        <div className="flex items-center justify-between">
        <FormLabel  >Contact Number</FormLabel>
        {/* {
          confirmPassword && password!== confirmPassword ? <FormMessage  className="text-xs" >Password dosen`t match</FormMessage> : ""
          } */}
        <FormMessage  className="text-xs" />
        </div>
        <FormControl>
            <Input {...field} type="text" value={field.value || ""}/>
        </FormControl>
      </FormItem>
    )}
    />
 

  {/* Website */}
        <FormField
    control={form.control}
    name="website"
    render={({field}) => (
        <FormItem className="col-span-2">
        <div className="flex items-center justify-between">
        <FormLabel  >Website</FormLabel>
        <FormMessage  className="text-xs" />
        </div>
        <FormControl>
            <Input {...field} type="text" value={field.value || ""}/>
        </FormControl>
      </FormItem>
    )}
    />


  {/* established Year */}
        <FormField
    control={form.control}
    name="establishedYear"
    render={({field}) => (
        <FormItem className="col-span-2">
        <div className="flex items-center justify-between">
        <FormLabel  >Established Year</FormLabel>
        <FormMessage  className="text-xs" />
        </div>
        <FormControl>
            <Input {...field} type="number" value={field.value || ""}/>
        </FormControl>
      </FormItem>
    )}
    />


  {/* Tax Number */}
        <FormField
    control={form.control}
    name="taxIdentificationNumber"
    render={({field}) => (
        <FormItem className="col-span-2">
        <div className="flex items-center justify-between">
        <FormLabel  >Tax Indentification numbers</FormLabel>
        <FormMessage  className="text-xs" />
        </div>
        <FormControl>
            <Input {...field} type="text" value={field.value || ""}/>
        </FormControl>
      </FormItem>
    )}
    />


  {/* Facebook*/}
        <FormField
    control={form.control}
    name="socialMediaLinks.facebook"
    render={({field}) => (
        <FormItem className="col-span-2">
        <div className="flex items-center justify-between">
        <FormLabel  >Facebook</FormLabel>
        <FormMessage  className="text-xs" />
        </div>
        <FormControl>
            <Input {...field} type="text" value={field.value || ""}/>
        </FormControl>
      </FormItem>
    )}
    />

  {/* Twitter */}
        <FormField
    control={form.control}
    name="socialMediaLinks.twitter"
    render={({field}) => (
        <FormItem className="col-span-2">
        <div className="flex items-center justify-between">
        <FormLabel  >Twitter</FormLabel>
        <FormMessage  className="text-xs" />
        </div>
        <FormControl>
            <Input {...field} type="text" value={field.value || ""}/>
        </FormControl>
      </FormItem>
    )}
    />


  {/* Instagram */}
        <FormField
    control={form.control}
    name="socialMediaLinks.instagram"
    render={({field}) => (
        <FormItem className="col-span-2">
        <div className="flex items-center justify-between">
        <FormLabel  >Instagram</FormLabel>
        <FormMessage  className="text-xs" />
        </div>
        <FormControl>
            <Input {...field} type="text" value={field.value || ""}/>
        </FormControl>
      </FormItem>
    )}
    />



  {/* Services */}
        <FormField
    control={form.control}
    name="servicesOffered"
    render={({field}) => (
        <FormItem className=" col-span-4 md:col-span-3">
        <div className="flex items-center justify-between ">
        <FormLabel  >Services Offered</FormLabel>
        <FormMessage  className="text-xs" />
        </div>
        <FormControl>
          <Textarea {...field} value={field.value || ""} className="bg-white h-[10vh]"/>
        </FormControl>
      </FormItem>
    )}
    />

    <div className="flex justify-center items-center col-span-4 md:col-span-1 min-h-28s duration-300">
      {
        imagePreview.length>0? 
        <ImagePreviewer imagePreview={imagePreview} setImageFiles={setImageFiles} setImagePreview={setImagePreview} className=" " />
        :
        <NMImageUploader lebel="Upload logo"  setImagePreview={setImagePreview} imageFiles ={imageFiles} setImageFiles={setImageFiles}/> 
      }
      
       
    </div>
    
    </div>


  <Button className="w-full" type="submit">{isSubmitting? "Creating...":"Create"}</Button>
        </form>
      </Form>
    </div>
  );
};

export default CreateShopForm;
