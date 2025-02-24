import { Button } from "@/components/ui/button"
import { IBrand } from "@/types/brand"
import Image from "next/image"
import Link from "next/link"

const TopBrandsSection = ({brands}:{brands:IBrand[]}) => {

  return (
    <div className="container mx-auto my-24">
        <div  className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Top Brands</h2>
        <Link href={""}><Button variant={"ghost"} className="border-[1px] rounded-full border-gray-300">View All</Button></Link>
        </div>
        <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4 mt-12">
            {
                Array(8).fill(brands[0]).map((item:IBrand,idx)=>(
                    <div key={idx} className="p-4 bg-white rounded-xl ">
                        <Image src={item.logo} alt={item.name} width={200} height={200} className="w-full"/>
                    </div>
                ))
            }
        </div>

    </div>
  )
}

export default TopBrandsSection