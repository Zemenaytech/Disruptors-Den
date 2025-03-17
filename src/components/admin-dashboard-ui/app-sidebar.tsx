"use client";

import * as React from "react";
import { signOut } from "next-auth/react";
import {
  BookOpen,
  Calendar,
  ChevronDown,
  FilePen,
  LogOut,
  PanelLeft,
  PlusCircle,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import Link from "next/link";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { state, toggleSidebar, isMobile } = useSidebar();
  const [openBlog, setOpenBlog] = React.useState(false);
  const [openEvent, setOpenEvent] = React.useState(false);
  const [activeItem, setActiveItem] = React.useState("dashboard");
  const pathname = usePathname() || ""; // ✅ Hook called at the top level

  const isEdit = (type: string, pathname: string) => {
    const segments = pathname.split("/").filter(Boolean);
    return (
      segments.length === 4 &&
      segments[0] === "admin" &&
      [type].includes(segments[1])
    );
  };

  React.useEffect(() => {
    setOpenBlog(false);
    setOpenEvent(false);
  }, [state, isMobile]);

  const handleIconClick = (item: string) => {
    if (state === "collapsed") {
      toggleSidebar();
    }
    setActiveItem(item);
    if (item === "blog") {
      setOpenBlog(true);
    } else if (item === "event") {
      setOpenEvent(true);
    }
  };

  const handleSidebarCollapse = () => {
    if (state === "expanded") {
      setOpenBlog(false);
      setOpenEvent(false);
    } else {
      if (activeItem === "blog") setOpenBlog(true);
      if (activeItem === "event") setOpenEvent(true);
    }
    toggleSidebar();
  };

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="relative">
        {state === "collapsed" ? (
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                onClick={handleSidebarCollapse}
                className="flex h-10 w-full items-center justify-center"
              >
                <PanelLeft className="h-5 w-5" />
                <span className="sr-only">Expand Sidebar</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        ) : null}

        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              asChild
              onClick={() => setActiveItem("dashboard")}
            >
              <Link href="/admin">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <BookOpen className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold">Dashboard</span>
                  <span className="text-xs text-muted-foreground">
                    Admin Panel
                  </span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>

        {state === "expanded" ? (
          <button
            onClick={handleSidebarCollapse}
            className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-md hover:bg-sidebar-accent"
          >
            <PanelLeft className="h-4 w-4" />
            <span className="sr-only">Collapse Sidebar</span>
          </button>
        ) : null}
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                onClick={() => {
                  handleIconClick("blog");
                  setOpenBlog(!openBlog);
                }}
                className="w-full"
              >
                <BookOpen
                  className={`mr-2 h-4 w-4 ${activeItem === "blog" ? "text-primary" : ""}`}
                />
                Blog
                <ChevronDown
                  className={`ml-auto h-4 w-4 shrink-0 transition-transform ${openBlog ? "rotate-180" : ""}`}
                />
              </SidebarMenuButton>
            </SidebarMenuItem>

            {openBlog && (
              <div className="ml-6 mt-1 border-l border-sidebar-border pl-2">
                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    className={`h-7 text-sm ${activeItem === "blogs" ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium" : ""}`}
                    onClick={() => setActiveItem("blogs")}
                  >
                    <a href="/admin/blog">Blogs</a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    className={`h-7 text-sm ${activeItem === "blog-create" ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium" : ""}`}
                    onClick={() => setActiveItem("blog-create")}
                  >
                    <a href="/admin/blog/create">
                      <PlusCircle className="mr-2 h-3 w-3" />
                      Create
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                {isEdit("blog", pathname) && (
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      asChild
                      className={`h-7 text-sm ${activeItem === "blog-edit" ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium" : ""}`}
                      onClick={() => setActiveItem("blog-edit")}
                    >
                      <Link href="/admin/blog/edit">
                        <FilePen className="mr-2 h-3 w-3" />
                        Edit
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )}
              </div>
            )}

            {/* Event Group */}
            <SidebarMenuItem>
              <SidebarMenuButton
                onClick={() => {
                  handleIconClick("event");
                  setOpenEvent(!openEvent);
                }}
                className="w-full"
              >
                <Calendar
                  className={`mr-2 h-4 w-4 ${activeItem === "event" ? "text-primary" : ""}`}
                />
                Event
                <ChevronDown
                  className={`ml-auto h-4 w-4 shrink-0 transition-transform ${openEvent ? "rotate-180" : ""}`}
                />
              </SidebarMenuButton>
            </SidebarMenuItem>

            {openEvent && (
              <div className="ml-6 mt-1 border-l border-sidebar-border pl-2">
                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    className={`h-7 text-sm ${activeItem === "events" ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium" : ""}`}
                    onClick={() => setActiveItem("events")}
                  >
                    <a href="/admin/event">Events</a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    className={`h-7 text-sm ${activeItem === "event-create" ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium" : ""}`}
                    onClick={() => setActiveItem("event-create")}
                  >
                    <a href="/admin/event/create">
                      <PlusCircle className="mr-2 h-3 w-3" />
                      Create
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                {isEdit("event", pathname) && (
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      asChild
                      className={`h-7 text-sm ${activeItem === "event-edit" ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium" : ""}`}
                      onClick={() => setActiveItem("event-edit")}
                    >
                      <Link href="/admin/event/edit">
                        <FilePen className="mr-2 h-3 w-3" />
                        Edit
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )}
              </div>
            )}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <button
                onClick={() => {
                  if (typeof window !== "undefined") {
                    signOut({
                      redirect: true,
                      callbackUrl: `${window.location.origin}/signIn`,
                    });
                  }
                }}
                className="w-full"
              >
                {" "}
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </button>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
