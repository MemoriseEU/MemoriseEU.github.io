"use client";

import "@google/model-viewer/lib/model-viewer";
import React, {
  JSXElementConstructor,
  ReactElement,
  RefObject,
  createRef,
  useMemo,
  useState,
} from "react";
import { Annotations } from "./Annotations";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "model-viewer": ModelViewerJSX;
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
  cameraTarget?: string;
  fieldOfView?: string;
  alt?: string;
  sx?: any;
  class?: string;
  ref?: RefObject<ModelViewerJSX>;
  children?: ReactElement<any, string | JSXElementConstructor<any>>[];
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
      ref.current.cameraTarget = dataset["data-target"];
      ref.current.cameraOrbit = dataset["data-orbit"];
      ref.current.fieldOfView = "45deg";
    }
    setSelectedAnnotation(annotationIndex);
  };

  const ref = createRef<ModelViewerJSX>();

  const selectAnnotations = (newValue: number) => {
    let val = newValue % hotspotAnnotations.length;
    annotationClicked(val);
  };

  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      <model-viewer
        ref={ref}
        src={glbSrc}
        seamless-poster
        environment-image="neutral"
        exposure="1.0"
        //interaction-prompt-threshold="0"
        interaction-prompt="none"
        shadow-intensity="1"
        min-camera-orbit="auto auto 0m"
        //ar
        autoplay
        //ar-modes="webxr scene-viewer quick-look"
        //auto-rotate
        camera-controls
        camera-orbit="0deg 90deg 0deg 8.37364m"
        alt="3D model"
        class="w-full h-full"
      >
        {React.Children.toArray(children).map((child, i) => {
          return React.cloneElement(child as ReactElement, {
            onClick: () => {
              annotationClicked(i);
            },
            className: `Hotspot ${i === selectedAnnotation ? "active" : ""}`,
          });
        })}
      </model-viewer>
      {children != null ? (
        <Annotations
          selectedAnnotation={selectedAnnotation}
          setSelectedAnnotation={selectAnnotations}
        >
          {React.cloneElement(
            React.Children.toArray(children)[
              selectedAnnotation
            ] as ReactElement,
            {
              onClick: () => {
                annotationClicked(selectedAnnotation);
              },
              className: "",
            }
          )}
        </Annotations>
      ) : (
        <></>
      )}
      {children != null ? (
        <div className="absolute top-2 text-sm right-8 annotationPanel rounded-2xl bg-slate-50 p-5">
          {React.cloneElement(
            React.Children.toArray(children)[
              selectedAnnotation
            ] as ReactElement,
            {
              onClick: () => {
                annotationClicked(selectedAnnotation);
              },
              className: "active Hotspot",
            }
          )}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Model;
