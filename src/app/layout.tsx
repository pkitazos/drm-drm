import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { Inter } from "next/font/google";
import { headers } from "next/headers";
import { Toaster } from "react-hot-toast";
import { extractRouterConfig } from "uploadthing/server";

import { ourFileRouter } from "~/app/api/uploadthing/core";
import Sidebar from "~/components/sidebar";
import Header from "~/components/header";
import "~/styles/globals.css";
import { TRPCReactProvider } from "~/trpc/react";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "drm-drm",
  description: "guitar-guitar web app by JARP",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`font-sans ${inter.variable}`}>
        <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
        <TRPCReactProvider headers={headers()}>
          <div className="flex">
          <div className="basis-1/16">
            <Sidebar />
          </div>
          <div className="basis-15/16">
            <Header />
            {children}
          </div>
          </div>
        </TRPCReactProvider>
        <Toaster />
      </body>
    </html>
  );
}
