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
import { AnnotationPrimitive } from "./AnnotationPrimitive";

interface ThreeJSModelProps {
  glbSrc: string;
  editor: boolean;
  annotations?: Record<string, any>[];
  selectedAnnotation?: number;
  createAnnotation?: (annotation: any) => void;
}

export const ThreeJSModel = (props: ThreeJSModelProps) => {
  const { glbSrc, editor, annotations, selectedAnnotation, createAnnotation } =
    props;

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
