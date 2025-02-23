"use server"


import { revalidateTag } from "next/cache"
import { cookies } from "next/headers"

export const createProduct = async(data:FormData)=>{
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/product`,{
            method:"POST",
            headers:{
                Authorization: (await cookies()).get("accessToken")!.value 
            },
            body:data
        })

        const result = await res.json()
        console.log(result)
        // ReFetching the the request where this tag is provided 
        revalidateTag("PRODUCT")
        return result 
    } catch (error) {
        console.log(error)
    }

}


export const  getAllProducts = async()=>{
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/product`,{
            method:"GET",
            next:{
                // ReValidate key --> refetch when this key is provided in an api call
                tags:['PRODUCT']
            }
        })
        
        const result = await res.json()
        return result 
    } catch (error) {
        console.log(error)
    }
}


export const deleteAProduct = async(id:string)=>{
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/product/${id}`,{
            method:"DELETE",
            headers:{
                Authorization: (await cookies()).get("accessToken")!.value 
            }
        })
        // ReFetching the the request where this tag is provided 
        revalidateTag("PRODUCT")
        return res.json()
    } catch (error) {
        console.log(error)
    }
}


export const getASingleProduct = async(id:string)=>{
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/product/${id}`)
        const data = await res.json()
        return data
    } catch (error) {
        console.log(error)
    }

}

export const updateProduct =async(id:string, data:FormData)=>{
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/product/${id}`,{
            headers:{
                Authorization: (await cookies()).get("accessToken")!.value
            },
            method:"PATCH",
            body:data
        })
        return res.json()
    } catch (error) {
        console.log(error)
    }
}