"use client";
import type React from "react";
import "@/app/globals.css";
import { Inter } from "next/font/google";
import { SidebarProvider } from "@/components/admin-dashboard-ui/sidebar";
import { AdminSidebar } from "@/components/admin-dashboard-ui/admin-sidebar";
import { SidebarInset } from "@/components/admin-dashboard-ui/sidebar-inset";
import type { ReactNode } from "react";
import { Provider } from "react-redux";
import { store } from "@/lib/store";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SidebarProvider defaultOpen={true}>
          <AdminSidebar />
          <SidebarInset className="min-h-screen bg-gray-50">
            <div className="flex justify-center px-4 py-6 sm:p-6 md:p-8">
              <div className="w-full max-w-7xl bg-white rounded-lg shadow-sm p-6 sm:p-8">
                <Provider store={store}>{children}</Provider>
              </div>
            </div>
            <Toaster />
          </SidebarInset>
        </SidebarProvider>
      </body>
    </html>
  );
}
