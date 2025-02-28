import { Button } from "@/components/ui/button"
import { IProduct } from "@/types/product"
import { Heart, ShoppingBasket, Star } from "lucide-react"
import Image from "next/image"
import CountDown from "./CountDown"

const FlashSaleSection = ({sales}:{sales:IProduct[]}) => {
  return (
    <div className="container mx-auto my-24">
        <div className="flex items-center">
            <h2>Flash Deals</h2>
            <CountDown/>
        </div>
        <div className="grid grid-cols-3 gap-4">
            {
                sales.map(sale=> (
                    <div key={sale._id} className="bg-white p-8 rounded-xl ">
                        <Image src={sale.imageUrls[0]} alt={sale.name} width={200} height={200} className="w-full"/>
                        <div className="flex   items-center gap-2 mt-4">
                            <Star className="text-yellow-500"/>
                            <p>{sale.avarageRating || '5.00'}</p>
                        </div>
                        <h3 className="font-semibold my-2">{sale.name}</h3>
                        <p className="opacity-60 my-2">{sale.description}</p>
                        <p>Price: ${sale.offerPrice}</p>
                        <div className="my-2 flex items-center gap-2">
                            <Button variant={"ghost"} className="rounded-full border-[1px] border-gray-300 "><ShoppingBasket/></Button>
                            <Button variant={"ghost"} className="rounded-full border-[1px] border-gray-300 "><Heart/></Button>
                            <Button variant={"default"} className="rounded-full flex-1 border-[1px]  bg-white text-primary border-primary hover:text-white">Buy Now</Button>
                        </div>
                    </div>
                ))
            }
        </div>
    </div>
  )
}

 export default FlashSaleSection