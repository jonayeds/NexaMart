
import CategorySection from "@/components/modules/home/category"
import FeaturedProducts from "@/components/modules/home/featuredProducts"
import FlashSaleSection from "@/components/modules/home/flashSale"
import HeroSection from "@/components/modules/home/heroSection"
import TopBrandsSection from "@/components/modules/home/topBrands"
import { getAllBrands } from "@/services/Brand"
import { getAllCategories } from "@/services/Category"
import { getAllProducts } from "@/services/Product"
import { getAllFlashSell } from "@/services/Product/flashSale"




const HomePage = async() => {
  const {data:allCategories} = await getAllCategories()
  const {data:allProducts}  = await getAllProducts()
  const {data:allBrands} = await getAllBrands()
  const {data:allSales} = await getAllFlashSell()
  console.log(allSales)
  return (
    <div>
      <HeroSection/>
      <CategorySection categories={allCategories}/>
      <FeaturedProducts products={allProducts}/>
      <TopBrandsSection brands={allBrands}/>
      <FlashSaleSection sales={allSales} />
    </div>
  )
}

export default HomePage