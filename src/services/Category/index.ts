"use server"

import { revalidateTag } from "next/cache"
import { cookies } from "next/headers"

export const createCategory = async(data:FormData)=>{
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/category`,{
            method:"POST",
            headers:{
                Authorization: (await cookies()).get("accessToken")!.value 
            },
            body:data
        })

        const result = await res.json()
        console.log(result)
        // ReFetching the the request where this tag is provided 
        revalidateTag("CATEGORY")
        return result 
    } catch (error) {
        console.log(error)
    }

}


export const  getAllCategories = async()=>{
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/category`,{
            method:"GET",
            next:{
                // ReValidate key --> refetch when this key is provided in an api call
                tags:['CATEGORY']
            }
        })
        
        const result = await res.json()
        return result 
    } catch (error) {
        console.log(error)
    }
}


export const deleteACategory = async(id:string)=>{
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/category/${id}`,{
            method:"DELETE",
            headers:{
                Authorization: (await cookies()).get("accessToken")!.value 
            }
        })
        // ReFetching the the request where this tag is provided 
        revalidateTag("CATEGORY")
        return res.json()
    } catch (error) {
        console.log(error)
    }
}