
import CategorySection from "@/components/modules/home/category"
import HeroSection from "@/components/modules/home/heroSection"
import { getAllCategories } from "@/services/Category"




const HomePage = async() => {
  const {data:allCategories} = await getAllCategories()
  
  return (
    <div>
      <HeroSection/>
      <CategorySection categories={allCategories}/>
    </div>
  )
}

export default HomePage