"use client";
import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "./globals.css";
import "./i18n";

const lato = Lato({ weight: "400", subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className={lato.className} lang="en">
      <body className="grid min-h-screen max-h-screen max-w-screen min-w-screen">
        {children}
      </body>
    </html>
  );
}
