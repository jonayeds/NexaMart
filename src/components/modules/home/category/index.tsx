import { Button } from "@/components/ui/button"
import { ICategory } from "@/types/category"
import Image from "next/image"
import Link from "next/link"

const CategorySection = ({categories}:{categories:ICategory[]}) => {

  return (
    <div className="container mx-auto my-12">
        <div  className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Category</h2>
        <Link href={""}><Button variant={"ghost"} className="border-[1px] rounded-full border-gray-300">View All</Button></Link>
        </div>
        <div className="grid lg:grid-cols-6 md:grid-cols-4 grid-cols-2 gap-2 mt-4">
            {
                Array(12).fill(categories[0])?.map((item,idx) =>(
                    <div key={idx} className="bg-gray-50 border-[2px] border-white flex flex-col items-center justify-center rounded-lg p-4">
                        <Image src={item.icon} alt={item.name} width={100} height={100}/>
                        <p className="mt-4 font-semibold">{item.name}</p>
                    </div>
                ))
            }

        </div>
    </div>
  )
}

export default CategorySection