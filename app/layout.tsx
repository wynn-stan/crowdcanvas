import { Poppins } from "next/font/google";
import type { Metadata } from "next";

import Sidebar from "./components/Sidebar/Index";
import Providers from "./Providers/Providers";
import "./globals.css";

const poppins = Poppins({ weight: "500", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CrowdCanvas",
  description:
    "CrowdCanvas is a dynamic communicty Where ideas meet, and voices resonate. Be part of the creative flow",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <Providers>
          <Sidebar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
