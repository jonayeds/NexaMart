"use client";
import Logo from "@/app/assets/svgs/Logo";
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
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { FieldValues, SubmitErrorHandler, useForm } from "react-hook-form";
import { register } from "@/services/AuthService";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";
import NMImageUploader from "@/components/ui/core/NMImageUploader";

const CreateShopForm = () => {
  const form = useForm({
    // resolver:zodResolver(registerSchema)
  });
  const  {formState:{isSubmitting}} = form
  const onSubmit:SubmitErrorHandler<FieldValues> = async(data) => {
    
    try {
      console.log(data)
      
    } catch (error) {
      console.log(error)
    }

  };
  return (
    <div className="max-w-[70vw] mx-auto border-2 border-gray-400 p-8 mt-16 rounded-xl">
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
            <Input {...field} type="number" value={field.value || ""}/>
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
            <Input {...field} type="number" value={field.value || ""}/>
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
        <FormItem className="md:col-span-3 col-span-2">
        <div className="flex items-center justify-between ">
        <FormLabel  >Services Offered</FormLabel>
        <FormMessage  className="text-xs" />
        </div>
        <FormControl>
          <Textarea className="bg-white h-[10vh]"/>
        </FormControl>
      </FormItem>
    )}
    />

    <div className="flex justify-center items-center">
      <NMImageUploader/>
    </div>
    
    </div>


  <Button className="w-full" type="submit">{isSubmitting? "Registering...":"Register"}</Button>
        </form>
      </Form>
      <div className="flex gap-2 justify-center mt-4  items-center">
        <p>Already have an account ?</p>
        <Link className="text-purple-500 text-sm underline " href={"/login"}>Login</Link>
      </div>
    </div>
  );
};

export default CreateShopForm;
