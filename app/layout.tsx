import type { Metadata } from "next";
import ReactGA from "react-ga4";
import { ToastContainer } from "react-toastify";

import Sidebar from "./components/Sidebar/Index";
import Providers from "../Providers/Providers";
import StyledComponentsRegistry from "./registry";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import Script from "next/script";

export const metadata: Metadata = {
  title: "CrowdCanvas",
  description:
    "CrowdCanvas is a dynamic communicty Where ideas meet, and voices resonate. Be part of the creative flow",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${process?.env?.["NEXT_PUBLIC_GOOGLE_ANALYTICS_KEY"]}`}
        />
        <Script id="google-analytics">
          {`
         window.dataLayer = window.dataLayer || [];
         function gtag(){dataLayer.push(arguments);}
         gtag('js', new Date());
       
         gtag('config', '${process?.env?.["NEXT_PUBLIC_GOOGLE_ANALYTICS_KEY"]}');
        `}
        </Script>
        <Script id="scripttag">{`gtag('event', "screen_view")`}</Script>
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
