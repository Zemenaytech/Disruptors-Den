"use client";
import Footer from "@/components/layout/footer";
import Navbar from "@/components/layout/navbar";
import React from "react";
import { Provider } from "react-redux";
import { store } from "@/lib/store";

const ClientLayout = ({ children }: { children: React.ReactNode }) => {
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
