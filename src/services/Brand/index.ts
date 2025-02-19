"use server"

import { revalidateTag } from "next/cache"
import { cookies } from "next/headers"

export const createBrand = async(data:FormData)=>{
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/brand`,{
            method:"POST",
            headers:{
                Authorization: (await cookies()).get("accessToken")!.value 
            },
            body:data
        })
        const result = await res.json()
        console.log(result)
        revalidateTag("BRAND")
        return result 
    } catch (error) {
        console.log(error)
    }

}


export const getAllBrands = async()=>{
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/brand`,{
            method:"GET",
            next:{
                tags:["BRANDS"]
            }
        })
        const result = await res.json()
        return result 
    } catch (error) {
        console.log(error)
    }

}
export const deleteABrand = async(id:string)=>{
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/brand/${id}`,{
            method:"DELETE",
            headers:{
                Authorization: (await cookies()).get("accessToken")!.value 
            }
        })
        const result = await res.json()
        revalidateTag("BRAND")
        return result 
    } catch (error) {
        console.log(error)
    }

}