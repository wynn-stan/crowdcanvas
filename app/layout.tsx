import { Poppins } from "next/font/google";
import type { Metadata } from "next";
import ReactGA from "react-ga4";
import { ToastContainer } from "react-toastify";

import Sidebar from "./components/Sidebar/Index";
import Providers from "../Providers/Providers";
import StyledComponentsRegistry from "./registry";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";

const poppins = Poppins({ weight: "500", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CrowdCanvas",
  description:
    "CrowdCanvas is a dynamic communicty Where ideas meet, and voices resonate. Be part of the creative flow",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  ReactGA.initialize(process.env["NEXT_PUBLIC_GOOGLE_ANALYTICS_KEY"] as string);
  ReactGA.send({ hitType: "pageview" });

  return (
    <html lang="en">
      <body className={poppins.className}>
        <StyledComponentsRegistry>
          <Providers>
            <Sidebar />
            {children}

            <ToastContainer autoClose={5000} hideProgressBar />
          </Providers>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
