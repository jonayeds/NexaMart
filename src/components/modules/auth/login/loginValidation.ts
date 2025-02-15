import { z } from "zod"

export const loginSchema =  z.object({
    email:z
    .string({required_error:"Email is Required"})
    .email("Invalid email address"),
    password:z
    .string({required_error:"Password is Required"})
    .min(6, "Password must be at least 6 characters long"),
})