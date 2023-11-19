"use client";

import { X } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ToHome({ children }: { children?: React.ReactNode }) {
  const router = useRouter();

  return (
    <div onClick={() => router.push("/home")} className="cursor-pointer">
      {children ? <>{children}</> : <X />}
    </div>
  );
}
