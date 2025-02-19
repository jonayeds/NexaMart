import ManageBrand from "@/components/modules/shop/brand"
import { getAllBrands } from "@/services/Brand"

const BrandPage = async() => {
  const {data} = await getAllBrands()
  return (
    <div>
        <ManageBrand brands={data}/>
    </div>
  )
}

export default BrandPage