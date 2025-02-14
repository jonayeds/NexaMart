import { z } from "zod"

export const registerSchema =  z.object({
    name:z
    .string({required_error:"Name is Required"})
    .min(2,"Name must be between 2 to 50 characters")
    .max(50,"Name must be between 2 to 50 characters"),
    email:z
    .string({required_error:"Email is Required"})
    .email("Invalid email address"),
    password:z
    .string({required_error:"Password is Required"})
    .min(6, "Password must be at least 6 characters long"),
    confirmPassword:z
    .string({required_error:"Confirm your password"}).min(6)
})