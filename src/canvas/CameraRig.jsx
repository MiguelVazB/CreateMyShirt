import React, { useContext, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { easing } from "maath";
import { PageContext } from "../context/PageContext";

const CameraRig = ({ children }) => {
  const pageContext = useContext(PageContext);

  const groupRef = useRef(null);

  return <group ref={groupRef}>{children}</group>;
};

export default CameraRig;
