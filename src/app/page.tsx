"use client";

import ButtonRow from "@/components/2d-painting/ButtonRow";
import MainContent from "@/components/2d-painting/MainContent";
import MenuBand from "@/components/2d-painting/menu-band";
import { PaintingProvider } from "@/components/2d-painting/painting.context";

export default function Home() {
  return (
    <div className="size-full grid grid-rows-[1fr_50px_200px] max-h-full">
      <PaintingProvider>
        <MainContent />
        <ButtonRow />
        <MenuBand />
      </PaintingProvider>
    </div>
  );
}
