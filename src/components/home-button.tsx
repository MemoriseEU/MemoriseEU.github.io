"use client";

import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { useTranslation } from "react-i18next";

export default function HomeButton() {
  const { t } = useTranslation();
  return (
    <Link href="/" className="">
      <div className="grid grid-flow-row border-2 border-black rounded-full grid-rows-1 grid-cols-[min-content_min-content] items-center hover:shadow-xl cursor-pointer bg-white shadow-md dark:text-black">
        <ChevronLeftIcon className="lg:h-8 lg:w-8 w-4 h-4" />
        <div className="pr-2 md:pr-4 font-bold md:text-lg">{t("home")}</div>
      </div>
    </Link>
  );
}
