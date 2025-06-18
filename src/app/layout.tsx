import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
// import { Toaster } from "@/components/ui/toaster";
// import { Toaster as Sonner } from "@/components/ui/sonner";
// import { TooltipProvider } from "@/components/ui/tooltip";
import "./globals.css";
import "@radix-ui/themes/styles.css";
import { Suspense } from "react";
import { Theme } from "@radix-ui/themes";
import Navbar from "@/components/navbar";

export const metadata: Metadata = {
  title: "Biologia - Pruebas de examen",
  description:
    "Aplicación para ayudar a estudiar los diferentes tipos de especies",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Theme
          accentColor="indigo"
          appearance="dark"
          grayColor="gray"
          scaling="90%"
          radius="small"
        >
          <Navbar />
          <Suspense>
            {children}
          </Suspense>
          {/* <ThemePanel /> */}
        </Theme>
      </body>
    </html>
  );
}
