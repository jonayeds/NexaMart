"use server"
import { jwtDecode } from "jwt-decode"
import { cookies } from "next/headers"
import { FieldValues } from "react-hook-form"

export const  register = async(userData:FieldValues)=>{ 
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/user`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(userData)
        })
        const result = await res.json()
        if(result.success){
            // setting access token to cookies,,, cookies can only accessed in server functions
            (await cookies()).set('accessToken', result?.data?.accessToken)
        }
        return result
    } catch (error) {
        console.log(error)
        return error
    }
}
export const  login = async(userData:FieldValues)=>{ 
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/login`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(userData)
        })
        const result = await res.json()
        if(result.success){
            // setting access token to cookies,,, cookies can only accessed in server functions
            (await cookies()).set('accessToken', result?.data?.accessToken)
        }
        return result
    } catch (error) {
        console.log(error)
        return error
    }
}

export const getCurrentUser = async()=>{
    // getting accessToken from cookies
    const accessToken = (await cookies()).get('accessToken')?.value
    let decodedData = null
    if(accessToken){
        // decoding access Token using jwt decode... 
        decodedData = await jwtDecode(accessToken) 
    }
    return decodedData

}