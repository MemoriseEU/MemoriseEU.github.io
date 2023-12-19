import React, {
  Suspense,
  useEffect,
  useMemo,
  useRef,
  useState,
  createRef,
} from "react";
import { Canvas, extend, useThree, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, Html } from "@react-three/drei";

import useKeyboard from "../../utils/useKeyboard";
import { FPVControls } from "./FirstPersonControls";
import { Easing, Tween } from "three/examples/jsm/libs/tween.module.js";
import { Vector3 } from "three/src/Three.js";
import { AnnotationPrimitive } from "./AnnotationContext";

interface ThreeJSModelProps {
  glbSrc: string;
  editor: boolean;
  annotations?: Record<string, any>[];
  selectedAnnotation?: number;
}

export const ThreeJSModel = (props: ThreeJSModelProps) => {
  const {
    glbSrc,
    editor,
    annotations: i_annotations,
    selectedAnnotation,
  } = props;

  const [annotations, setAnnotations] = useState(i_annotations);

  const createAnnotation = (annotation: Record<string, any>) => {
    const newAnnotations = annotations ? [...annotations] : [];
    newAnnotations.push(annotation);
    setAnnotations(newAnnotations);
  };

  const controlRef = useRef();

  return (
    <Canvas>
      <Suspense fallback={null}>
        <ambientLight intensity={1.0} />
        {editor ? (
          <FPVControls controlRef={controlRef} editor={editor} />
        ) : (
          <OrbitControls ref={controlRef} />
        )}
        <AnnotationPrimitive
          editor={editor}
          glbSrc={glbSrc}
          addAnnotation={createAnnotation}
          annotations={annotations}
          controlRef={controlRef}
          selectedAnnotation={selectedAnnotation ?? 0}
        />
      </Suspense>
    </Canvas>
  );
};
