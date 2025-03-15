"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { CalendarDays, FileText, Loader2, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { fetchBlogs } from "@/lib/blogSlice";
import { fetchEvents } from "@/lib/eventSlice";

// Define RootState Type
interface RootState {
  blog: { blogs: any[]; status: string };
  event: { events: any[]; status: string; currentPage: number };
}

export default function AdminDashboard() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");

  // Get data from Redux store with proper types
  const { blogs, status: blogStatus } = useSelector(
    (state: RootState) => state.blog
  );
  const {
    events,
    status: eventStatus,
    currentPage,
  } = useSelector((state: RootState) => state.event);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        await Promise.all([
          dispatch(fetchBlogs(currentPage)).unwrap(),
          dispatch(fetchEvents(currentPage)).unwrap(),
        ]);
      } catch (error) {
        console.error("Failed to load dashboard data:", error);
        toast.error("Failed to load dashboard data");
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [currentPage]); // Only depend on `currentPage`

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center items-center min-h-[50vh]">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin" />
          <p>Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <div className="flex gap-2">
          <Button asChild size="sm" className="md:size-auto">
            <Link
              href="/admin/blog/new"
              className="flex items-center gap-1 md:gap-2"
            >
              <Plus className="h-3 w-3 md:h-4 md:w-4" />
              <span className="text-xs md:text-sm">New Blog</span>
            </Link>
          </Button>
          <Button asChild size="sm" className="md:size-auto">
            <Link
              href="/admin/event/new"
              className="flex items-center gap-1 md:gap-2"
            >
              <Plus className="h-3 w-3 md:h-4 md:w-4" />
              <span className="text-xs md:text-sm">New Event</span>
            </Link>
          </Button>
        </div>
      </div>

      <Tabs
        defaultValue="overview"
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-4"
      >
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Link href="/admin/blog">
              <Card className="transition-all hover:shadow-md">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-sm font-medium">
                    Total Blog Posts
                  </CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{blogs?.length || 0}</div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/admin/event">
              <Card className="transition-all hover:shadow-md">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-sm font-medium">
                    Total Events
                  </CardTitle>
                  <CalendarDays className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {events?.length || 0}
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
