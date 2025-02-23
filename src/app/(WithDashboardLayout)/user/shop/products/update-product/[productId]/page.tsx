import UpdateProductForm from "@/components/modules/shop/product/createProduct/UpdateProductForm"
import { getASingleProduct } from "@/services/Product"

const UpdateProductPage = async({params}:{params:Promise<{productId:string}>}) => {
    const {productId} = await params
    const {data:productData} = await getASingleProduct(productId)
  return (
    <div>
        <UpdateProductForm product={productData}/>
    </div>
  )
}

export default UpdateProductPage