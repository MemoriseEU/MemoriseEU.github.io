import { PointerLockControls } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { RefObject, useState } from "react";
import {
  Mesh,
  MeshBasicMaterial,
  Raycaster,
  SphereGeometry,
  Vector3,
} from "three";
import useKeyboard from "../../utils/useKeyboard";

interface FPVControlsProps {
  controlRef: RefObject<any>;
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

  const geometry = new SphereGeometry(1, 32, 32);
  const material = new MeshBasicMaterial({ color: 0xffffff });
  const cube = new Mesh(geometry, material);
  cube.name = "PointerSphere";
  scene.add(cube);

  useFrame((_, delta) => {
    let moveRight,
      moveLeft,
      moveForward,
      moveBackward,
      createAnnotation = false;

    // @ts-ignore: type
    keyMap["KeyD"] ? (moveRight = true) : (moveRight = false);
    // @ts-ignore: type
    keyMap["KeyA"] ? (moveLeft = true) : (moveLeft = false);
    // @ts-ignore: type
    keyMap["KeyW"] ? (moveForward = true) : (moveForward = false);
    // @ts-ignore: type
    keyMap["KeyS"] ? (moveBackward = true) : (moveBackward = false);
    // @ts-ignore: type
    keyMap["KeyP"] ? (createAnnotation = true) : (createAnnotation = false);

    let vector = new Vector3(0, 0, -1);
    vector = camera.localToWorld(vector);
    vector.sub(camera.position); // Now vector is a unit vector with the same direction as the camera

    const raycaster = new Raycaster(camera.position, vector);

    const intersects = raycaster.intersectObjects(
      scene.children.filter((e) => e.name !== "PointerSphere")
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
