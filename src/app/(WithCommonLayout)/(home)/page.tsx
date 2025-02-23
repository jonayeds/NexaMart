
import CategorySection from "@/components/modules/home/category"
import FeaturedProducts from "@/components/modules/home/featuredProducts"
import HeroSection from "@/components/modules/home/heroSection"
import { getAllCategories } from "@/services/Category"
import { getAllProducts } from "@/services/Product"




const HomePage = async() => {
  const {data:allCategories} = await getAllCategories()
  const {data:allProducts}  = await getAllProducts()
  return (
    <div>
      <HeroSection/>
      <CategorySection categories={allCategories}/>
      <FeaturedProducts products={allProducts}/>

    </div>
  )
}

export default HomePage