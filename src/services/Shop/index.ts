"use server"

import { cookies } from "next/headers"

export const createShop = async(data:FormData)=>{
    console.log("hit")
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/shop`,{
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