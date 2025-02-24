import { Button } from "@/components/ui/button"
import { IProduct } from "@/types/product"
import { Heart, Star } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const FeaturedProducts = ({products}:{products:IProduct[]}) => {
  return (
    <div className=" my-12 bg-gray-100 py-12" >
        <div className="container mx-auto">

        <div  className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Featured Products</h2>
        <Link href={""}><Button variant={"ghost"} className="border-[1px] rounded-full border-gray-300">View All</Button></Link>
        </div>
        <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-2 mt-4">
                    {
                        Array(4).fill(products[0])?.map((item:IProduct,idx:number) =>(
                            <div key={idx} className=" border-[2px] border-white  rounded-lg p-4 space-y-4 bg-white">
                                <Image src={item.imageUrls[0]} alt={item.name} width={100} height={100} className="w-full mb-4"/>
                                <Link href={``} className=" text-lg font-semibold">{item.name}</Link>
                                <div className="flex justify-between items-center">
                                <p>Price: ${item.price}</p>
                                <div className="flex items-center justify-between gap-2">
                                    <Star className="text-yellow-500"/>
                                    <p>{item.avarageRating}</p>
                                </div>
                                </div>
                                <div className="flex w-full gap-2">
                                    <Button variant={"ghost"} className="border-[1px] w-full border-gray-300 rounded-full">Add to cart</Button>
                                    <Button variant={"ghost"} className="border-[1px] border-gray-300 rounded-full"><Heart/></Button>
                                </div>
                                <Button className="hover:text-white hover:bg-primary text-primary bg-white rounded-full w-full duration-300 border-2 border-primary">Buy Now</Button>
                            </div>
                        ))
                    }
        
                </div>
                    </div>
    </div>
  )
}

export default FeaturedProducts