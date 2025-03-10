"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileEdit,
  Calendar,
  PenSquare,
  Plus,
  ChevronRight,
  ChevronDown,
  Menu,
} from "lucide-react";
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
} from "@/components/admin-dashboard-ui/sidebar";

export function AdminSidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [openSections, setOpenSections] = useState({
    blog: pathname.includes("/admin/blog"),
    event: pathname.includes("/admin/event"),
  });

  const toggleSection = (section) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  return (
    <Sidebar className={`transition-all ${isCollapsed ? "w-16" : "w-64"}`}>
      <SidebarHeader className="border-b px-6 py-4 flex items-center justify-between">
        <Link href="/admin" className="flex items-center gap-2 font-semibold">
          <FileEdit className="h-6 w-6" />
          {!isCollapsed && <span>Content Manager</span>}
        </Link>
        <button onClick={() => setIsCollapsed(!isCollapsed)}>
          <Menu className="h-6 w-6" />
        </button>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu className="space-y-2">
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={pathname === "/admin"}
              className={
                pathname === "/admin"
                  ? "bg-gray-200 dark:bg-gray-700 rounded-md"
                  : ""
              }
            >
              <Link href="/admin">
                <LayoutDashboard className="h-4 w-4" />
                {!isCollapsed && <span>Dashboard</span>}
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          {/* Blog Management */}
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={() => toggleSection("blog")}
              isActive={pathname.includes("/admin/blog")}
              className={
                pathname.includes("/admin/blog")
                  ? "bg-gray-200 dark:bg-gray-700 rounded-md"
                  : ""
              }
            >
              <PenSquare className="h-4 w-4" />
              {!isCollapsed && <span>Blog Management</span>}
              {!isCollapsed &&
                (openSections.blog ? <ChevronDown /> : <ChevronRight />)}
            </SidebarMenuButton>
            {openSections.blog && (
              <SidebarMenuSub className="space-y-2 pl-4">
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton
                    asChild
                    isActive={pathname === "/admin/blog"}
                    className={
                      pathname === "/admin/blog"
                        ? "bg-gray-100 dark:bg-gray-700 rounded-md"
                        : ""
                    }
                  >
                    <Link href="/admin/blog">Blogs</Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton
                    asChild
                    isActive={pathname === "/admin/blog/create"}
                    className={
                      pathname === "/admin/blog/create"
                        ? "bg-gray-100 dark:bg-gray-700 rounded-md"
                        : ""
                    }
                  >
                    <Link href="/admin/blog/create">Create Blog</Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
              </SidebarMenuSub>
            )}
          </SidebarMenuItem>

          {/* Event Management */}
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={() => toggleSection("event")}
              isActive={pathname.includes("/admin/event")}
              className={
                pathname.includes("/admin/event")
                  ? "bg-gray-200 dark:bg-gray-700 rounded-md"
                  : ""
              }
            >
              <Calendar className="h-4 w-4" />
              {!isCollapsed && <span>Event Management</span>}
              {!isCollapsed &&
                (openSections.event ? <ChevronDown /> : <ChevronRight />)}
            </SidebarMenuButton>
            {openSections.event && (
              <SidebarMenuSub className="space-y-2 pl-4">
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton
                    asChild
                    isActive={pathname === "/admin/event"}
                    className={
                      pathname === "/admin/event"
                        ? "bg-gray-100 dark:bg-gray-700 rounded-md"
                        : ""
                    }
                  >
                    <Link href="/admin/event">Events</Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton
                    asChild
                    isActive={pathname === "/admin/event/create"}
                    className={
                      pathname === "/admin/event/create"
                        ? "bg-gray-100 dark:bg-gray-700 rounded-md"
                        : ""
                    }
                  >
                    <Link href="/admin/event/create">Create Event</Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
              </SidebarMenuSub>
            )}
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}
