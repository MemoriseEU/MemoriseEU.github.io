"use client";

import HomeButton from "@/components/home-button";
import LanguageSwitcher from "@/components/language-switcher";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

interface MenuProps {
  pane: string | null;
}

export default function StojkaMenu(props: MenuProps) {
  const { pane } = props;
  const { t } = useTranslation();

  const content = useMemo(() => {
    if (pane != null) {
      const title = t(`stojka.${pane}.title`);
      const text = t(`stojka.${pane}.text`);
      return (
        <div className="p-8">
          <div className="text-xl py-2">{title}</div>
          <div>
            {text.split("<BREAK>").map((e) => {
              return <div className="text-lg py-2">{e}</div>;
            })}
          </div>
        </div>
      );
    } else {
      return (
        <div className="flex justify-center items-center flex-col h-full w-full text-center px-8">
          <div className="mb-3 text-xl font-bold">
            {t("stojka.start.title")}
          </div>
          <div className="text-left">{t("stojka.start.text")}</div>
        </div>
      );
    }
  }, [pane, t]);

  return (
    <div className="grid grid-rows-[1fr] h-full max-h-full overflow-hidden overflow-y-scroll absolute">
      <div className="relative h-full py-8">{content}</div>
    </div>
  );
}
