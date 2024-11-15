"use client";

import HomeButton from "@/components/home-button";

export default function ComparativeDocuments() {
  return (
    <div className="relative size-full">
      <iframe
        className="size-full"
        src="https://diaryreader-tool.memorise.sdu.dk/index.html"
      ></iframe>
      <div className="absolute top-0 left-0 flex justify-center p-4 py-10 items-center">
        <HomeButton />
      </div>
    </div>
  );
}
