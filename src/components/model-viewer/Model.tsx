"use client";

import React, {
  JSXElementConstructor,
  ReactElement,
  RefObject,
  createRef,
  useMemo,
  useState,
} from "react";
import { Annotations } from "./Annotations";
import { ThreeJSModel } from "./ThreeJSModel";

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
  inputSensitivity?: number;
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
  layout?: "split" | null;
  annotations?: Array<Record<string, any>>;
}

const Model = (props: ModelProps) => {
  const { glbSrc, children, layout, annotations } = props;

  const [editor, setEditor] = useState(false);

  const [hotspotAnnotations, setHotspotAnnotations] = useState(
    annotations ?? []
  );

  const [selectedAnnotation, setSelectedAnnotation] = useState<number>(0);

  const annotationClicked = (annotationIndex: number) => {
    setSelectedAnnotation(annotationIndex);
  };

  const createAnnotation = (annotation: Record<string, any>) => {
    const newAnnotations = hotspotAnnotations ? [...hotspotAnnotations] : [];
    newAnnotations.push(annotation);
    setHotspotAnnotations(newAnnotations);
  };

  const ref = createRef<ModelViewerJSX>();

  const selectAnnotations = (newValue: number) => {
    let val = newValue % hotspotAnnotations.length;

    if (val < 0) {
      val = hotspotAnnotations.length + val;
    }

    annotationClicked(val);
  };

  return (
    <div
      className={`w-full max-h-full ${
        layout === "split" ? "grid grid-cols-[70%_30%] overflow-hidden" : ""
      }`}
    >
      <div style={{ width: "100%", position: "relative" }}>
        <ThreeJSModel
          glbSrc={glbSrc}
          editor={editor}
          annotations={hotspotAnnotations}
          selectedAnnotation={selectedAnnotation}
          setSelectedAnnotation={setSelectedAnnotation}
          createAnnotation={createAnnotation}
        />
        {hotspotAnnotations != null &&
        hotspotAnnotations[selectedAnnotation] != null &&
        layout !== "split" ? (
          <div
            className="absolute bottom-6 w-full"
            onClick={(e) => e.preventDefault()}
          >
            <Annotations
              selectedAnnotation={selectedAnnotation}
              setSelectedAnnotation={selectAnnotations}
            >
              <div
                onClick={() => {
                  annotationClicked(selectedAnnotation);
                }}
                key={`Annotation${selectedAnnotation}`}
              >
                {hotspotAnnotations[selectedAnnotation].title}
              </div>
            </Annotations>
          </div>
        ) : (
          <></>
        )}
      </div>
      {layout === "split" && (
        <div className="relative pl-5 pr-5 overflow-hidden h-full max-h-full min-h-full">
          <label>Editor</label>
          <label className="switch">
            <input
              type="checkbox"
              checked={editor}
              onChange={(e) => setEditor(!editor)}
            />
            <span className="slider round"></span>
          </label>
          {editor && (
            <div>
              Click into the scene to add more annotations. <br />
              Fly via WASD keys and look around via mouse
            </div>
          )}
          {editor && (
            <div
              style={{
                width: "100%",
                maxHeight: "50%",
                height: "50%",
                overflow: "hidden",
                overflowY: "scroll",
                backgroundColor: "white",
                padding: "9px",
                border: "1px solid gray",
              }}
            >
              <textarea
                onChange={(e) => {
                  if (JSON.parse(e.target.value))
                    setHotspotAnnotations(JSON.parse(e.target.value));
                }}
                value={JSON.stringify(hotspotAnnotations, null, 2)}
                className="w-full h-full"
              />
            </div>
          )}
          {hotspotAnnotations != null &&
          hotspotAnnotations[selectedAnnotation] != null ? (
            <>
              <div className="w-full text-sm right-8 annotationPanel">
                <div className="active Hotspot">
                  <div>{hotspotAnnotations[selectedAnnotation].title}</div>
                  <div>
                    {hotspotAnnotations[selectedAnnotation].description}
                  </div>
                </div>
              </div>
              <div className="absolute bottom-8 w-full">
                <Annotations
                  selectedAnnotation={selectedAnnotation}
                  setSelectedAnnotation={selectAnnotations}
                >
                  <div
                    onClick={() => {
                      annotationClicked(selectedAnnotation);
                    }}
                    key={`Annotation${selectedAnnotation}`}
                  >
                    {hotspotAnnotations[selectedAnnotation].title}
                  </div>
                </Annotations>
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
      )}
    </div>
  );
};

export default Model;
