"use client";
import React, { createContext, useState, useContext, ReactNode } from "react";

interface LayoutContextProps {
  isPublisher: boolean;
  toggleLayout: () => void;
}

const LayoutContext = createContext<LayoutContextProps | undefined>(undefined);

export const LayoutProvider = ({ children }: { children: ReactNode }) => {
  const [isPublisher, setIsPublisher] = useState(false);

  const toggleLayout = () => {
    setIsPublisher(!isPublisher);
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
