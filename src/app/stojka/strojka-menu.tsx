"use client";

import HomeButton from "@/components/home-button";
import LanguageSwitcher from "@/components/language-switcher";
import { useContext, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { InView } from "react-intersection-observer";
import { StrojkaContext } from "./StrojkaProvider";
import { Pane } from "./strojka-content";

interface MenuProps {
  pane?: string | null;
}

export default function StojkaMenu(props: MenuProps) {
  const { pane } = props;
  const { t } = useTranslation();

  interface ContentProps {
    pane: string;
  }

  const Content = (props: ContentProps) => {
    const { pane = null } = props;

    if (pane === "start" || pane === null) {
      return (
        <div className="flex justify-center items-center flex-col h-full w-full px-8 min-h-[100vh] border-b border-b-black">
          <div key={`title-${pane}`} className="mb-3 text-xl font-bold">
            {t("stojka.start.title")}
          </div>
          <div key={`text-${pane}`} className="text-left">
            {t("stojka.start.text")}
          </div>
          <div key={`scroll-${pane}`} className="relative mt-3">
            <div className="scroll-downs">
              <div className="mousey">
                <div className="scroller"></div>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      const title = t(`stojka.${pane}.title`);
      const text = t(`stojka.${pane}.text`);
      return (
        <div className="p-8 border-b border-b-black py-32 min-h-[100vh]">
          <div key={`title-${pane}`} className="text-2xl py-2">
            {title}
          </div>
          <div key={`text-${pane}`}>
            {text.split("<BREAK>").map((e, i) => {
              const returnArray = [];
              const quoteSplit = e.split("<QUOTE>");
              const titleSplit = e.split("<TITLE>");
              const sourceSplit = e.split("<SOURCE>");

              if (titleSplit.length > 1) {
                for (const s of titleSplit) {
                  if (s.includes("</TITLE>")) {
                    returnArray.push(
                      <span
                        key={`title-replacement-${pane}-${i}`}
                        className="italic"
                      >
                        "{s.replace("</TITLE>", "")}"
                      </span>
                    );
                  } else {
                    returnArray.push(s);
                  }
                }
              }

              if (quoteSplit.length > 1) {
                for (const s of quoteSplit) {
                  if (s.includes("</QUOTE>")) {
                    returnArray.push(
                      <span
                        key={`quote-replacement-${pane}-${i}`}
                        className="italic text-gray-500"
                      >
                        "{s.replace("</QUOTE>", "")}"
                      </span>
                    );
                  } else {
                    returnArray.push(s);
                  }
                }
              }

              if (sourceSplit.length > 1) {
                for (const s of sourceSplit) {
                  if (s.includes("</SOURCE>")) {
                    returnArray.push(
                      <span
                        key={`source-replacement-${pane}-${i}`}
                        className="text-sm"
                      >
                        {s.replace("</SOURCE>", "")}
                      </span>
                    );
                  } else {
                    returnArray.push(s);
                  }
                }
              }

              if (
                titleSplit.length <= 1 &&
                quoteSplit.length <= 1 &&
                sourceSplit.length <= 1
              ) {
                returnArray.push(e);
              }

              return (
                <div key={`menu-item-${i}`} className="text-lg py-2">
                  {returnArray}
                </div>
              );
            })}
          </div>
        </div>
      );
    }
  };

  const panes = ["start", "words", "dead", "april", "memories", "tree"];

  const strojkaContext = useContext(StrojkaContext);

  const setInView = (inView: boolean, entry: IntersectionObserverEntry) => {
    if (inView) {
      const selID = entry.target.getAttribute("data-elementid") as Pane;
      strojkaContext!.updatePane(selID);
    }
  };

  return (
    <div className="grid grid-rows-[1fr] h-full max-h-full overflow-hidden overflow-y-scroll absolute">
      <div className="relative h-full py-8">
        {panes.map((e: string, i) => {
          return (
            <InView
              onChange={setInView}
              threshold={0.5}
              key={`${e}-element-${i}`}
            >
              {({ ref }) => {
                return (
                  <div
                    id={`${e}-content`}
                    key={`in-view-item-${i}`}
                    className="flex justify-center items-center flex-col w-full px-8"
                    data-elementid={e}
                    ref={ref}
                  >
                    <Content pane={e} />
                  </div>
                );
              }}
            </InView>
          );
        })}
      </div>
    </div>
  );
}
