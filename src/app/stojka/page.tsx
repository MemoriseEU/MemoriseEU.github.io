"use client";

import HomeButton from "@/components/home-button";
import LanguageSwitcher from "@/components/language-switcher";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import StojkaMenu from "./strojka-menu";
import Image from "next/image";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";

export default function Stojka() {
  const { t } = useTranslation();

  const [selectedPane, setSelectedPane] = useState<string | null>(null);

  const content = useMemo(() => {
    switch (selectedPane) {
      case "words":
        return (
          <video
            controls
            src="assets/ExtractCeijaStojkaGreenGreenGrass.mp4"
            autoPlay={true}
            // poster="https://user-images.githubusercontent.com/28612032/172026551-e5a96748-d724-4a08-b6b3-f44655d4ef39.png"
            width="820"
            style={{ width: "100%", height: "100%" }}
          >
            Sorry, your browser doesn't support embedded videos.
          </video>
        );

      case "dead":
      case "tree":
      case "memories":
      case "april":
        return (
          <div className="size-full border relative">
            <Image
              src={`assets/${selectedPane}.png`}
              alt={"Words"}
              fill={true}
              style={{ objectFit: "contain" }}
            />
          </div>
        );

      default:
        return (
          <div className="size-full grid grid-cols-[1fr_1fr] grid-rows-[60%_auto] gap-4">
            <div
              className="size-full border cursor-pointer relative"
              onClick={(e) => {
                setSelectedPane("words");
              }}
            >
              <Image
                src={"assets/words.png"}
                alt={"Words"}
                fill={true}
                style={{ objectFit: "cover" }}
              />
            </div>
            <div className="size-full grid grid-cols-[1fr_1fr] grid-rows-[1fr] gap-4">
              <div
                className="size-full border cursor-pointer relative"
                onClick={(e) => {
                  setSelectedPane("april");
                }}
              >
                <Image
                  src={"assets/april.png"}
                  alt={"Apruk"}
                  fill={true}
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div
                className="size-full border cursor-pointer relative"
                onClick={(e) => {
                  setSelectedPane("tree");
                }}
              >
                <Image
                  src={"assets/tree.png"}
                  alt={"Tree"}
                  fill={true}
                  style={{ objectFit: "cover" }}
                />
              </div>
            </div>
            <div
              className="size-full border cursor-pointer relative"
              onClick={(e) => {
                setSelectedPane("dead");
              }}
            >
              <Image
                src={"assets/dead.png"}
                alt={"Dead"}
                fill={true}
                style={{ objectFit: "cover" }}
              />
            </div>
            <div
              className="size-full border cursor-pointer relative"
              onClick={(e) => {
                setSelectedPane("memories");
              }}
            >
              <Image
                src={"assets/memories.png"}
                alt={"Memories"}
                fill={true}
                style={{ objectFit: "cover" }}
              />
            </div>
          </div>
        );
    }
  }, [selectedPane]);

  return (
    <div className="relative size-full p-4">
      <div className="size-full grid grid-cols-[80%_auto] grid-rows-[1fr] gap-4">
        {content}
        <div className="size-full border relative">
          <StojkaMenu pane={selectedPane} />
        </div>
      </div>
      <div className="absolute top-0 left-0 w-full flex justify-between items-center px-4">
        {selectedPane != null ? (
          <div
            className="grid grid-flow-row border-2 border-black rounded-full grid-rows-1 grid-cols-[min-content_min-content] items-center hover:shadow-xl cursor-pointer bg-white shadow-md dark:text-black"
            onClick={(e) => {
              setSelectedPane(null);
            }}
          >
            <ChevronLeftIcon width={32} height={32} />
            <div className="pr-4 font-bold text-lg">{t("reset")}</div>
          </div>
        ) : (
          <HomeButton />
        )}
        <LanguageSwitcher />
      </div>
    </div>
  );
}
