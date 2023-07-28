import React, { useRef } from "react";
import { easing } from "maath";
import { useFrame } from "@react-three/fiber";
import { AccumulativeShadows, RandomizedLight } from "@react-three/drei";

const Background = () => {
  const shadows = useRef(null);

  return (
    <AccumulativeShadows
      ref={shadows}
      position={[0, 0, -0.15]}
      temporal
      frames={60}
      alphaTest={0.85}
      scale={10}
      rotation={[Math.PI / 2, 0, 0]}
    >
      <RandomizedLight
        amount={4}
        radius={8}
        intensity={0.9}
        ambient={0.35}
        position={[5, 5, -10]}
      ></RandomizedLight>
    </AccumulativeShadows>
  );
};

export default Background;
