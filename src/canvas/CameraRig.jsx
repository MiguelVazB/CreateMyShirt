import React, { useContext, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { easing } from "maath";
import { PageContext } from "../context/PageContext";

const CameraRig = ({ children }) => {
  const pageContext = useContext(PageContext);

  const groupRef = useRef();

  useFrame((state, delta) => {
    const resizeShirtLaptop = window.innerWidth <= 1260;
    const resizeShirtMobile = window.innerWidth <= 600;

    // position of shirt
    let shirtPosition = [-0.35, 0, 1.5];
    if (pageContext.intro) {
      if (resizeShirtLaptop) shirtPosition = [0, 0.15, 2];
      if (resizeShirtMobile) shirtPosition = [0, 0.2, 2.5];
    } else {
      if (resizeShirtMobile) shirtPosition = [0, 0, 2.5];
      else shirtPosition = [0, -0.05, 1.55];
    }

    easing.damp3(state.camera.position, shirtPosition, 0.25, delta);

    // model rotation
    easing.dampE(
      groupRef.current.rotation,
      [state.pointer.y / 10, -state.pointer.x / 5, 0],
      0.25,
      delta
    );
  });

  return <group ref={groupRef}>{children}</group>;
};

export default CameraRig;
