"use client";
import "jsvectormap/dist/css/jsvectormap.css";
import "flatpickr/dist/flatpickr.min.css";
import "@/css/satoshi.css";
import "@/css/style.css";
import React, { useEffect, useState } from "react";
import Loader from "@/components/common/Loader";
import { Toaster } from 'react-hot-toast';
import { LayoutProvider } from "@/helpers/LayoutContext";
import { CheckedProjectsProvider } from "@/helpers/CheckedProjectsContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);

  // const pathname = usePathname();

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
      <Toaster />
      <CheckedProjectsProvider>
      <LayoutProvider>
        {loading ? <Loader /> : children}
        </LayoutProvider>
        </CheckedProjectsProvider>
      </body>
    </html>
  );
}
