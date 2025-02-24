
import CategorySection from "@/components/modules/home/category"
import FeaturedProducts from "@/components/modules/home/featuredProducts"
import HeroSection from "@/components/modules/home/heroSection"
import TopBrandsSection from "@/components/modules/home/topBrands"
import { getAllBrands } from "@/services/Brand"
import { getAllCategories } from "@/services/Category"
import { getAllProducts } from "@/services/Product"




const HomePage = async() => {
  const {data:allCategories} = await getAllCategories()
  const {data:allProducts}  = await getAllProducts()
  const {data:allBrands} = await getAllBrands()
  return (
    <div>
      <HeroSection/>
      <CategorySection categories={allCategories}/>
      <FeaturedProducts products={allProducts}/>
      <TopBrandsSection brands={allBrands}/>
    </div>
  )
}

export default HomePage