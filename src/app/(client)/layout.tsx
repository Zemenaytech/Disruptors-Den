"use client";
import Footer from "@/components/layout/footer";
import Navbar from "@/components/layout/navbar";
import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { store } from "@/lib/store";
import { usePathname } from "next/navigation";

const ClientLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const path = "/" + pathname.split("/")[1];

  useEffect(() => {
    // Map the pathname to a title
    const pageTitles: Record<string, string> = {
      "/": "Home",
      "/about": "About",
      "/events": "Event",
      "/blog": "Blog",
      "/programs": "Programs",
    };

    // Update the title dynamically
    document.title = "TDD | " + pageTitles[path];
  }, [pathname]);
  return (
    <Provider store={store}>
      <div className="flex flex-col min-h-screen">
        <Navbar />

        <main className="pt-20 flex-grow">{children}</main>
        <Footer />
      </div>
    </Provider>
  );
};

export default ClientLayout;
