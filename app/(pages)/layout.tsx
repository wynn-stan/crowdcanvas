import React from "react";
import Sidebar from "../components/Sidebar/Index";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Sidebar />
      {children}
    </>
  );
}
