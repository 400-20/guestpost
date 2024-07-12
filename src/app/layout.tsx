"use client";
import "jsvectormap/dist/css/jsvectormap.css";
import "flatpickr/dist/flatpickr.min.css";
import "@/css/satoshi.css";
import "@/css/style.css";
import React, { useEffect, useState } from "react";
import Loader from "@/components/common/Loader";
import { Toaster } from 'react-hot-toast';
import { LayoutProvider } from "@/helpers/LayoutContext";
import { ProjectProvider } from "@/helpers/CheckedProjectsContext";
import { SidebarProjectProvider } from "@/helpers/SidebarProjectContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer); // Cleanup on unmount
  }, []);

  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <Toaster />
        <LayoutProvider>
        <ProjectProvider>
        <SidebarProjectProvider>



              {loading ? <Loader /> : children}



        </SidebarProjectProvider>
        </ProjectProvider>
        </LayoutProvider>

      </body>
    </html>
  );
}
