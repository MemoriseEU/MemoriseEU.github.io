"use client";

import Painting from "@/components/2d-painting/2d-painting";
import { useContext, useEffect, useMemo } from "react";
import MovieViewer from "./MovieViewer";
import { PaintingContext } from "./painting.context";
import CompositionPainting from "./CompositionPainting";

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
          <div className="flex h-full justify-center">
            <img
              className="h-full w-auto"
              src="assets/CM_1992.193.39_001.jpg"
            ></img>
          </div>
        );
      default:
        return <Painting />;
    }
  }, [paintingContext?.mode]);

  return <div className="h-full overflow-hidden">{content}</div>;
}
