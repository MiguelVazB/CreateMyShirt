import React, { useContext } from "react";
import { easing } from "maath";
import { PageContext } from "../context/PageContext";
import { useFrame } from "@react-three/fiber";
import { Decal, useGLTF, useTexture } from "@react-three/drei";

const Shirt = () => {
  const pageContext = useContext(PageContext);
  const { nodes, materials } = useGLTF("./tshirt.glb");

  const logoTexture = useTexture(pageContext.logoTexture.logo);
  const textOverlay = useTexture(pageContext.textOverlay);

  useFrame((state, delta) =>
    easing.dampC(materials.lambert1.color, pageContext.shirtColor, 0.25, delta)
  );

  const groupState = JSON.stringify(pageContext);

  return (
    <group key={groupState}>
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
            map={logoTexture}
          ></Decal>
        )}
        {pageContext.isLogoTexture && (
          <Decal
            position={[pageContext.logoPos.x, pageContext.logoPos.y, 0.15]}
            rotation={[0, 0, pageContext.logoPos.rotation]}
            scale={pageContext.logoPos.size}
            map={logoTexture}
            anisotropy={16}
            depthTest={false}
            depthWrite={true}
          ></Decal>
        )}
        {pageContext.isTextOverlay && (
          <Decal
            position={[pageContext.textPos.x, pageContext.textPos.y, 0.1]}
            rotation={[0, 0, pageContext.textPos.rotation]}
            scale={pageContext.textPos.size}
            map={textOverlay}
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
