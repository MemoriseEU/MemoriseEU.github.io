import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense, useRef } from "react";

import { AnnotationPrimitive } from "./AnnotationPrimitive";
import { FPVControls } from "./FirstPersonControls";

interface ThreeJSModelProps {
  glbSrc: string;
  editor: boolean;
  annotations?: Record<string, any>[];
  selectedAnnotation?: number;
  createAnnotation?: (annotation: Record<string, any>) => void;
  setSelectedAnnotation?: (index: number) => void;
}

export const ThreeJSModel = (props: ThreeJSModelProps) => {
  const {
    glbSrc,
    editor,
    selectedAnnotation,
    createAnnotation,
    setSelectedAnnotation,
  } = props;

  const annotations = props.annotations ?? [];

  const controlRef = useRef();

  return (
    <Canvas id="editorCanvas">
      <Suspense fallback={null}>
        <ambientLight intensity={1.0} />
        <AnnotationPrimitive
          editor={editor}
          glbSrc={glbSrc}
          addAnnotation={createAnnotation}
          annotations={annotations}
          controlRef={controlRef}
          selectedAnnotation={selectedAnnotation ?? 0}
          setSelectedAnnotation={setSelectedAnnotation}
        />
        {editor ? (
          <FPVControls controlRef={controlRef} editor={editor} />
        ) : (
          // @ts-ignore:
          <OrbitControls ref={controlRef} />
        )}
      </Suspense>
    </Canvas>
  );
};
