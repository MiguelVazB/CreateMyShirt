import React, { useRef } from "react";
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
        amount={1}
        radius={9}
        intensity={0.9}
        ambient={0.25}
        position={[5, 10, -10]}
      />
      <RandomizedLight
        amount={1}
        radius={5}
        intensity={0.8}
        ambient={0.5}
        position={[-5, 5, -10]}
      />
    </AccumulativeShadows>
  );
};

export default Background;
