"use client";

import ButtonRow from "@/app/2d-painting/ButtonRow";
import MainContent from "@/app/2d-painting/MainContent";
import MenuBand from "@/app/2d-painting/menu-band";
import { PaintingProvider } from "@/app/2d-painting/painting.context";
import HomeButton from "@/components/home-button";
import LanguageSwitcher from "@/components/language-switcher";

export default function PaintingMain() {
  return (
    <PaintingProvider>
      <div className="h-full grid grid-rows-[60px_1fr] relative overflow-hidden painting-main">
        <div className="flex items-center p-6 pt-10">
          <HomeButton />
          <ButtonRow />
          <LanguageSwitcher />
        </div>
        <div className="grid h-full max-h-full w-full grid-flow-col grid-cols-[75%,25%] grid-rows-[1fr] p-6">
          <MainContent />
          <MenuBand />
        </div>
      </div>
    </PaintingProvider>
  );
}
