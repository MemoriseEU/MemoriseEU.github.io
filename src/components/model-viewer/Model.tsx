"use client";

import "@google/model-viewer/lib/model-viewer";
import React, { ReactElement, createRef, useState } from "react";
import { Annotations } from "./Annotations";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "model-viewer": ModelViewerJSX &
        React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    }
  }
}

interface ModelViewerJSX {
  src: string;
  poster?: string;
  iosSrc?: string;
  seamlessPoster?: boolean;
  autoplay?: boolean;
  environmentImage?: string;
  exposure?: string;
  interactionPromptThreshold?: string;
  shadowIntensity?: string;
  ar?: boolean;
  arModes?: string;
  autoRotate?: boolean;
  cameraControls?: boolean;
  cameraOrbit?: string;
  alt?: string;
  sx?: any;
  class?: string;
  ref?: (HTMLDivElement & React.LegacyRef<HTMLElement>) | undefined;
}

interface ModelProps {
  glbSrc: string;
  children?: React.ReactNode;
}

const Model = (props: ModelProps) => {
  const { glbSrc, children } = props;

  const hotspotAnnotations = React.Children.toArray(children).filter(
    (child, i) => {
      return (child as ReactElement).props.className === "Hotspot";
    }
  );

  const [selectedAnnotation, setSelectedAnnotation] = useState<number>(0);

  const annotationClicked = (annotationIndex: number) => {
    let dataset = (hotspotAnnotations[annotationIndex] as ReactElement).props;
    if (ref.current) {
      ref.current.setAttribute("cameraTarget", dataset["data-target"]);
      ref.current.setAttribute("cameraOrbit", dataset["data-orbit"]);
      ref.current.setAttribute("fieldOfView", "45deg");
    }
  };

  const ref = createRef<HTMLDivElement>();

  const selectAnnotations = (newValue: number) => {
    let val = newValue % hotspotAnnotations.length;
    annotationClicked(val);
    setSelectedAnnotation(val);
  };

  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      <model-viewer
        ref={ref as (HTMLDivElement & React.LegacyRef<HTMLElement>) | undefined}
        src={glbSrc}
        seamless-poster
        environment-image="neutral"
        exposure="1.0"
        //interaction-prompt-threshold="0"
        shadow-intensity="1"
        //ar
        autoplay
        //ar-modes="webxr scene-viewer quick-look"
        //auto-rotate
        camera-controls
        //camera-orbit="0deg 90deg 0deg 8.37364m"
        alt="3D model"
        class="w-full h-full"
      >
        {React.Children.toArray(children).map((child, i) => {
          return React.cloneElement(child as ReactElement, {
            onClick: () => {
              annotationClicked(i);
            },
          });
        })}
      </model-viewer>
      <Annotations
        selectedAnnotation={selectedAnnotation}
        setSelectedAnnotation={selectAnnotations}
      >
        {React.cloneElement(
          React.Children.toArray(children)[selectedAnnotation] as ReactElement,
          {
            onClick: () => {
              annotationClicked(selectedAnnotation);
            },
            className: "",
          }
        )}
      </Annotations>
    </div>
  );
};

export default Model;
