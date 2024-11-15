"use client";

import HomeButton from "@/components/home-button";

export default function UnhearedVoices() {
  return (
    <div className="relative size-full">
      <iframe
        className="size-full"
        src="https://embed.figma.com/proto/GQqDlny1SyVAlLPH2rIwTP/Prototype-Exhibition-Bergen-Belsen?content-scaling=fixed&kind=proto&node-id=59-1903&page-id=0%3A1&scaling=contain&show-proto-sidebar=0&starting-point-node-id=59%3A1903&embed-host=share"
      ></iframe>
      <div className="absolute top-0 left-0 flex justify-center p-4 items-center">
        <HomeButton />
      </div>
    </div>
  );
}
