"use client";

import Painting from "@/components/2d-painting/2d-painting";
import { useContext } from "react";
import MovieViewer from "./MovieViewer";
import { PaintingContext } from "./painting.context";

export default function MainContent() {
  const paintingContext = useContext(PaintingContext);

  return (
    <div className="size-full">
      {paintingContext?.mode === "movie" ? <MovieViewer /> : <Painting />}
    </div>
  );
}
