import { Navbar } from "@/components/ui/Navbar";
import Image from "next/image";
import {
  RefObject,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { PaintingContext } from "./painting.context";
import SplitSvg from "./split-svg";
import { EyeSlashIcon } from "@heroicons/react/24/solid";
import explorationDataEn from "../locales/en/translation.json";
import { InView } from "react-intersection-observer";
import { Button } from "./ButtonRow";
import { useTranslation } from "react-i18next";
import { CursorArrowRaysIcon, FilmIcon } from "@heroicons/react/24/outline";
import { usePlausible } from "next-plausible";

export default function MenuBand() {
  const paintingContext = useContext(PaintingContext);
  const plausible = usePlausible();

  const { t } = useTranslation();

  const containerRef = useRef<HTMLElement>(null);

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
  }, []);

  const [explorationData, movieData] = useMemo(() => {
    return [
      explorationDataEn["detail-mode"] as Record<string, any>,
      explorationDataEn["movies"] as Record<string, any>,
    ];
  }, [explorationDataEn]);

  const sortedExplorationKeys = useMemo(() => {
    return Object.keys(explorationData).sort((a, b) => {
      return explorationData[a].sort - explorationData[b].sort;
    });
  }, [explorationData]);

  const sortedMovieKeys = useMemo(() => {
    return Object.keys(movieData).sort((a, b) => {
      return parseInt(a) - parseInt(b);
    });
  }, [movieData]);

  const setInView = (inView: boolean, entry: IntersectionObserverEntry) => {
    //console.log(entry, itemRefs);

    if (inView) {
      const selID = entry.target.getAttribute("data-elementid");
      paintingContext!.updateStoryElement(selID);
    }
  };

  const content = useMemo(() => {
    if (paintingContext?.mode === "default") {
      return (
        <div
          className={`grid gap-2 h-full w-full grid-cols-2 md:grid-cols-[80%] grid-rows-1 md:grid-rows-[1fr_1fr] absolute justify-center`}
        >
          {sortedMovieKeys.map((k: string, i) => {
            const e = movieData[k];
            return (
              <div
                key={`movie-link-${i}`}
                className="size-full relative justify-center text-center grid"
              >
                <div
                  key={`movie-text-${i}`}
                  className="flex justify-center text-xl w-full text-white items-end"
                >
                  <span
                    style={{
                      filter:
                        "drop-shadow(0 1px 2px rgb(0 0 0 / 0.8)) drop-shadow(0 1px 1px rgb(0 0 0 / 0.6))",
                    }}
                  >
                    {t(`movies.${k}.topic`)}
                  </span>
                </div>
                <div className="size-full relative">
                  <Image
                    key={`${i}-image-link`}
                    alt={`${e.name}-${i}`}
                    src={e.image}
                    width={100}
                    height={100}
                    style={{
                      width: "100%",
                      height: "100%",
                      clipPath: "inset(4px 4px 4px 4px round 0px)",
                      objectFit: "cover",
                    }}
                    className="cursor-pointer"
                    onClick={() => {
                      paintingContext.updateMode("movie");
                      paintingContext.updateText(k);
                      paintingContext.updateImage(e.image);
                      paintingContext.updateStoryElement(e.link);
                    }}
                  />
                  <FilmIcon
                    width={35}
                    height={35}
                    className="absolute bottom-4 right-4"
                  />
                </div>
                <div
                  key={`movie-text-alternative-${i}`}
                  className="flex justify-center w-full text-white"
                >
                  <span
                    style={{
                      filter:
                        "drop-shadow(0 1px 2px rgb(0 0 0 / 0.8)) drop-shadow(0 1px 1px rgb(0 0 0 / 0.6))",
                    }}
                  >
                    {t(`movies.${k}.artist`)}: {t(`movies.${k}.title`)}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      );
    } else if (paintingContext?.mode === "movie") {
      return (
        <div className="items-center flex justify-center relative px-8 text-center">
          <div className="grid grid-rows-[auto_auto_auto] w-full p-5">
            {paintingContext.image && (
              <Image
                src={paintingContext.image}
                alt={paintingContext.text ?? ""}
                width={0}
                height={0}
                style={{ width: "100%", height: "auto", margin: "10px" }}
              />
            )}
            <div className="mb-3 font-bold text-xl">
              {t(`movies.${paintingContext?.text}.topic`)}
            </div>
            <div className="italic text-lg">
              {t(`movies.${paintingContext?.text}.title`)}
            </div>
            <div>by {t(`movies.${paintingContext?.text}.artist`)}</div>
          </div>
        </div>
      );
    } else if (paintingContext?.mode === "story") {
      return (
        <div className="flex size-full flex-wrap overflow-hidden overflow-y-scroll">
          <div className="flex justify-center items-center flex-col min-h-[101%] h-fit w-full text-center px-8">
            <div className="mb-3 md:text-xl font-bold">
              <Button color="blue">{t("story-mode.title")}</Button>
            </div>
            <div className="text-left text-sm md:text-base">
              {t("story-mode.text")}
            </div>
            <div className="relative mt-3">
              <div className="scroll-downs">
                <div className="mousey">
                  <div className="scroller"></div>
                </div>
              </div>
            </div>
          </div>
          {sortedExplorationKeys.map((e: string, i) => {
            return (
              <InView
                onChange={setInView}
                threshold={0}
                key={`${e}-element-${i}`}
              >
                {({ ref }) => {
                  return (
                    <div
                      key={`in-view-item-${i}`}
                      className="flex justify-center items-center flex-col min-h-[101%] h-fit w-full text-center px-8 py-28"
                      data-elementid={e}
                      ref={ref}
                    >
                      <div className="mb-3 md:text-xl font-bold">
                        <Button color="blue" imageIndex={i % 2}>
                          {t(`detail-mode.${e}.title`)}
                        </Button>
                      </div>
                      <div className="text-left text-sm md:text-base">
                        {t(`detail-mode.${e}.text`)}
                      </div>
                    </div>
                  );
                }}
              </InView>
            );
          })}
        </div>
      );
    } else if (paintingContext?.mode === "composition") {
      const layers = paintingContext.compositionLayers;
      return (
        <div className="grid grid-rows-[auto_1fr] h-full max-h-full w-full">
          <div className="grid grid-rows-[min_content_auto] text-center lg:px-8 z-[800]">
            <div className="mb-3 md:text-xl font-bold ">
              <Button color="blue">
                {t(`${paintingContext?.mode}-mode.title`)}
              </Button>
            </div>
            <div className="text-left text-sm md:text-base">
              {t(`${paintingContext?.mode}-mode.text`)}
            </div>
          </div>
          <div className="size-full">
            <div className="h-full max-h-full md:py-8 w-full relative flex justify-center">
              <div className="overflow-hidden overflow-y-scroll h-full max-h-full absolute">
                {Object.keys(layers).map((k, i) => {
                  const element = layers[k];
                  return (
                    <div
                      className={
                        "flex items-center w-full overflow-hidden justify-center mt-2"
                      }
                      key={`splittedSVG-${i}-wrapper`}
                    >
                      <div
                        onClick={(e) => {
                          const newLayers = { ...layers };
                          newLayers[k] = {
                            ...element,
                            visible: !element.visible,
                          };
                          paintingContext.updateCompositionLayers(newLayers);
                          plausible('updateCompositionLayers', {props: {"element": element.element, "visible": !element.visible} });
                        }}
                        className={`w-fit cursor-pointer relative ${
                          element.visible ? "opacity-100" : "opacity-50"
                        }`}
                      >
                        <SplitSvg
                          key={`splittedSVG-${i}`}
                          svgContainerRef={
                            paintingContext.svgRef as RefObject<HTMLDivElement>
                          }
                          layerID={element.element}
                        />
                        {element.visible === false && (
                          <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center">
                            <EyeSlashIcon
                              width={"50%"}
                              height={"50%"}
                              color="gray"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div
          key={`menu-band-item-${paintingContext?.mode}`}
          className="grid grid-rows-[1fr] h-full max-h-full overflow-hidden overflow-y-scroll absolute"
        >
          <div className="relative h-full md:py-8">
            <div className="flex justify-center items-center flex-col h-full w-full text-center px-8">
              <div className="mb-3 md:text-xl font-bold">
                <Button color="blue">
                  {t(
                    `${paintingContext?.mode}-mode${
                      paintingContext?.storyElement != null
                        ? "." + paintingContext?.storyElement
                        : ""
                    }.title`
                  )}
                </Button>
              </div>
              <div className="text-left text-sm md:text-base">
                {t(
                  `${paintingContext?.mode}-mode${
                    paintingContext?.storyElement != null
                      ? "." + paintingContext?.storyElement
                      : ""
                  }.text`
                )}
              </div>
              {paintingContext?.mode === "exploration" && (
                <div className="relative mt-3">
                  <Image
                    src="/images/prisoner.png"
                    alt="Guard"
                    width={25}
                    height={25}
                  />
                  <CursorArrowRaysIcon
                    width={45}
                    height={45}
                    className="absolute top-1/4 left-[-8px]"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      );
    }
  }, [movieData, paintingContext, t]);

  return (
    <div className="relative flex flex-col size-full" ref={parentRef}>
      <div
        style={{
          maxWidth: `${Math.round(dimensions.width)}px`,
          width: `${Math.round(dimensions.width)}px`,
          maxHeight: `${Math.round(dimensions.height)}px`,
          height: `${Math.round(dimensions.height)}px`,
        }}
      >
        {content}
      </div>
    </div>
  );
}
