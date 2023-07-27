import React, { useContext } from "react";
import { easing } from "maath";
import PageContext from "../context/PageContext";
import { useFrame } from "@react-three/fiber";
import { Decal, useGLTF, useTexture } from "@react-three/drei";

const Shirt = () => {
  const pageContext = useContext(PageContext);
  return <div>Shirt</div>;
};

export default Shirt;
