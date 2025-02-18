"use server"

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
        return result 
    } catch (error) {
        console.log(error)
    }

}


export const  getAllCategories = async()=>{
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/category`,{
            method:"GET",
            
        })
        const result = await res.json()
        return result 
    } catch (error) {
        console.log(error)
    }
}


export const deleteACategory = async(id:string)=>{
    try {
        console.log(id)
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/category/${id}`,{
            method:"DELETE",
            headers:{
                Authorization: (await cookies()).get("accessToken")!.value 
            }
        })
        return res.json()
    } catch (error) {
        console.log(error)
    }
}