import { Button } from "@/components/ui/button"
import { IFlashSale } from "@/types/flashSale"
import { ShoppingBasket, Star } from "lucide-react"
import Image from "next/image"

const FlashSaleSection = ({sales}:{sales:IFlashSale[]}) => {
  return (
    <div>
        <div>
            <h2>Flash Deals</h2>
            <div></div>
        </div>
        <div className="grid grid-cols-3">
            {
                sales.map(sale=> (
                    <div key={sale._id} className="bg-white p-8 rounded-xl ">
                        <Image src={sale.product?.imageUrls[0]} alt={sale.product.name} width={200} height={200}/>
                        <div className="flex items-center gap-2">
                            <Star/>
                            <p>{sale.product.avarageRating}</p>
                        </div>
                        <h3>{sale.product.name}</h3>
                        <p>{sale.product.description}</p>
                        <p>Price: ${sale.product.offerPrice}</p>
                        <div>
                            <Button variant={"ghost"}><ShoppingBasket/></Button>
                        </div>
                    </div>
                ))
            }
        </div>
    </div>
  )
}

 export default FlashSaleSection