"use server"
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
        return res.json()
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
        return res.json()
    } catch (error) {
        console.log(error)
        return error
    }
}