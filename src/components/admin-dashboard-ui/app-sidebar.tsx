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

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { state, toggleSidebar, isMobile, setOpen, setOpenMobile } =
    useSidebar();
  const [openBlog, setOpenBlog] = React.useState(false);
  const [openEvent, setOpenEvent] = React.useState(false);
  const [activeItem, setActiveItem] = React.useState("dashboard");

  const isEdit = (type: string) => {
    const pathname = usePathname();

    // Split the pathname into segments
    const segments = pathname.split("/").filter(Boolean);

    // Check if it's in the /admin/{type}/{id} format
    const isDetailPage =
      segments.length === 4 &&
      segments[0] === "admin" &&
      [type].includes(segments[1]);

    return isDetailPage;
  };
  // Close all menu groups when sidebar state changes or when switching between mobile/desktop
  React.useEffect(() => {
    setOpenBlog(false);
    setOpenEvent(false);
  }, [state, isMobile]);

  // Function to handle icon click in collapsed mode
  const handleIconClick = (item: string) => {
    if (state === "collapsed") {
      // Uncollapse the sidebar
      toggleSidebar();
    }

    // Set the active item
    setActiveItem(item);

    // Open the corresponding menu group
    if (item === "blog") {
      setOpenBlog(true);
    } else if (item === "event") {
      setOpenEvent(true);
    }
  };

  // Function to handle sidebar collapse
  const handleSidebarCollapse = () => {
    // Close all menu groups when sidebar is collapsed
    if (state === "expanded") {
      setOpenBlog(false);
      setOpenEvent(false);
    }
    toggleSidebar();
  };

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="relative">
        {state === "collapsed" ? (
          // When collapsed, button above dashboard
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

        {/* Dashboard button */}
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              asChild
              onClick={() => setActiveItem("dashboard")}
            >
              <a href="/admin">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <BookOpen className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold">Dashboard</span>
                  <span className="text-xs text-muted-foreground">
                    Admin Panel
                  </span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>

        {/* When expanded, button at right end */}
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
            {/* Blog Group */}
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
                {isEdit("blog") && (
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      asChild
                      className={`h-7 text-sm ${activeItem === "blog-edit" ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium" : ""}`}
                      onClick={() => setActiveItem("blog-edit")}
                    >
                      <a href="/admin/blog/edit">
                        <FilePen className="mr-2 h-3 w-3" />
                        Edit
                      </a>
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
                {isEdit("event") && (
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      asChild
                      className={`h-7 text-sm ${activeItem === "event-edit" ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium" : ""}`}
                      onClick={() => setActiveItem("event-edit")}
                    >
                      <a href="/admin/event/edit">
                        <FilePen className="mr-2 h-3 w-3" />
                        Edit
                      </a>
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
                onClick={() =>
                  signOut({
                    redirect: true,
                    callbackUrl: `${window.location.origin}/signIn`,
                  })
                }
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
