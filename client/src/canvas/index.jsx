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
      dpr={[1, 2]}
      performance={{ min: 0.5 }}
      gl={{
        preserveDrawingBuffer: false,
        useLegacyLights: false,
        antialias: true,
        powerPreference: "high-performance",
      }}
    >
      <ambientLight intensity={0.5} />
      <Environment preset="sunset" />

      <CameraRig>
        <Background />
        <Center>
          <Shirt />
        </Center>
      </CameraRig>
    </Canvas>
  );
};

export default MainCanvas;
