"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import { toast } from "sonner"


const CreateCategorymodal = () => {
    const form = useForm();
      const password = form.watch("password")
      const email = form.watch("email")
      const searchParams = useSearchParams()
      const redirect = searchParams.get('redirectPath')
      const router = useRouter()
    
      const  {formState:{isSubmitting}} = form
    
    
      const onSubmit:SubmitHandler<FieldValues> = async(data) => {
        console.log(data)
        // try {
        //   const res = await 
        //   if(res?.success){
        //     toast.success(res?.message)
        //     if(redirect){
        //       router.push(redirect)
        //     }else{
        //       router.push("/profile")
        //     }
        //   }else{
        //     toast.error(res?.message)
        //   }
        // } catch (error) {
        //   console.log(error)
        // }
    
      };
  return (
    <Dialog>
    <DialogTrigger asChild>
      <Button >Create Category</Button>
    </DialogTrigger>
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Create Product Category</DialogTitle>
      </DialogHeader>
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

  <Button disabled={ !(email && password)  } className="w-full" type="submit">{isSubmitting? "Logging In...":"Login"}</Button>
        </form>
      </Form>

    <DialogDescription/>
      <DialogFooter>
        
      </DialogFooter>
    </DialogContent>
  </Dialog>
  )
}

export default CreateCategorymodal