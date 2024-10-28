"use client";

import { useContext } from "react";
import ReactPlayer from "react-player";
import { PaintingContext } from "./painting.context";

export default function MovieViewer() {
  return (
    <div className="size-full flex justify-center items-center">
      <ReactPlayer
        playing={true}
        url="https://www.youtube.com/watch?v=LXb3EKWsInQ"
        width="100%"
        height="100%"
      />
    </div>
  );
}
