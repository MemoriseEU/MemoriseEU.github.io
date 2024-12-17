"use client";

import MainContent from "@/app/2d-painting/MainContent";
import MenuBand from "@/app/2d-painting/menu-band";
import { PaintingProvider } from "@/app/2d-painting/painting.context";
import PaintingTop from "./painting-top";

export default function PaintingMain() {
  return (
    <PaintingProvider>
      <div className="h-[100svh] max-h-[100svh] w-[100svw] grid grid-rows-[60px_1fr] relative overflow-hidden painting-main">
        <PaintingTop />
        <div className="grid h-full max-h-full w-full grid-flow-col grid-cols-1 md:grid-cols-[75%,25%] grid-rows-2 md:grid-rows-[1fr] p-6">
          <MainContent />
          <MenuBand />
        </div>
      </div>
    </PaintingProvider>
  );
}
