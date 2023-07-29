import React from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, Center } from "@react-three/drei";
import Shirt from "./Shirt";
import CameraRig from "./CameraRig";
import Background from "./Background";
import "./Canvas.css";

const MainCanvas = () => {
  return (
    <Canvas
      className="mainCanvas"
      shadows
      camera={{ position: [0, 0, 0], fov: 30 }}
      gl={{
        preserveDrawingBuffer: true,
        useLegacyLights: false,
      }}
    >
      <ambientLight intensity={0.5} />
      <Environment preset="city" />

      <CameraRig>
        <Background />
        <Center>
          <Shirt className="shirt" />
        </Center>
      </CameraRig>
    </Canvas>
  );
};

export default MainCanvas;
