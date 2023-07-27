import React, { useContext } from "react";
import { easing } from "maath";
import { PageContext } from "../context/PageContext";
import { useFrame } from "@react-three/fiber";
import { Decal, useGLTF, useTexture } from "@react-three/drei";

const Shirt = () => {
  const pageContext = useContext(PageContext);
  const { nodes, materials } = useGLTF("./tshirt.glb");

  const logoTexture = useTexture("./threejsLogo.png");
  const fullTexture = useTexture("./threejsLogo.png");

  return (
    <group>
      <mesh
        castShadow
        geometry={nodes.T_Shirt_male.geometry}
        material={materials.lambert1}
        material-roughness={1}
        dispose={null}
      ></mesh>
    </group>
  );
};

export default Shirt;
