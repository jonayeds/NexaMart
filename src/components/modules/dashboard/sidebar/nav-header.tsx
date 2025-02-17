"use client"

import * as React from "react"

import {
  DropdownMenu,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import Logo from "@/app/assets/svgs/Logo"

export function NavHeader() {

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
            <SidebarMenuButton
              size="lg"
              className="bg-gray-50 hover:bg-gray-50"
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg  text-sidebar-primary-foreground">
                <Logo/>
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate text-2xl font-semibold">
                  NextMart
                </span>
                
              </div>
            </SidebarMenuButton>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
