"use client"

import { Button } from "@/components/ui/button"
import NMImageUploader from "@/components/ui/core/NMImageUploader"
import ImagePreviewer from "@/components/ui/core/NMImageUploader/ImagePreviewer"
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
import { createBrand } from "@/services/Brand/createBrand"

import { useState } from "react"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import { toast } from "sonner"


const CreateBrandmodal = () => {
    const [imageFiles, setImageFiles] = useState<File[] | []>([])
  const [imagePreview, setImagePreview] = useState<string[]|[]>([])
    const form = useForm();
      const name = form.watch("name")
    
      const  {formState:{isSubmitting}} = form
    
    
      const onSubmit:SubmitHandler<FieldValues> = async(data) => {
        try {
            const formData = new FormData()
            formData.append("data", JSON.stringify(data))
            formData.append("logo", imageFiles[0])
          const res = await createBrand(formData)
          console.log(res)
          if(res?.success){
            toast.success(res?.message)
          }else{
            toast.error(res?.errorSources[0]?.message)
          }
        } catch (error) {
          console.log(error)
        }
    
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
        
  <div className="flex items-end gap-4">
  {/* name */}
        <FormField
    control={form.control}
    name="name"
    render={({field}) => (
      <FormItem className="w-full">
        <div className="flex items-center justify-between">
        <FormLabel  >Name</FormLabel>
        <FormMessage  className="text-xs" />
        </div> 
        <FormControl>
            <Input {...field} className="h-28 " type="text" value={field.value || ""}/>
        </FormControl>
        
      </FormItem>
    )}
  />


  

<div className="flex justify-center items-center   duration-300">
      {
          imagePreview.length>0? 
          <ImagePreviewer imagePreview={imagePreview} setImageFiles={setImageFiles} setImagePreview={setImagePreview} className=" " />
          :
          <NMImageUploader lebel="Upload Logo"  setImagePreview={setImagePreview} imageFiles ={imageFiles} setImageFiles={setImageFiles}/> 
        }
      
       
    </div>

</div>
  <Button disabled={ !name   } className="w-full" type="submit">{isSubmitting? "Creating...":"Create"}</Button>
        </form>
      </Form>

    <DialogDescription/>
      <DialogFooter>
        
      </DialogFooter>
    </DialogContent>
  </Dialog>
  )
}

export default CreateBrandmodal