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
import { FieldValues,  SubmitHandler, useForm } from "react-hook-form";
import { registerSchema } from "./registerValidation";
import { register } from "@/services/AuthService";
import { toast } from "sonner";

const RegisterForm = () => {
  const form = useForm({
    resolver:zodResolver(registerSchema)
  });
  const password = form.watch("password")
  const confirmPassword = form.watch("confirmPassword")
  const  {formState:{isSubmitting}} = form
  const onSubmit:SubmitHandler<FieldValues> = async(data) => {
    const {email, name, password} = data
    try {
      const res = await register({email, name, password})
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
    <div className="max-w-[40vw] mx-auto border-2 border-gray-400 p-8 rounded-xl">
        <div className="flex items-center gap-2 justify-center">
            <Logo/>
            <div>
                <h1 className="text-3xl font-semibold">Register</h1>
                <p className="text-gray-400 font-semibold">Join us today and start your journey</p>
            </div>
        </div>
      <Form {...form}>
        <form className="space-y-4 mt-8 " onSubmit={form.handleSubmit(onSubmit)}>
            {/* Name */}
        <FormField
    control={form.control}
    name="name"
    render={({field}) => (
      <FormItem>
        <div className="flex items-center justify-between">
        <FormLabel  >Name</FormLabel>
        <FormMessage className="text-xs" />
        </div>
        <FormControl>
            <Input  {...field} value={field.value || ""}/>
        </FormControl>
      </FormItem>
    )}
  />
  {/* Email */}
        <FormField
    control={form.control}
    name="email"
    render={({field}) => (
      <FormItem>
        <div className="flex items-center justify-between">
        <FormLabel  >Email</FormLabel>
        <FormMessage  className="text-xs" />
        </div> 
        <FormControl>
            <Input {...field} type="text" value={field.value || ""}/>
        </FormControl>
        
      </FormItem>
    )}
  />
  {/* Password */}
        <FormField
    control={form.control}
    name="password"
    render={({field}) => (
      <FormItem>
        <div className="flex items-center justify-between">
        <FormLabel  >Password</FormLabel>
        <FormMessage className="text-xs"  />
        </div>
        <FormControl>
            <Input {...field} type="password" value={field.value || ""}/>
        </FormControl>
      </FormItem>
    )}
  />
  {/* Confirm Password */}
        <FormField
    control={form.control}
    name="confirmPassword"
    render={({field}) => (
      <FormItem>
        <div className="flex items-center justify-between">
        <FormLabel  >Confirm Password</FormLabel>
        {
          confirmPassword && password!== confirmPassword ? <FormMessage  className="text-xs" >Password dosen`t match</FormMessage> : ""
        }
        {/* <FormMessage  className="text-xs" /> */}
        </div>
        <FormControl>
            <Input {...field} type="password" value={field.value || ""}/>
        </FormControl>
      </FormItem>
    )}
  />
  <Button disabled={(password!== confirmPassword) || !password  } className="w-full" type="submit">{isSubmitting? "Registering...":"Register"}</Button>
        </form>
      </Form>
      <div className="flex gap-2 justify-center mt-4  items-center">
        <p>Already have an account ?</p>
        <Link className="text-purple-500 text-sm underline " href={"/login"}>Login</Link>
      </div>
    </div>
  );
};

export default RegisterForm;
