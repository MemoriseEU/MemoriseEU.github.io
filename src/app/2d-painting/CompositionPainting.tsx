"use client";

import { cloneElement, useContext, useEffect, useRef } from "react";
import MySVG from "../../../public/assets/6000px Ervin Abadi Perpective view B-B all duplicated layers 2.svg";
import { PaintingContext } from "./painting.context";
import SplitSvg from "./split-svg";

export default function CompositionPainting() {
  const svgRef = useRef(null);
  const paintingContext = useContext(PaintingContext);

  useEffect(() => {
    if (svgRef.current) {
      paintingContext?.updateSVGRef(svgRef);

      const layers = (svgRef.current as SVGSVGElement).querySelectorAll(
        ".layer"
      );

      if (layers) {
        if (
          paintingContext?.compositionLayers != null &&
          Object.keys(paintingContext?.compositionLayers).length === 0
        ) {
          const paintingLayers = {} as Record<string, any>;
          layers.forEach((l) => {
            paintingLayers[l.id as string] = {
              element: l.id,
              visible: true,
            };
          });

          paintingContext?.updateCompositionLayers(paintingLayers);
        } else {
          const contextLayers = paintingContext?.compositionLayers ?? {};
          layers.forEach((l) => {
            if (Object.keys(contextLayers).includes(l.id)) {
              /* l.setAttribute(
                "visibility",
                contextLayers[l.id].visible ? "visible" : "hidden"
              ); */
              if (contextLayers[l.id].visible) {
                l.classList.remove("m-fadeOut");
                l.classList.add("m-fadeIn");
              } else {
                l.classList.remove("m-fadeIn");
                l.classList.add("m-fadeOut");
              }
            }
          });
        }
      }
    }
  }, [paintingContext?.mode, paintingContext?.compositionLayers]);

  useEffect(() => {
    paintingContext?.updateCompositionLayers({});
  }, []);

  return (
    <div
      ref={svgRef}
      className="size-full flex p-2 justify-center m-fadeIn absolute"
    >
      <MySVG className={`size-full painting object-contain`} />
      {/* <SplitSvg /> */}
    </div>
  );
}
