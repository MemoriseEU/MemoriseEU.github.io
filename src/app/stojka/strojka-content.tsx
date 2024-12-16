"use client";

import HomeButton from "@/components/home-button";
import LanguageSwitcher from "@/components/language-switcher";
import {
  ChevronLeftIcon,
  CursorArrowRaysIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import { useContext } from "react";
import { useTranslation } from "react-i18next";
import StojkaMenu from "./strojka-menu";

import {
  TransformComponent,
  TransformWrapper,
  useControls,
} from "react-zoom-pan-pinch";
import { StrojkaContext } from "./StrojkaProvider";
import StojkaMenuTest from "./strojka-menu-test";

export type Pane = "start" | "dead" | "tree" | "memories" | "words" | "april";

export default function StojkaContent() {
  const { t } = useTranslation();

  const stojkaContext = useContext(StrojkaContext);

  function ImageLink(props: { sel: Pane }): JSX.Element {
    const { sel } = props;
    return (
      <div
        className="size-full border cursor-pointer relative"
        onClick={(e) => {
          stojkaContext?.updatePane(sel);
          const element = document.getElementById(`${sel}-content`);
          element?.scrollIntoView();
        }}
      >
        <Image
          src={`assets/${sel}.png`}
          alt={"Apruk"}
          fill={true}
          style={{ objectFit: "cover" }}
        />
        <CursorArrowRaysIcon
          width={35}
          height={35}
          className="absolute bottom-1 right-1 text-white"
        />
      </div>
    );
  }

  const data: Record<Pane, { title: string; text: string }> = {
    dead: {
      title: "Bergen Belsen",
      text: "Credit: Ceija Stojka, Bergen Belsen (Ink on paper, 2003). Courtesy: Stiftung Kai Dikhas. Photo: Diego Castellano.",
    },
    tree: {
      title: "Wer hat meinen Baum gefällt",
      text: "Credit: Ceija Stojka, Wer hat meinen Baum gefällt (Acrylic on cardboard, 1996). Courtesy: Stiftung Kai Dikhas. Photo: Diego Castellano.",
    },
    memories: {
      title: "Extract from: Unter den Brettern hellgrünes Gras",
      text: "Extract from: Unter den Brettern hellgrünes Gras / Regie: Karin Berger / Produktion: Navigator Film.",
    },
    april: {
      title:
        "Der 15. April 1945. Noch wussten wir nicht, dass dieser Tag unser Freiheitstag war. So war es. ",
      text: "Credit: Ceija Stojka, Der 15. April 1945. Noch wussten wir nicht, dass dieser Tag unser Freiheitstag war. So war es. (Mixed media on paper, 2004). Courtesy: Stiftung Kai Dikhas. Photo: Diego Castellano.",
    },
    start: { text: "", title: "" },
    words: { text: "", title: "" },
  };

  const isOffline = false;

  const Controls = () => {
    const { zoomIn, zoomOut, resetTransform } = useControls();

    return (
      <div className="tools flex justify-center p-2 gap-2">
        <button
          className="rounded-md bg-white px-2 border border-black"
          onClick={() => zoomIn()}
        >
          {t("zoomIn")} <span className="font-bold">+</span>
        </button>
        <button
          className="rounded-md bg-white px-2 border border-black"
          onClick={() => zoomOut()}
        >
          {t("zoomOut")} <span className="font-bold">-</span>
        </button>
        <button
          className="rounded-md bg-white px-2 border border-black"
          onClick={() => resetTransform()}
        >
          {t("reset")}
        </button>
      </div>
    );
  };

  interface ElementProps {
    sel?: Pane | null;
  }

  const Element = (props: ElementProps) => {
    const { sel = null } = props;

    let imgFile = "";
    switch (sel) {
      case "memories":
        if (isOffline) {
          return (
            <div className="size-full relative">
              <video
                loop
                src="assets/ExtractCeijaStojkaGreenGreenGrass.mp4"
                autoPlay={true}
                // poster="https://user-images.githubusercontent.com/28612032/172026551-e5a96748-d724-4a08-b6b3-f44655d4ef39.png"
                width="820"
                style={{ width: "100%", height: "100%", position: "absolute" }}
              >
                Sorry, your browser doesn't support embedded videos.
              </video>
            </div>
          );
        }
      case "dead":
      case "tree":
      case "april":
      case "words":
        imgFile = sel;
        console.log("sel", sel);

        if (sel === "words") {
          imgFile = "words2";
        }
        return (
          <div className="size-full border relative grid grid-rows-[1fr_auto]">
            <div className="size-full grid grid-rows-[min-content_min-content_1fr] grid-cols-[1fr] justify-center">
              <TransformWrapper
                initialScale={1}
                limitToBounds={true}
                centerOnInit={true}
              >
                {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
                  <>
                    <div className="text-2xl text-center p-2 pb-0 font-bold">
                      {data[sel]?.title}
                    </div>
                    <Controls />
                    <TransformComponent
                      wrapperStyle={{
                        width: "100%",
                        height: "100%",
                        position: "relative",
                      }}
                      contentStyle={{
                        width: "100%",
                        height: "100%",
                        position: "absolute",
                      }}
                    >
                      <img
                        src={`assets/${imgFile}.png`}
                        alt={"Words"}
                        style={{
                          objectFit: "contain",
                          width: "100%",
                          height: "100%",
                        }}
                      />
                    </TransformComponent>
                  </>
                )}
              </TransformWrapper>
            </div>
            <div className="text-sm text-center p-2">{data[sel]?.text}</div>
          </div>
        );

      default:
        return (
          <div className="size-full grid grid-cols-[1fr_1fr] grid-rows-[60%_auto] gap-4">
            <ImageLink sel="words" />
            <div className="size-full grid grid-cols-[1fr_1fr] grid-rows-[1fr] gap-4">
              <ImageLink sel="april" />
              <ImageLink sel="tree" />
            </div>
            <ImageLink sel="dead" />
            <ImageLink sel="memories" />
          </div>
        );
    }
  };

  return (
    <div className="relative size-full p-4">
      <div className="size-full grid grid-cols-[1fr] grid-rows-[min-content_1fr]">
        <div className="w-full flex justify-between items-center mb-2">
          {stojkaContext?.pane != null && stojkaContext?.pane != "start" ? (
            <div
              className="grid grid-flow-row border-2 border-black rounded-full grid-rows-1 grid-cols-[min-content_min-content] items-center hover:shadow-xl cursor-pointer bg-white shadow-md dark:text-black"
              onClick={(e) => {
                stojkaContext.updatePane("start");
                const element = document.getElementById(`start-content`);
                element?.scrollIntoView();
              }}
            >
              <ChevronLeftIcon width={32} height={32} />
              <div className="pr-4 font-bold text-lg">{t("reset")}</div>
            </div>
          ) : (
            <HomeButton />
          )}
          <div className="text-3xl font-bold">{t("strojka-title")}</div>
          <LanguageSwitcher />
        </div>
        <div className="size-full grid grid-cols-[75%_auto] grid-rows-[1fr] gap-4">
          <Element sel={stojkaContext?.pane} />
          <div className="size-full border relative">
            <StojkaMenu />
          </div>
        </div>
      </div>
    </div>
  );
}
