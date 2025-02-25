"use server"

import { cookies } from "next/headers"
import { FieldValues } from "react-hook-form"

export const addFlashSale =async(data:FieldValues)=>{
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/flash-sale`,{
        method:"POST",
        headers:{
            "Content-Type":"application/json",
            Authorization: (await cookies()).get("accessToken")!.value,
        },
        body:JSON.stringify(data)
    })
    return res.json()
}