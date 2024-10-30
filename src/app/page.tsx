"use client";

import ButtonRow from "@/components/2d-painting/ButtonRow";
import MainContent from "@/components/2d-painting/MainContent";
import MenuBand from "@/components/2d-painting/menu-band";
import { PaintingProvider } from "@/components/2d-painting/painting.context";

export default function Home() {
  return (
    <PaintingProvider>
      <div className="grid h-full w-full grid-flow-col grid-cols-[75%,25%] p-5">
        <div className="h-full grid grid-rows-[60px_1fr] relative overflow-hidden">
          <ButtonRow />
          <MainContent />
        </div>
        <MenuBand />
      </div>
    </PaintingProvider>
  );
}
