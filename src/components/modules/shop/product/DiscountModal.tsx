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
import { addFlashSale } from "@/services/Product/flashSale"
import { Dispatch, SetStateAction } from "react"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import { toast } from "sonner"


const DiscountModal = ({selectedProducts, setSelectedProducts}:{selectedProducts: string[], setSelectedProducts:Dispatch<SetStateAction<string[]>>}) => {
    const form = useForm();
      const percentage = form.watch("discountPercentage")
    
      const  {formState:{isSubmitting}} = form

      const onSubmit:SubmitHandler<FieldValues> = async(data) => {
            try {
              const modifiedData = {
                discountPercentage:parseFloat(data.discountPercentage),
                products: selectedProducts
              }
                const result = await addFlashSale(modifiedData)
                if(result?.success){
                  toast.success(result.message)
                  setSelectedProducts([])
                }
            } catch (error) {
                console.log(error)
            }
    
      };
  return (
    <Dialog>
    <DialogTrigger asChild>
      <Button >Flash Sell</Button>
    </DialogTrigger>
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Add Flash Sell</DialogTitle>
      </DialogHeader>
      <Form {...form}>
        <form className="s mt-8 " onSubmit={form.handleSubmit(onSubmit)}>
        
  {/* name */}
        <FormField
    control={form.control}
    name="discountPercentage"
    render={({field}) => (
      <FormItem className="w-full mb-4">
        <div className="flex items-center justify-between">
        <FormLabel  >Discount Percentage</FormLabel>
        <FormMessage  className="text-xs" />
        </div> 
        <FormControl>
            <Input {...field} className=" " type="number" value={field.value || ""}/>
        </FormControl>
        
      </FormItem>
    )}
  />


  

<div className="flex justify-center items-center   duration-300">
      
      
       
    

</div>
  <Button disabled={ !percentage   } className="w-full" type="submit">{isSubmitting? "Adding...":"Add"}</Button>
        </form>
      </Form>

    <DialogDescription/>
      <DialogFooter>
        
      </DialogFooter>
    </DialogContent>
  </Dialog>
  )
}

export default DiscountModal