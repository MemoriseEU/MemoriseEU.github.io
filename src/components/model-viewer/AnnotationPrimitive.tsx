import React, { RefObject, Suspense, useEffect, useRef, useState } from "react";
import { Canvas, extend, useThree, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useGLTF, Html } from "@react-three/drei";

import useKeyboard from "../../utils/useKeyboard";
import { FPVControls } from "./FirstPersonControls";
import { Vector3 } from "three/src/Three.js";
// @ts-ignore:
import TWEEN from "@tweenjs/tween.js";

interface AnnotationPrimitiveProps {
  glbSrc: string;
  addAnnotation: (obj: Record<string, any>) => void;
  annotations: Record<string, any>[];
  controlRef: RefObject<any>;
  editor?: boolean;
  selectedAnnotation?: number;
}

export const AnnotationPrimitive = (props: AnnotationPrimitiveProps) => {
  const { glbSrc, addAnnotation, annotations, controlRef, editor } = props;

  const selectedAnnotation = props.selectedAnnotation ?? 0;

  const gltf = useGLTF(glbSrc, true);

  const { gl, scene, camera } = useThree();

  const createAnnotation = (
    cameraPosition: Vector3,
    cameraDirection: Vector3
  ) => {
    addAnnotation({
      title: "Title",
      description: "Test",
      camPos: { x: cameraPosition.x, y: cameraPosition.y, z: cameraPosition.z },
      lookAt: {
        x: cameraDirection.x,
        y: cameraDirection.y,
        z: cameraDirection.z,
      },
    });
  };

  useEffect(() => {
    ((index: number) => {
      if (controlRef.current) {
        zoomToPoint(
          camera.position,
          controlRef.current.target,
          annotations[index]
        );
      }
    })(selectedAnnotation);
  }, [selectedAnnotation, annotations, camera.position, controlRef]);

  console.log(annotations);

  const zoomToPoint = (
    i_camera: Vector3,
    target: Vector3,
    a: Record<string, any>
  ) => {
    if (i_camera && target && a) {
      new TWEEN.Tween(target)
        .to(
          {
            x: a.lookAt.x,
            y: a.lookAt.y,
            z: a.lookAt.z,
          },
          1000
        )
        .easing(TWEEN.Easing.Cubic.Out)
        .start();

      // change camera position
      new TWEEN.Tween(i_camera)
        .to(
          {
            x: a.camPos.x,
            y: a.camPos.y,
            z: a.camPos.z,
          },
          1000
        )
        .easing(TWEEN.Easing.Cubic.Out)
        .start();
    }
  };

  function Tween() {
    useFrame(() => {
      TWEEN.update();
    });
  }

  return (
    <primitive
      object={gltf.scene}
      dispose={null}
      onClick={(e: any) => {
        if (editor) {
          if (e.intersections.length > 0) {
            let sorted = e.intersections.sort(
              (a: any, b: any) => a.distance - b.distance
            );
            createAnnotation(e.camera.position, sorted[0].point);
          }
        }
      }}
    >
      {annotations.map((a, i) => {
        return (
          <Html key={i} position={[a.lookAt.x, a.lookAt.y, a.lookAt.z]}>
            <svg
              height="34"
              width="34"
              transform="translate(-16 -16)"
              style={{ cursor: "pointer" }}
            >
              <circle
                cx="17"
                cy="17"
                r="16"
                stroke="white"
                strokeWidth="2"
                fill="rgba(0,0,0,.66)"
                onPointerUp={() => {
                  zoomToPoint(camera.position, controlRef.current.target, a);
                }}
              />
              <text
                x="12"
                y="22"
                fill="white"
                fontSize={17}
                fontFamily="monospace"
                style={{ pointerEvents: "none" }}
              >
                {i + 1}
              </text>
            </svg>
            {a.description && (
              <div
                id={"desc_" + i}
                className="annotationDescription"
                dangerouslySetInnerHTML={{ __html: a.description }}
              />
            )}
          </Html>
        );
      })}
      {
        // @ts-ignore:
        <Tween />
      }
    </primitive>
  );
};
