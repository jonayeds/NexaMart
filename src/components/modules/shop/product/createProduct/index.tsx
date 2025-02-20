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
// import { zodResolver } from "@hookform/resolvers/zod";
// import Link from "next/link";
import { FieldValues,  SubmitHandler,  useFieldArray,  useForm } from "react-hook-form";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";
import NMImageUploader from "@/components/ui/core/NMImageUploader";
import { useState } from "react";
import ImagePreviewer from "@/components/ui/core/NMImageUploader/ImagePreviewer";
import { createShop } from "@/services/Shop";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";

const AddProductForm = () => {
  const [imageFiles, setImageFiles] = useState<File[] | []>([])
  const [imagePreview, setImagePreview] = useState<string[]|[]>([])
  const form = useForm({
    defaultValues:{
      name:"",
      description:"",
      category:"",
      brand:"",
      price:"",
      stock:"",
      weight:"",
      availableColors:[{value:""}],
      keyFeatures:[{value:""}],
      specification:""
    }
  });
  const  {formState:{isSubmitting}} = form
  // to dynamically control a field of the form 
  const {append:appentKeyFeatures, fields:featureFields}  = useFieldArray({
    control:form.control, //--> which form we want to connect
    name: "keyFeatures" //--> which field we want to make dynamic
  })

  const addFeatures =()=>{
    appentKeyFeatures({value:""})
    console.log(featureFields)
  }

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
        <div className="flex items-center gap-2 justify-start">
            <Logo/>
            <div>
                <h1 className="text-3xl font-semibold">Add Product</h1>
            </div>
        </div>
        <Separator className=" my-8 border-gray-300 rounded-full border-2 col-span-4"  />
        <h1 className="text-primary text-2xl">Basic Information</h1>
        <Separator className=" my-8 border-gray-300 rounded-full border-2 col-span-4"  />
      <Form {...form}>
        <form className=" mt-8   space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid md:grid-cols-4 grid-cols-  gap-4 ">

            {/* Product Name */}
        <FormField
    control={form.control}
    name="name"
    render={({field}) => (
        <FormItem className="col-span-2">
        <div className="flex  items-center justify-between">
        <FormLabel  >Product Name</FormLabel>
        <FormMessage className="text-xs" />
        </div>
        <FormControl>
            <Input  {...field} value={field.value || ""}/>
        </FormControl>
      </FormItem>
    )}
    />

    
  {/* Price */}
        <FormField
    control={form.control}
    name="price"
    render={({field}) => (
        <FormItem className="col-span-2">
        <div className="flex items-center justify-between">
        <FormLabel  >Price</FormLabel>
        <FormMessage className="text-xs"  />
        </div>
        <FormControl>
            <Input {...field} type="number" value={field.value || ""}/>
        </FormControl>
      </FormItem>
    )}
    />
  {/*Stock */}
        <FormField
    control={form.control}
    name="stock"
    render={({field}) => (
        <FormItem className="col-span-2">
        <div className="flex items-center justify-between">
        <FormLabel  >Stock</FormLabel>
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
 

  {/* Weight */}
        <FormField
    control={form.control}
    name="weight"
    render={({field}) => (
        <FormItem className="col-span-2">
        <div className="flex items-center justify-between">
        <FormLabel  >Weight</FormLabel>
        <FormMessage  className="text-xs" />
        </div>
        <FormControl>
            <Input {...field} type="number" value={field.value || ""}/>
        </FormControl>
      </FormItem>
    )}
    />


  {/* Category */}
        <FormField
    control={form.control}
    name="category"
    render={({field}) => (
        <FormItem className="col-span-2">
        <div className="flex items-center justify-between">
        <FormLabel  >Category</FormLabel>
        <FormMessage  className="text-xs" />
        </div>
        <FormControl>
            <Input {...field} type="number" value={field.value || ""}/>
        </FormControl>
      </FormItem>
    )}
    />


  {/* Brand */}
        <FormField
    control={form.control}
    name="brand"
    render={({field}) => (
        <FormItem className="col-span-2">
        <div className="flex items-center justify-between">
        <FormLabel  >Brand</FormLabel>
        <FormMessage  className="text-xs" />
        </div>
        <FormControl>
            <Input {...field} type="text" value={field.value || ""}/>
        </FormControl>
      </FormItem>
    )}
    />

      {/* Product Description  */}
      <FormField
    control={form.control}
    name="description"
    render={({field}) => (
        <FormItem className=" h-full col-span-4 ">
        <div className="flex items-center justify-between">
        <FormLabel  >Product Description</FormLabel>
        <FormMessage  className="text-xs" />
        </div> 
        <FormControl>
            {/* <Input {...field} type="text" value={field.value || ""}/> */}
            <Textarea {...field}  className="bg-white h-16" value={field.value || ""} />
        </FormControl>
        
      </FormItem>
    )}
    />
        <Separator className=" my-4 border-gray-300 rounded-full border-2 col-span-4"  />
<h1 className="text-primary text-lg">Images</h1>
<Separator className=" my-4 border-gray-300 rounded-full border-2 col-span-4"  />
<div className="flex justify-start gap-4 items-center col-span-4  duration-300 ">
      
        <NMImageUploader lebel="Upload Image"  setImagePreview={setImagePreview} imageFiles ={imageFiles} setImageFiles={setImageFiles} className="text-xs"/> 
        <ImagePreviewer imagePreview={imagePreview} setImageFiles={setImageFiles} setImagePreview={setImagePreview} className="flex gap-2 items-center relative " />
        
     
      
       
    </div>
    
    <Separator className=" my-4 border-gray-300 rounded-full border-2 col-span-4"  />


    <Separator className=" my-4 border-gray-300 rounded-full border-2 col-span-4"  />
    <div className="flex justify-between  col-span-4">
<h1 className="text-primary text-lg">Available Colors</h1>
<Button variant={"ghost"} className="bg-gray-100"><Plus/></Button>
    </div>
<Separator className=" my-4 border-gray-300 rounded-full border-2 col-span-4"  />
  {/* Available Colors*/}
        <FormField
    control={form.control}
    name="availableColors"
    render={({field}) => (
      <FormItem className="col-span-2">
        <div className="flex items-center justify-between">
        <FormLabel  >Color 1</FormLabel>
        
        <FormMessage  className="text-xs" />
        </div>
        <FormControl>
            <Input {...field} type="text" value={field.value || ""}/>
        </FormControl>
      </FormItem>
    )}
    />

    <Separator className=" my-4 border-gray-300 rounded-full border-2 col-span-4"  />

  {/* specification */}
        <FormField
    control={form.control}
    name="specification"
    render={({field}) => (
        <FormItem className="col-span-4">
        <div className="flex items-center justify-between">
        <FormLabel  >Specification</FormLabel>
        <FormMessage  className="text-xs" />
        </div>
        <FormControl>
            <Input {...field} type="text" value={field.value || ""}/>
        </FormControl>
      </FormItem>
    )}
    />
    <Separator className=" my-4 border-gray-300 rounded-full border-2 col-span-4"  />
    <div className="flex justify-between  col-span-4">
<h1 className="text-primary text-lg">Key Features</h1>
<Button type="button" onClick={addFeatures} variant={"ghost"} className="bg-gray-100"><Plus/></Button>
    </div>
<Separator className=" my-4 border-gray-300 rounded-full border-2 col-span-4"  />

  {/* keyFeatures */}
  {
    featureFields.map((feature,idx)=>(
      <FormField
      key={idx}
    control={form.control}
    name={`keyFeatures.${idx}.value`}
    render={({field}) => (
        <FormItem className="col-span-2">
        <div className="flex items-center justify-between">
        <FormLabel  >Key Feature {idx+1}</FormLabel>
        <FormMessage  className="text-xs" />
        </div>
        <FormControl>
            <Input {...field} type="text" value={field.value || ""}/>
        </FormControl>
      </FormItem>
    )}
    />
    ))
  }


    
    
    </div>


  <Button className="w-full" type="submit">{isSubmitting? "Creating...":"Create"}</Button>
        </form>
      </Form>
    </div>
  );
};

export default AddProductForm;



// {
//     "name": "Lenovo XPS 15 Laptop", ---
//     "description": "The Lenovo XPS 13 is a high-performance laptop with a sleek design, perfect for work and play.",
//     "price": 120455, --
//     "stock": 50,
//     "weight": 1.24,
//     "category": "6784da8ff8bb3af04cb26dcb", 
//     "brand": "6784db1031af13750ec95aaa",
//     "availableColors": [
//       "Silver",
//       "Black"
//     ],
//     "specification": {
//       "processor": "Intel Core i7",
//       "ram": "16GB",
//       "storage": "512GB SSD",
//       "display": "13.3 inch FHD"
//     },
//     "keyFeatures": [
//       "Long battery life",
//       "Slim and lightweight",
//       "Fast performance"
//     ]
//   }