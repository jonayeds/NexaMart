import ProductForm from "@/components/modules/shop/product/createProduct/ProductForm"
import { getASingleProduct } from "@/services/Product"

const UpdateProductPage = async({params}:{params:Promise<{productId:string}>}) => {
    const {productId} = await params
    const {data:productData} = await getASingleProduct(productId)
  return (
    <div>
        <ProductForm product={productData}/>
    </div>
  )
}

export default UpdateProductPage