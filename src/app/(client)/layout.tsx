import Footer from "@/components/layout/footer";
import Navbar from "@/components/layout/navbar";
import React from "react";

const ClientLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default ClientLayout;
