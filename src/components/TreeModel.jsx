import React, { useRef, useState } from "react";
import { useGLTF } from "@react-three/drei";

export default function TreeModel(props) {
  const { nodes, materials } = useGLTF("./models/Tree.glb");
  const [color, setColor] = useState("blue");
  return (
    <group {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]} scale={0.407}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cylinder_0.geometry}
          material={materials.tree_wood}
          scale={[1, 1, 6.687]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Icosphere_0.geometry}
          material={materials["leaf_green.003"]}
          position={[0.031, 1.99, 20.565]}
          scale={2.444}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Icosphere001_0.geometry}
          material={materials["leaf_green.004"]}
          position={[-12.058, 11.582, 18.505]}
          scale={2.444}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Icosphere002_0.geometry}
          material={materials["leaf_green.001"]}
          position={[-12.831, -4.373, 18.68]}
          scale={2.444}
        />
        <mesh
          onClick={() => setColor("yellow")}
          castShadow
          receiveShadow
          geometry={nodes.Icosphere003_0.geometry}
          material={materials.leaf_green}
          material-color={color}
          position={[13.319, 3.809, 20.565]}
          scale={2.444}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Icosphere004_0.geometry}
          material={materials["leaf_green.002"]}
          position={[5.025, -8, 16.588]}
          scale={2.444}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Icosphere005_0.geometry}
          material={materials["leaf_green.005"]}
          position={[1.938, 12.597, 17.613]}
          scale={2.444}
        />
      </group>
    </group>
  );
}

useGLTF.preload("./models/Tree.glb");
