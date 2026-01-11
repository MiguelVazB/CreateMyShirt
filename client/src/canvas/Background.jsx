import { useRef } from "react";
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
      scale={2.8}
      rotation={[Math.PI / 2, 0, 0]}
    >
      <RandomizedLight
        amount={2}
        radius={9}
        intensity={1.2}
        ambient={0.25}
        position={[5, 5, -10]}
      />
      <RandomizedLight
        amount={2}
        radius={5}
        intensity={0.6}
        ambient={0.55}
        position={[-5, 5, -9]}
      />
    </AccumulativeShadows>
  );
};

export default Background;
