import { NextRequest, NextResponse } from "next/server"
import { getCurrentUser } from "./services/AuthService"

type TRole = keyof typeof roleBasedPrivateRoutes



const authRoutes = ['/login',"/register"]
const roleBasedPrivateRoutes = {
    user:[/^\/user/, /^\/create-shop/ ], //--> regular expression for '/user'
    admin:[/^\/admin/]
}

// middleware function --> trggers when client is changing routes 
export const middleware = async(request:NextRequest)=>{
    // pathname is recieved as request
    const {pathname} = request.nextUrl
    const userInfo = await getCurrentUser()
    if(!userInfo){
        if(authRoutes.includes(pathname)){
            // returning the route if it is auth route
            return NextResponse.next()
        }else{
            // redirecting to login route sending the requested pathname as query
            return NextResponse.redirect(new URL(`http://localhost:3000/login?redirectPath=${pathname}`, request.url))
        }
    }
    if(userInfo?.role && roleBasedPrivateRoutes[userInfo.role as TRole]){ 
        const routes = roleBasedPrivateRoutes[userInfo.role as TRole]
        //  Array.some --> array method if any one condition matches, returns true
        // string.match(regex) --> to match any string with regex
        if(routes.some(route => pathname.match(route))){
            return NextResponse.next()
        }
    }
    return NextResponse.redirect('http://localhost:3000')

}

// if matcher routes in config is given, middleware will trigger before navigating to these routes
export const config = {
    matcher:[
        '/login',
        "/create-shop",
        "/admin",
        "/admin/:page",
        "/user",
        "/user/:page",
    ]
}