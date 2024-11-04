import { Navbar } from "@/components/ui/Navbar";
import Image from "next/image";
import { RefObject, useContext, useMemo, useRef } from "react";
import { PaintingContext } from "./painting.context";
import SplitSvg from "./split-svg";
import { EyeSlashIcon } from "@heroicons/react/24/solid";
import explorationData from "./explorationData";
import movieData from "./movieData";
import { InView } from "react-intersection-observer";
import { Button } from "./ButtonRow";

export default function MenuBandprops() {
  const paintingContext = useContext(PaintingContext);

  const containerRef = useRef<HTMLElement>(null);

  const sortedExplorationKeys = useMemo(() => {
    return Object.keys(explorationData).sort((a, b) => {
      return explorationData[a].sort - explorationData[b].sort;
    });
  }, []);

  const setInView = (inView: boolean, entry: IntersectionObserverEntry) => {
    //console.log(entry, itemRefs);

    if (inView) {
      const selID = entry.target.getAttribute("data-elementid");
      paintingContext!.updateStoryElement(selID);
    }
  };

  const content = useMemo(() => {
    if (paintingContext?.mode === "default") {
      return movieData.map((e, i) => {
        return (
          <div
            key={`${i}-movie-link`}
            className="items-center flex justify-center relative w-full"
          >
            <Image
              alt={e.name}
              src={e.image}
              width={0}
              height={0}
              sizes="100vw"
              style={{
                width: "auto",
                height: "100%",
                clipPath: "inset(4px 4px 4px 4px round 0px)",
              }}
              className="cursor-pointer"
              onClick={() => {
                paintingContext.updateMode("movie");
                paintingContext.updateText(e.topic, e.title);
                paintingContext.updateImage(e.image);
              }}
            />
          </div>
        );
      });
    } else if (paintingContext?.mode === "movie") {
      return (
        <div className="items-center flex justify-center relative px-8 text-center">
          {/* <div className="grid grid-flow-row grid-cols-2"> */}
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
            <div className="mb-3 font-bold">{paintingContext?.title}</div>
            <div>{paintingContext?.text}</div>
            {/* </div> */}
          </div>
        </div>
      );
    } else if (paintingContext?.mode === "story") {
      return (
        <div className="grid grid-rows-[1fr] h-full max-h-full overflow-hidden overflow-y-scroll absolute">
          <div className="relative h-[100vh] py-8">
            <div className="flex justify-center items-center flex-col h-full w-full text-center px-8">
              <div className="mb-3 text-xl font-bold">
                <Button color="blue">Story Mode</Button>
              </div>
              <div className="text-justify">
                Scroll in this area to discover the story of the painting and
                it's elements.
              </div>
            </div>
            {sortedExplorationKeys.map((e: string, i) => {
              return (
                <InView onChange={setInView} threshold={0.5} key={e}>
                  {({ ref }) => {
                    return (
                      <div
                        className="flex justify-center items-center flex-col h-full w-full text-center px-8"
                        data-elementid={e}
                        ref={ref}
                      >
                        <div className="mb-3 text-xl font-bold">
                          <Button color="blue" imageIndex={i % 3}>
                            {explorationData[e].title}
                          </Button>
                        </div>
                        <div className="text-justify">
                          {explorationData[e].text}
                        </div>
                      </div>
                    );
                  }}
                </InView>
              );
            })}
          </div>
        </div>
      );
    } else if (paintingContext?.mode === "composition") {
      const layers = paintingContext.compositionLayers;
      return (
        <div className="grid grid-rows-[1fr] h-full max-h-full w-full overflow-hidden overflow-y-scroll absolute">
          <div className="relative h-[100vh] py-8 w-full">
            <div className="grid grid-rows-[min_content_auto] text-center px-8">
              <div className="mb-3 text-xl font-bold">
                <Button color="blue">{paintingContext?.title}</Button>
              </div>
              <div className="text-justify">{paintingContext?.text}</div>
            </div>
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
                      newLayers[k] = { ...element, visible: !element.visible };
                      paintingContext.updateCompositionLayers(newLayers);
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
      );
    } else {
      return (
        <div className="items-center flex justify-center relative px-8 text-center w-full">
          <div className="grid grid-rows-[min_content_auto] w-full">
            <div className="mb-3 text-xl font-bold">
              {paintingContext?.title && (
                <Button color="blue">{paintingContext?.title}</Button>
              )}
            </div>
            <div className="text-justify">{paintingContext?.text}</div>
          </div>
        </div>
      );
    }
  }, [movieData, paintingContext]);

  return (
    <div className="h-full max-h-full grid grid-cols-1 grid-flow-rows gap-2 p-2 w-full z-[52] relative">
      {content}
    </div>
  );
}
