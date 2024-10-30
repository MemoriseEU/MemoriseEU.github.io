import { Navbar } from "@/components/ui/Navbar";
import Image from "next/image";
import { RefObject, useContext, useMemo } from "react";
import { PaintingContext } from "./painting.context";
import SplitSvg from "./split-svg";
import { EyeSlashIcon } from "@heroicons/react/24/solid";

export default function MenuBandprops() {
  const paintingContext = useContext(PaintingContext);

  const links = [
    {
      id: "link1",
      name: "Link 1",
      link: "link-1",
      image: "/assets/Picture 1.jpg",
    },
    {
      id: "link2",
      name: "Link 2",
      link: "link-2",
      image: "/assets/Picture 2.jpg",
    },
    {
      id: "link3",
      name: "Link 3",
      link: "link-3",
      image: "/assets/Picture 3.jpg",
    },
    {
      id: "link4",
      name: "Link 4",
      link: "link-4",
      image: "/assets/Picture 4.jpg",
    },
  ];

  const content = useMemo(() => {
    if (paintingContext?.mode === "default") {
      return links.map((e) => {
        return (
          <div
            key={`${e.id}-link`}
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
                paintingContext.updateText(e.name, e.link);
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
    } else if (paintingContext?.mode === "composition") {
      const layers = paintingContext.compositionLayers;
      return (
        <>
          <div className="grid grid-rows-[min_content_auto] w-full text-center px-8">
            <div className="mb-3 text-xl font-bold">
              {paintingContext?.title}
            </div>
            <div className="text-justify">{paintingContext?.text}</div>
          </div>
          {Object.keys(layers).map((k, i) => {
            const element = layers[k];
            return (
              <div
                className={
                  "flex items-center w-full overflow-hidden justify-center"
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
                      <EyeSlashIcon width={"50%"} height={"50%"} color="gray" />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </>
      );
    } else {
      return (
        <div className="items-center flex justify-center relative px-8 text-center w-full">
          <div className="grid grid-rows-[min_content_auto] w-full">
            <div className="mb-3 text-xl font-bold">
              {paintingContext?.title}
            </div>
            <div className="text-justify">{paintingContext?.text}</div>
          </div>
        </div>
      );
    }
  }, [links, paintingContext]);

  return (
    <div className="h-full border-l-2 border-myorange grid grid-cols-1 grid-flow-rows gap-2 p-2 w-full z-[52]">
      {content}
    </div>
  );
}
