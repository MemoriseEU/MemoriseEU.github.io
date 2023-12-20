import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/ui/Navbar";

export const metadata: Metadata = {
  title: "Memorise",
  description: "Memorise",
};

const lato = Lato({ weight: "400", subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className={lato.className} lang="en">
      <body className="grid grid-rows-[auto_1fr] min-h-screen max-h-screen">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
