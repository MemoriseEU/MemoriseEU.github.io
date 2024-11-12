"use client";

import ButtonRow from "@/app/2d-painting/ButtonRow";
import MainContent from "@/app/2d-painting/MainContent";
import MenuBand from "@/app/2d-painting/menu-band";
import { PaintingProvider } from "@/app/2d-painting/painting.context";
import HomeButton from "@/components/home-button";

export default function PaintingMain() {
  return (
    <PaintingProvider>
      <div className="grid h-full max-h-full w-full grid-flow-col grid-cols-[75%,25%] grid-rows-[1fr] painting-main p-6">
        <div className="h-full grid grid-rows-[60px_1fr] relative overflow-hidden">
          <ButtonRow />
          <MainContent />
        </div>
        <MenuBand />
        <HomeButton />
      </div>
    </PaintingProvider>
  );
}
