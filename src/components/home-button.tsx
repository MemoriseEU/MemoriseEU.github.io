"use client";

import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { useTranslation } from "react-i18next";

export default function HomeButton() {
  const { t } = useTranslation();
  return (
    <Link href="/" className="">
      <div className="grid grid-flow-row border-2 border-black rounded-full grid-rows-1 grid-cols-[min-content_min-content] items-center hover:shadow-xl cursor-pointer bg-white">
        <ChevronLeftIcon width={32} height={32} />
        <div className="pr-4 font-bold text-lg">{t("home")}</div>
      </div>
    </Link>
  );
}
