import type React from "react"
import "@/app/globals.css"
import { Inter } from "next/font/google"
import { SidebarProvider } from "@/components/admin-dashboard-ui/sidebar"
import { AdminSidebar } from "@/components/admin-dashboard-ui/admin-sidebar"

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) { 
  return (
    <html lang="en">
      <body className={inter.className}>
        <SidebarProvider defaultOpen={true}>
          <div className="flex min-h-screen">
            <AdminSidebar />
            <main className="flex-1 p-6">{children}</main>
          </div>
        </SidebarProvider>
      </body>
    </html>
  )
}

