"use client";

import ButtonRow from "@/app/2d-painting/ButtonRow";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import MainContent from "@/app/2d-painting/MainContent";
import MenuBand from "@/app/2d-painting/menu-band";
import {
  PaintingContext,
  PaintingProvider,
} from "@/app/2d-painting/painting.context";
import HomeButton from "@/components/home-button";
import LanguageSwitcher from "@/components/language-switcher";
import Link from "next/link";
import { useContext, useMemo } from "react";
import { useTranslation } from "react-i18next";

export default function PaintingTop() {
  const paintingContext = useContext(PaintingContext);
  const { t } = useTranslation();

  const buttonContent = useMemo(() => {
    return paintingContext?.mode === "default" ? (
      <HomeButton />
    ) : (
      <div
        onClick={() => {
          paintingContext?.updateMode("default");
        }}
        className="grid grid-flow-row border-2 border-black rounded-full grid-rows-1 grid-cols-[min-content_min-content] items-center hover:shadow-xl cursor-pointer bg-white shadow-md dark:text-black"
      >
        <ChevronLeftIcon className="lg:h-8 lg:w-8 w-4 h-4" />
        <div className="pr-2 lg:pr-4 font-bold lg:text-lg">{t("reset")}</div>
      </div>
    );
  }, [paintingContext]);

  return (
    <div className="flex items-center p-6 pt-10 w-full justify-between">
      {buttonContent}
      <ButtonRow />
      <LanguageSwitcher />
    </div>
  );
}
