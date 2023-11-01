"use client";

import { useWindowWidth } from "@react-hook/window-size";

import Sidebar from "./Sidebar";

export default function Index() {
  const width = useWindowWidth();
  const isMobile = width <= 480;

  return isMobile ? <></> : <Sidebar />;
}
