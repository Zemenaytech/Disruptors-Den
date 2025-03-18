"use client";

import type React from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

// export async function generateMetadata({ params }: { params: {} });
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const path = "/" + pathname.split("/").filter(Boolean)[0];

  useEffect(() => {
    // Map the pathname to a title
    const pageTitles: Record<string, string> = {
      "/": "Home",
      "/about": "About",
      "/event": "Event",
      "/blog": "Blog",
      "/programs": "Programs",
      "/login": "Login",
      "/logout": "Logout",
    };

    // Update the title dynamically
    document.title = "TDD | " + pageTitles[path] || "TDD";
  }, [pathname]);
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        {children}
      </body>
    </html>
  );
}
