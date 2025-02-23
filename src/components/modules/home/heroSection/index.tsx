import React from 'react'
import styles from  "./HeroSection.module.css"
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import cupImg from "@/assets/svgs/cup-with-headphone.png"

const HeroSection = () => {
  return (
    <div className={`${styles.banner} container mx-auto border-2 border-white rounded-3xl mt-10`}>
        <div className='grid grid-cols-2 gap-4 items-center px-12'>
            <div>
                <h1 className='text-3xl font-bold leading-snug'>Don&apos;t miss out on <br /> These Unbeatable Black <br /> Friday Deals!</h1>
                <p className='font-light text-sm my-8'>Save big this Black Friday with Unbeatable deals in tech, home essentials, fashion  and more! Limited stock</p>
                <div className='flex items-center gap-4'>
                <Button className='rounded-full '>Buy Now</Button>
                <Button variant={"outline"} className='bg-white rounded-full'>All Products</Button>
                </div>
            </div>
            <div>
                <Image src={cupImg} alt='Cup Image'/>
            </div>

        </div>
    </div>
  )
}

export default HeroSection