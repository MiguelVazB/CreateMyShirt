import React, { useContext, useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { easing } from "maath";
import { PageContext } from "../context/PageContext";

const CameraRig = ({ children }) => {
  const pageContext = useContext(PageContext);

  const groupRef = useRef();

  useEffect(() => {
    window.addEventListener("devicemotion", handleDeviceMotion);
    return () => {
      window.removeEventListener("devicemotion", handleDeviceMotion);
    };
  }, []);

  const handleDeviceMotion = (event) => {
    const rotationX = event.rotationRate.beta;
    const rotationY = event.rotationRate.gamma;

    const rotationValues = [rotationY / 10, -rotationX / 5, 0];

    easing.dampE(groupRef.current.rotation, rotationValues, 0.25, delta);
  };

  useFrame((state, delta) => {
    const resizeShirtLaptopLarge = window.innerWidth <= 1690;
    const resizeShirtLaptop = window.innerWidth <= 1260;
    const resizeShirtMobile = window.innerWidth <= 600;

    // position of shirt
    let shirtPosition = [-0.3, 0, 1.5];
    if (pageContext.intro) {
      if (resizeShirtLaptopLarge) shirtPosition = [-0.22, 0, 1.8];
      if (resizeShirtLaptop) shirtPosition = [0, 0.15, 2];
      if (resizeShirtMobile) shirtPosition = [0, 0.3, 2.8];
    } else {
      if (resizeShirtMobile) shirtPosition = [0, 0, 2.8];
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
