"use client";

import { X } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

export default function ToHome({ children }: { children?: React.ReactNode }) {
  //variables
  const base = usePathname().split("/")[1];
  const path = (() => {
    if (base === "events") return "/events/explore";
    return "/home";
  })();

  //navigation
  const router = useRouter();

  return (
    <div onClick={() => router.push(path)} className="cursor-pointer">
      {children ? <>{children}</> : <X />}
    </div>
  );
}
