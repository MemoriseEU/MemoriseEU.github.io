"use client";
import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "./globals.css";
import "./i18n";
import useIdleTimeout from "./use-idle-timeout";
import { useRouter } from "next/navigation";

const lato = Lato({ weight: "400", subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const handleIdle = () => {
    router.push("/");
    resetTimer();
  };
  const { idleTimer } = useIdleTimeout({ onIdle: handleIdle, idleTime: 180 });

  const resetTimer = () => {
    idleTimer.reset();
  };

  return (
    <html className={lato.className} lang="en">
      <body className="grid min-h-screen max-h-screen max-w-screen min-w-screen">
        {children}
      </body>
    </html>
  );
}
