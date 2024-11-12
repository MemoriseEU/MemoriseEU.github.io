"use client";

import Painting from "@/app/2d-painting/2d-painting";
import { useContext, useEffect, useMemo, useRef, useState } from "react";
import MovieViewer from "./MovieViewer";
import { PaintingContext } from "./painting.context";
import CompositionPainting from "./CompositionPainting";
import Image from "next/image";

export default function MainContent() {
  const paintingContext = useContext(PaintingContext);

  useEffect(() => {
    if (paintingContext?.mode === "default") {
      paintingContext.updateCompositionLayers({});
    }
  }, [paintingContext?.mode]);

  const content = useMemo(() => {
    switch (paintingContext?.mode) {
      case "movie":
        return <MovieViewer />;
      case "exploration":
      case "story":
        return <Painting />;
      case "composition":
        return <CompositionPainting />;
      case "about":
        return (
          <div className="flex size-full justify-center absolute">
            <Image
              alt="original"
              fill={true}
              style={{
                objectFit: "contain",
              }}
              src="assets/ErvinAbadiOriginal.jpg"
            ></Image>
          </div>
        );
      default:
        return <Painting />;
    }
  }, [paintingContext?.mode]);

  return <div className="size-full overflow-hidden relative">{content}</div>;
}

{
  /* <div className="max-h-full grid grid-cols-1 grid-flow-rows gap-2 p-2 w-full z-[52] relative"></div>; 
  <div className="grid grid-rows-[1fr] h-full max-h-full overflow-hidden overflow-y-scroll absolute">
  */
}
