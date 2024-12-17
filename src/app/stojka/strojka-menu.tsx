"use client";

import { useContext, useEffect, useRef, useState } from "react";
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

  const scrollRef = useRef<HTMLDivElement>(null);
  const [root, setRoot] = useState<Element | null>(null);

  useEffect(() => {
    if (scrollRef.current) {
      setRoot(scrollRef.current);
    }
  }, []);

  // State to store dimensions of grid cells
  const [dimensions, setDimensions] = useState({
    width: 0,
    height: 0,
  });

  // Reference to the grid cell
  const parentRef = useRef(null);

  // Use effect to observe and set the dimensions dynamically
  useEffect(() => {
    const updateDimensions = () => {
      if (parentRef.current) {
        const rect = (parentRef.current as HTMLElement).getBoundingClientRect();
        setDimensions({
          width: rect.width,
          height: rect.height,
        });
      }
    };

    // Observe resize with ResizeObserver
    const observer = new ResizeObserver(() => updateDimensions());
    if (parentRef.current) observer.observe(parentRef.current);

    // Cleanup observer
    return () => {
      if (parentRef.current) observer.unobserve(parentRef.current);
    };
  }, [parentRef]);

  const Content = (props: ContentProps) => {
    const { pane = null } = props;

    if (pane === "start" || pane === null) {
      return (
        <div className="flex justify-center items-center flex-col border-b border-b-black">
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
        <div className="flex justify-center flex-col border-b border-b-black py-28">
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
    // <div className="grid grid-rows-[1fr] h-full max-h-full overflow-hidden overflow-y-scroll absolute">
    <div className="relative flex flex-colsize-full border p-6" ref={parentRef}>
      <div
        className="overflow-hidden overflow-y-scroll"
        style={{
          maxWidth: `${Math.round(dimensions.width)}px`,
          width: `${Math.round(dimensions.width - 50)}px`,
          maxHeight: `${Math.round(dimensions.height)}px`,
          height: `${Math.round(dimensions.height - 50)}px`,
        }}
      >
        {panes.map((e: string, i) => {
          return (
            <InView
              root={root}
              onChange={setInView}
              threshold={0}
              key={`${e}-element-${i}`}
            >
              {({ ref }) => {
                return (
                  <div
                    id={`${e}-content`}
                    key={`in-view-item-${i}`}
                    className="flex min-h-[101%]"
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
