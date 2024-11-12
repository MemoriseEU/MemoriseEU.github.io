"use client";

import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

export default function HomeButton() {
  return (
    <Link href="/" className="absolute">
      <div className="grid grid-flow-row border-2 border-black rounded-full grid-rows-1 grid-cols-[min-content_min-content] items-center hover:shadow-xl cursor-pointer bg-white">
        <ChevronLeftIcon width={32} height={32} />
        <div className="pr-4 font-bold text-lg">Home</div>
      </div>
    </Link>
  );
}
