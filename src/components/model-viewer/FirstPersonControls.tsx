import { useFrame, useThree } from "@react-three/fiber";
import useKeyboard from "../../utils/useKeyboard";
import { PointerLockControls } from "@react-three/drei";
import { RefObject, createRef, useRef, useState } from "react";
import {
  Raycaster,
  Vector3,
  MeshBasicMaterial,
  BoxGeometry,
  Mesh,
} from "three";
import { create } from "domain";
import { distance } from "three/examples/jsm/nodes/Nodes.js";

interface FPVControlsProps {
  controlRef: RefObject<unknown>;
  editor?: boolean;
}

export const FPVControls = (props: FPVControlsProps) => {
  const { controlRef, editor } = props;

  const keyMap = useKeyboard();

  const { camera, gl, scene } = useThree();

  const sensitivity = 1.0;

  const [moveRight, setMoveRight] = useState<boolean>(false);
  const [moveLeft, setMoveLeft] = useState<boolean>(false);
  const [moveBackward, setMoveBackward] = useState<boolean>(false);
  const [moveForward, setMoveForward] = useState<boolean>(false);
  const [printPosition, setPrintPosition] = useState<boolean>(false);

  const geometry = new BoxGeometry(1, 1, 1);
  const material = new MeshBasicMaterial({ color: 0x00ff00 });
  const cube = new Mesh(geometry, material);
  cube.name = "PointerCube";
  scene.add(cube);

  useFrame((_, delta) => {
    let moveRight,
      moveLeft,
      moveForward,
      moveBackward,
      createAnnotation = false;

    keyMap["KeyD"] ? (moveRight = true) : (moveRight = false);
    keyMap["KeyA"] ? (moveLeft = true) : (moveLeft = false);
    keyMap["KeyW"] ? (moveForward = true) : (moveForward = false);
    keyMap["KeyS"] ? (moveBackward = true) : (moveBackward = false);
    keyMap["KeyP"] ? (createAnnotation = true) : (createAnnotation = false);

    let vector = new Vector3(0, 0, -1);
    vector = camera.localToWorld(vector);
    vector.sub(camera.position); // Now vector is a unit vector with the same direction as the camera

    const raycaster = new Raycaster(camera.position, vector);

    const intersects = raycaster.intersectObjects(
      scene.children.filter((e) => e.name !== "PointerCube")
    );

    let distance = 99999;

    if (intersects.length > 0) {
      for (let intersect of intersects) {
        if (intersect.distance < distance) {
          distance = intersect.distance;
        }
      }
    } else {
      distance = 99999;
    }

    let projectedVector = new Vector3(
      camera.position.x,
      camera.position.y,
      camera.position.z
    );

    projectedVector.add(
      camera
        .getWorldDirection(new Vector3(0, 0, 0))
        .normalize()
        .multiplyScalar(distance)
    );

    cube.position.x = projectedVector.x;
    cube.position.y = projectedVector.y;
    cube.position.z = projectedVector.z;

    if (moveRight && editor) {
      controlRef.current.moveRight(1);
    }

    if (moveLeft && editor) {
      controlRef.current.moveRight(-1);
    }

    if (moveForward && editor) {
      camera.position.add(
        camera
          .getWorldDirection(new Vector3(0, 0, 0))
          .normalize()
          .multiplyScalar(sensitivity)
      );
    }

    if (moveBackward && editor) {
      camera.position.add(
        camera
          .getWorldDirection(new Vector3(0, 0, 0))
          .normalize()
          .negate()
          .multiplyScalar(sensitivity)
      );
    }

    gl.render(scene, camera);
  });

  return (
    <>
      <PointerLockControls ref={controlRef} />
    </>
  );
};
