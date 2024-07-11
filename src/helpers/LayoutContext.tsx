
"use client";
import React, { createContext, useState, useContext, ReactNode, useEffect } from "react";

interface LayoutContextProps {
  isPublisher: boolean;
  toggleLayout: () => void;
}

const LayoutContext = createContext<LayoutContextProps | undefined>(undefined);

export const LayoutProvider = ({ children }: { children: ReactNode }) => {
  const [isPublisher, setIsPublisher] = useState(() => {
    // Check localStorage for the initial value
    if (typeof window !== "undefined") {
      const savedLayout = localStorage.getItem("isPublisher");
      return savedLayout ? JSON.parse(savedLayout) : false;
    }
    return false;
  });

  const toggleLayout = () => {
    setIsPublisher((prev:any) => {
      const newValue = !prev;
      // Save the new value to localStorage
      localStorage.setItem("isPublisher", JSON.stringify(newValue));
      return newValue;
    });
  };

  return (
    <LayoutContext.Provider value={{ isPublisher, toggleLayout }}>
      {children}
    </LayoutContext.Provider>
  );
};

export const useLayout = () => {
  const context = useContext(LayoutContext);
  if (context === undefined) {
    throw new Error("useLayout must be used within a LayoutProvider");
  }
  return context;
};
