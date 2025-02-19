"use client"

import * as React from "react"
import {
  LayoutDashboard,
  Settings,
  ShoppingBag,
} from "lucide-react"

import { NavMain } from "@/components/modules/dashboard/sidebar/nav-main"
import { NavUser } from "@/components/modules/dashboard/sidebar/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { NavHeader } from "./nav-header"



// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "https://t3.ftcdn.net/jpg/09/39/45/88/240_F_939458818_jVOdxa4lg5rlOUwIurL0zZBl19pJCV9m.jpg",
  },
  navMain: [
    {
      title:'Dashboard',
      url:"/user/dashboard",
      icon:LayoutDashboard,
      isActive:true
    },
    {
      title:'Shop',
      url:"/user/shop/all-products",
      icon:ShoppingBag,
      items:[
        {
          title:"Manage Products",
          url:"/user/shop/products"
        },
        {
          title:"Manage Categories",
          url:"/user/shop/category"
        },
        {
          title:"Manage Brands",
          url:"/user/shop/brand"
        },
      ]
    },
    {
      title:'Settings',
      url:"/settings",
      icon:Settings,
      items:[
        {
          title:"Profile",
          url:"/user/settings"
        },
        
      ]
    },
    
  ],
  
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
                <NavHeader/>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        
        
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail /> 
    </Sidebar>
  )
}
