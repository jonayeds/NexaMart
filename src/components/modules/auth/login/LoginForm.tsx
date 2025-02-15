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

import { login } from "@/services/AuthService";
import { toast } from "sonner";
import { loginSchema } from "./loginValidation";

const LoginForm = () => {
  const form = useForm({
    resolver:zodResolver(loginSchema)
  });
  const password = form.watch("password")
  const email = form.watch("email")
  const  {formState:{isSubmitting}} = form
  const onSubmit:SubmitErrorHandler<FieldValues> = async(data) => {
    const {email, password} = data
    try {
      const res = await login({email, name, password})
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
                <h1 className="text-3xl font-semibold">Login</h1>
                <p className="text-gray-400 font-semibold">Welcome back</p>
            </div>
        </div>
      <Form {...form}>
        <form className="space-y-4 mt-8 " onSubmit={form.handleSubmit(onSubmit)}>
        
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
  
  <Button disabled={ !(email && password) } className="w-full" type="submit">{isSubmitting? "Logging In...":"Login"}</Button>
        </form>
      </Form>
      <div className="flex gap-2 justify-center mt-4  items-center">
        <p>Don`t` have an account ?</p>
        <Link className="text-purple-500 text-sm underline " href={"/register"}>Register</Link>
      </div>
    </div>
  );
};

export default LoginForm;
