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
      default:
        return <Painting />;
    }
  }, [paintingContext?.mode]);

  return <div className="h-full">{content}</div>;
}
