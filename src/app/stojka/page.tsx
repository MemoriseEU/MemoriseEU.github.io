"use client";

import HomeButton from "@/components/home-button";
import LanguageSwitcher from "@/components/language-switcher";

export default function Stojka() {
  return (
    <div className="relative size-full">
      <div className="size-full flex items-center justify-center">
        To be filled.
      </div>
      <div className="absolute top-0 left-0 w-full flex justify-between items-center px-4">
        <HomeButton />
        <LanguageSwitcher />
      </div>
    </div>
  );
}
