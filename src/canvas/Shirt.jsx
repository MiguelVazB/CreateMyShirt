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
      >
        {pageContext.isFullTexture && (
          <Decal
            position={[0, 0, 0]}
            rotation={[0, 0, 0]}
            scale={1}
            map={fullTexture}
          ></Decal>
        )}
        {pageContext.isLogoTexture && (
          <Decal
            position={[0, 0.04, 0.15]}
            rotation={[0, 0, 0]}
            scale={0.15}
            map={logoTexture}
            anisotropy={16}
            depthTest={false}
            depthWrite={true}
          ></Decal>
        )}
      </mesh>
    </group>
  );
};

export default Shirt;
