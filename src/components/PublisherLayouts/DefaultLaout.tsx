"use client";
import React, { useState, ReactNode } from "react";
import Sidebar from "@/components/PublisherSidebar";
import Header from "@/components/PublisherHeader";
import BuyerSidebar from "@/components/BuyerSidebar";
import BuyerHeader from "@/components/BuyerHeader";
import PublisherSidebar from "@/components/PublisherSidebar";
import PublisherHeader from "@/components/PublisherHeader";
import { useLayout } from "@/helpers/LayoutContext";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isPublisher } = useLayout();

  const Sidebar = isPublisher ? PublisherSidebar : BuyerSidebar;
  const Header = isPublisher ? PublisherHeader : BuyerHeader;

  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <>
      {/* <!-- ===== Page Wrapper Star ===== --> */}
      <div className="flex h-screen overflow-hidden">
        {/* <!-- ===== Sidebar Star ===== --> */}
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        {/* <!-- ===== Sidebar End ===== --> */}

        {/* <!-- ===== Content Area Star ===== --> */}
        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          {/* <!-- ===== Header Star ===== --> */}
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          {/* <!-- ===== Header End ===== --> */}

          {/* <!-- ===== Main Content Star ===== --> */}
          <main>
            <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
              {children}
            </div>
          </main>
          {/* <!-- ===== Main Content End ===== --> */}
        </div>
        {/* <!-- ===== Content Area End ===== --> */}
      </div>
      {/* <!-- ===== Page Wrapper End ===== --> */}
    </>
  );
}
