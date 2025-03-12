"use client";
import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "./globals.css";
import "./i18n";
import useIdleTimeout from "./use-idle-timeout";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import "@fontsource/ubuntu-mono";

const lato = Lato({ weight: "400", subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [isIdleOverlay, setIdleOverlay] = useState<boolean>(false);

  const handleIdle = () => {
    router.push("/");
    resetTimer();
    setIdleOverlay(false);
  };

  const handlePrompt = () => {
    setIdleOverlay(true);
  };

  const { idleTimer } = useIdleTimeout({
    onIdle: handleIdle,
    onPrompt: handlePrompt,
    idleTime: 180,
  });

  const resetTimer = () => {
    idleTimer.start();
  };

  return (
    <html className={lato.className} lang="en">
      <body className="grid min-h-screen max-h-screen max-w-screen min-w-screen">
        {children}
        {isIdleOverlay && (
          <div
            onClick={(e) => {
              resetTimer();
              setIdleOverlay(false);
            }}
            className="absolute top-0 left-0 size-full bg-slate-50 opacity-[0.01] z-[9999]"
          ></div>
        )}
      </body>
    </html>
  );
}
