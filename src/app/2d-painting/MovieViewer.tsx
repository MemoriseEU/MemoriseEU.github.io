"use client";

import { useContext, useMemo } from "react";
import ReactPlayer from "react-player";
import { PaintingContext, VideoLinks } from "./painting.context";

export interface MovieViewerProps {
  selected?: string;
}

export default function MovieViewer(props: MovieViewerProps) {
  const { selected = null } = props;

  const isOffline = true;

  const paintingContext = useContext(PaintingContext);

  const content = useMemo(() => {
    if (paintingContext?.storyElement != null) {
      if (isOffline) {
        return (
          <video
            src={(paintingContext?.storyElement as VideoLinks).offline}
            autoPlay={true}
            loop
            // poster="https://user-images.githubusercontent.com/28612032/172026551-e5a96748-d724-4a08-b6b3-f44655d4ef39.png"
            width="820"
            style={{ width: "100%", height: "100%", position: "absolute" }}
          >
            Sorry, your browser doesn't support embedded videos.
          </video>
        );
      } else {
        return (
          <ReactPlayer
            playing={true}
            url={(paintingContext?.storyElement as VideoLinks).online}
            width="100%"
            height="100%"
          />
        );
      }
    }
  }, [isOffline, paintingContext]);

  return (
    <div className="size-full flex justify-center items-center relative">
      {content}
    </div>
  );
}
