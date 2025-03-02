"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, FileEdit, Calendar, PenSquare, Plus } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/admin-dashboard-ui/sidebar"

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar>
      <SidebarHeader className="border-b px-6 py-4">
        <Link href="/admin" className="flex items-center gap-2 font-semibold">
          <FileEdit className="h-6 w-6" />
          <span>Content Manager</span>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname === "/admin"} tooltip="Dashboard">
              <Link href="/admin">
                <LayoutDashboard className="h-4 w-4" />
                <span>Dashboard</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          {/* Blog Management */}
          <SidebarMenuItem>
            <SidebarMenuButton isActive={pathname.includes("/admin/blog")} tooltip="Blog Management">
              <PenSquare className="h-4 w-4" />
              <span>Blog Management</span>
            </SidebarMenuButton>
            <SidebarMenuSub>
              <SidebarMenuSubItem>
                <SidebarMenuSubButton asChild isActive={pathname === "/admin/blog/create"}>
                  <Link href="/admin/createBlog">
                    <Plus className="h-4 w-4" />
                    <span>Create Blog</span>
                  </Link>
                </SidebarMenuSubButton>
              </SidebarMenuSubItem>
              <SidebarMenuSubItem>
                <SidebarMenuSubButton asChild isActive={pathname === "/admin/blog"}>
                  <Link href="/blog">
                    <FileEdit className="h-4 w-4" />
                    <span>Edit Blogs</span>
                  </Link>
                </SidebarMenuSubButton>
              </SidebarMenuSubItem>
            </SidebarMenuSub>
          </SidebarMenuItem>

          {/* Event Management */}
          <SidebarMenuItem>
            <SidebarMenuButton isActive={pathname.includes("/admin/event")} tooltip="Event Management">
              <Calendar className="h-4 w-4" />
              <span>Event Management</span>
            </SidebarMenuButton>
            <SidebarMenuSub>
              <SidebarMenuSubItem>
                <SidebarMenuSubButton asChild isActive={pathname === "/admin/event/create"}>
                  <Link href="/admin/createEvent">
                    <Plus className="h-4 w-4" />
                    <span>Create Event</span>
                  </Link>
                </SidebarMenuSubButton>
              </SidebarMenuSubItem>
              <SidebarMenuSubItem>
                <SidebarMenuSubButton asChild isActive={pathname === "/admin/event"}>
                  <Link href="/admin/event">
                    <FileEdit className="h-4 w-4" />
                    <span>Edit Events</span>
                  </Link>
                </SidebarMenuSubButton>
              </SidebarMenuSubItem>
            </SidebarMenuSub>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  )
}

