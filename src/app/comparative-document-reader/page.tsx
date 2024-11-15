"use client";

import HomeButton from "@/components/home-button";
import LanguageSwitcher from "@/components/language-switcher";

export default function ComparativeDocuments() {
  return (
    <div className="relative size-full">
      <iframe
        className="size-full"
        src="https://diaryreader-tool.memorise.sdu.dk/index.html"
      ></iframe>
      <div className="absolute top-0 left-0 w-full flex justify-between px-4 items-center">
        <HomeButton />
        <LanguageSwitcher />
      </div>
    </div>
  );
}
