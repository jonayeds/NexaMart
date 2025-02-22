"use client";
import Logo from "@/app/assets/svgs/Logo";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
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
import { useEffect, useState } from "react";
import ImagePreviewer from "@/components/ui/core/NMImageUploader/ImagePreviewer";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { createProduct } from "@/services/Product";
import { ICategory } from "@/types/category";
import { getAllCategories } from "@/services/Category";
import { getAllBrands } from "@/services/Brand";
import { IBrand } from "@/types/brand";
import { useRouter } from "next/navigation";

type TSpecification  = {
  [key:string]:string
}

const AddProductForm = () => {
  const [imageFiles, setImageFiles] = useState<File[] | []>([])
  const [imagePreview, setImagePreview] = useState<string[]|[]>([])
  const [categories, setCategories] = useState<ICategory[]>([])
  const [brands, setBrands] = useState<IBrand[]>([])
  const router = useRouter()
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
      specification:[{key:"", value:""}]
    }
  });

  useEffect(()=>{
    const pageData = async()=>{
      const [{data:categoriesData}, {data:brandsData}] =  await Promise.all([
        getAllCategories(),
        getAllBrands()
      ])
      setCategories(categoriesData)
      setBrands(brandsData)
    }
    pageData()
  },[])



  const  {formState:{isSubmitting}} = form
  // to dynamically control a field of the form 

  const {append:appendAvailableColors, fields:colorFields} = useFieldArray({
    control:form.control,
    name:"availableColors"
  })

  const {append:appendKeyFeatures, fields:featureFields}  = useFieldArray({
    control:form.control, //--> which form we want to connect
    name: "keyFeatures" //--> which field we want to make dynamic
  })

  const {append:appendSpec, fields:specFields}  = useFieldArray({
    control:form.control, //--> which form we want to connect
    name: "specification" //--> which field we want to make dynamic
  })

  const addSpec = () =>{
    appendSpec({key:"", value:""})
  }


  const addFeatures =()=>{
    appendKeyFeatures({value:""})
  }

  const addColor =()=>{
    appendAvailableColors({value:""})
  }

  const onSubmit:SubmitHandler<FieldValues> = async(data) => {
    const availableColors = data?.availableColors?.map(({value}: {value:string}) => value)
    const keyFeatures = data?.keyFeatures?.map(({value}: {value:string}) => value)
    const specification:TSpecification = {}
  data.specification?.forEach((item:{key:string, value:string}) =>  {
    specification[item.key] = item.value
  })

  try {
      const modifiedData = {
        ...data,
        availableColors,
        keyFeatures,
        specification,
        weight:parseFloat(data?.weight),
        price:parseFloat(data?.price),
        stock:parseInt(data?.stock)
       }
      const formData = new FormData()
      formData.append("data",JSON.stringify(modifiedData))
      for(const image of imageFiles){
        formData.append("images",image)
      }
      const res = await createProduct(formData)
      console.log(res)
      if(res?.success){
        toast.success(res?.message)
        router.push("/user/shop/products")
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
            {/* <Input {...field} type="text" value={field.value || ""}/> */}
            <Select onValueChange={field.onChange} defaultValue={field.value || ""}>
      <SelectTrigger className=" bg-white w-full focus:ring-0 " >
        <SelectValue placeholder="Select a Category" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {
            categories.map((item) =>(
              <SelectItem key={item._id}  value={item._id}>{item.name}</SelectItem>
            ))
          } 
        </SelectGroup>
      </SelectContent>
    </Select>
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
        <Select onValueChange={field.onChange} defaultValue={field.value || ""}>
      <SelectTrigger className=" bg-white w-full focus:ring-0 " >
        <SelectValue placeholder="Select a Category" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {
            brands.map((item) =>(
              <SelectItem key={item._id}  value={item._id}>{item.name}</SelectItem>
            ))
          } 
        </SelectGroup>
      </SelectContent>
    </Select>
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
<Button onClick={addColor} type="button" variant={"ghost"} className="bg-gray-100"><Plus/></Button>
    </div>
<Separator className=" my-4 border-gray-300 rounded-full border-2 col-span-4"  />
  {/* Available Colors*/}
  {
    colorFields.map((color,idx)=>(
      <FormField
      key={idx}
    control={form.control}
    name={`availableColors.${idx}.value`}
    render={({field}) => (
      <FormItem className="col-span-2">
        <div className="flex items-center justify-between">
        <FormLabel  >Color {idx+1}</FormLabel>
        
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
        

  {/* specification */}
    <Separator className=" my-4 border-gray-300 rounded-full border-2 col-span-4"  />

    <div className="flex justify-between  col-span-4">
<h1 className="text-primary text-lg">Specifications</h1>
<Button type="button" onClick={addSpec} variant={"ghost"} className="bg-gray-100"><Plus/></Button>
    </div>
<Separator className=" my-4 border-gray-300 rounded-full border-2 col-span-4"  />
{
  specFields.map((spec,idx)=>(
    <div key={idx} className="col-span-4 grid grid-cols-2 gap-4 my-2">
        <FormField
    control={form.control}
    name={`specification.${idx}.key`}
    render={({field}) => (
        <FormItem className="">
        <div className="flex items-center justify-between">
        <FormLabel  >Feature Name {idx+1}</FormLabel>
        <FormMessage  className="text-xs" />
        </div>
        <FormControl>
            <Input {...field} type="text" value={field.value || ""}/>
        </FormControl>
      </FormItem>
    )}
    />
        <FormField
    control={form.control}
    name={`specification.${idx}.value`}
    render={({field}) => (
        <FormItem className="">
        <div className="flex items-center justify-between">
        <FormLabel  >Feature Description {idx+1}</FormLabel>
        <FormMessage  className="text-xs" />
        </div>
        <FormControl>
            <Input {...field} type="text" value={field.value || ""}/>
        </FormControl>
      </FormItem>
    )}
    />
    </div>
  ))
}

      
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


