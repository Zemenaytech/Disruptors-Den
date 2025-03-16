"use client";
import type React from "react";
import "@/app/globals.css";
import { Inter } from "next/font/google";
import type { ReactNode } from "react";
import { Provider } from "react-redux";
import { store } from "@/lib/store";
import { Toaster } from "sonner";
import {
  SidebarInset,
  SidebarProvider,
  useSidebar,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/admin-dashboard-ui/app-sidebar";
import { PanelLeft } from "lucide-react";

const inter = Inter({ subsets: ["latin"] });

// Mobile sidebar button component
function MobileSidebarButton() {
  const { setOpenMobile } = useSidebar();

  return (
    <button
      className="flex h-10 w-10 items-center justify-center bg-white text-black"
      onClick={() => setOpenMobile(true)}
    >
      <PanelLeft className="h-5 w-5" />
    </button>
  );
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <SidebarProvider defaultOpen={true}>
          {/* Mobile sidebar toggle button with its own column */}
          <div className="md:hidden w-[50px] flex-shrink-0 flex flex-col items-center pt-4 bg-white">
            <MobileSidebarButton />
          </div>
          <AppSidebar />
          <SidebarInset>
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
