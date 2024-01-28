"use client";

import { redirect } from "next/navigation";
import { LandingPage } from "./components/index";
import Button from "./components/Button/Button";

export default function Page() {
  return (
    <div className="text-black flex flex-col w-full px-[52px] py-6">
      <LandingPage.Navbar />
      <div className="w-full flex flex-grow flex-col items-center gap-12 justify-center mt-8 md:mt-[50px] ">
        <LandingPage.Images />
        <LandingPage.description />
      </div>
    </div>
  );
}
