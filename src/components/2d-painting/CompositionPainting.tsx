"use client";

import { cloneElement, useContext, useEffect, useRef } from "react";
import MySVG from "../../../public/assets/people.svg";
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
              l.setAttribute(
                "visibility",
                contextLayers[l.id].visible ? "visible" : "hidden"
              );
            }
            /* paintingLayers[l.id as string] = {
              element: l.id,
              visible: false,
            }; */
          });
        }
      }
    }
  }, [paintingContext?.mode, paintingContext?.compositionLayers]);

  return (
    <div ref={svgRef} className="size-full flex justify-center p-2">
      <MySVG className={`h-full w-auto`} />
      {/* <SplitSvg /> */}
    </div>
  );
}
