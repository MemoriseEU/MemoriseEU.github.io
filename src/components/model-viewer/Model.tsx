"use client";

import React, {
  Ref,
  forwardRef,
  useRef,
  createRef,
  useEffect,
  useState,
  ReactElement,
  ReactNode,
  ReactHTMLElement,
} from "react";
import "@google/model-viewer/lib/model-viewer";
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

  useEffect(() => {
    annotationClicked(selectedAnnotation);
  }, [selectedAnnotation]);

  console.log(hotspotAnnotations);

  const ref = createRef<HTMLDivElement>();

  const annotationClicked = (annotationIndex: number) => {
    /* let dataset = hotspotAnnotations[annotationIndex].dataset;
    ref.current.cameraTarget = dataset.target;
    ref.current.cameraOrbit = dataset.orbit;
    ref.current.fieldOfView = "45deg"; */
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
        {children}
      </model-viewer>
      <Annotations
        selectedAnnotation={selectedAnnotation}
        setSelectedAnnotation={setSelectedAnnotation}
      />
    </div>
  );
};

export default Model;
