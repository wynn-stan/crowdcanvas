import Link from "next/link";
import React, { ButtonHTMLAttributes } from "react";

export default function description() {
  return (
    <div className="flex flex-col gap-7">
      <div className="text-4xl sm:text-5xl text-center font-semibold">
        <div>Don&apos;t Settle.</div>
        <div>Roam. Taste. Connect.</div>
      </div>

      <div className="flex flex-col gap-7">
        <p className="max-w-[730px] font-medium text-base text-[#5E5E5E] text-center">
          From lively concerts to cozy art exhibits, CrowdCanvas brings your city&apos;s pulse to your
          fingertips. Embrace the richness that urban life has to offer.
        </p>
        <div className="w-full flex flex-col sm:flex-row justify-center gap-5">
          <Link href="/events/explore">
            <Button className="bg-black text-white">Explore Events</Button>
          </Link>
          <Link href="/home">
            <Button className="border border-[#BBBBBB]">Join Forum</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

function Button({ children, className }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={`text-lg text-center w-full sm:w-fit font-semibold border-2 rounded sm:px-[84px] py-[28px] ${className}`}
    >
      {children}
    </button>
  );
}
