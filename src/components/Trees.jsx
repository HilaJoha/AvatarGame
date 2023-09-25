import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useState, useEffect } from "react";

const Trees = ({ boundary, count }) => {
  const model = useLoader(GLTFLoader, "/models/Tree.glb");
  const [trees, setTrees] = useState([]);

  model.scene.scale.set(1, 1, 1);

  model.scene.traverse((object) => {
    if (object.isMesh) {
      object.castShadow = true;
    }
  });

  const boxIntersect = (
    minAx,
    minAz,
    maxAx,
    maxAz,
    minBx,
    minBz,
    maxBx,
    maxBz
  ) => {
    let aLeftOfB = maxAx < minBx;
    let aRightOfB = minAx > maxBx;
    let aAboveB = minAz > maxBz;
    let aBelowB = maxAz < minBz;
    return !(aLeftOfB || aRightOfB || aAboveB || aBelowB);
  };

  const isOverlapping = (index, tree, treeArray) => {
    if (!tree || !tree.position) {
      // console.error("Invalid tree or tree position:", tree);
      return false;
    }

    const minTargetX = tree.position.x - tree.box / 2;
    const maxTargetX = tree.position.x + tree.box / 2;
    const minTargetZ = tree.position.z - tree.box / 2;
    const maxTargetZ = tree.position.z + tree.box / 2;

    for (let i = 0; i < index; i++) {
      if (treeArray[i] && treeArray[i].position) {
        const minChildX = treeArray[i].position.x - treeArray[i].box / 2;
        const maxChildX = treeArray[i].position.x + treeArray[i].box / 2;
        const minChildZ = treeArray[i].position.z - treeArray[i].box / 2;
        const maxChildZ = treeArray[i].position.z + treeArray[i].box / 2;

        if (
          boxIntersect(
            minTargetX,
            minTargetZ,
            maxTargetX,
            maxTargetZ,
            minChildX,
            minChildZ,
            maxChildX,
            maxChildZ
          )
        ) {
          // console.log("Content box overlapping!", tree.position);
          return true;
        }
      }
    }
    return false;
  };

  const newPosition = (box, boundary) => {
    return (
      boundary / 2 -
      box / 2 -
      (boundary - box) * (Math.round(Math.random() * 100) / 100)
    );
  };

  const updatePosition = (treeArray, boundary) => {
    treeArray.forEach((tree, index) => {
      do {
        tree.position.x = newPosition(tree.box, boundary);
        tree.position.z = newPosition(tree.box, boundary);
      } while (isOverlapping(index, tree, treeArray));
    });
    setTrees(treeArray);
  };

  useEffect(() => {
    const tempTrees = [];
    for (let i = 0; i < count; i++) {
      tempTrees.push({ position: { x: 0, z: 0 }, box: 1 });
    }
    updatePosition(tempTrees, boundary);
  }, [boundary, count]);

  return (
    <group rotation={[0, 4, 0]}>
      {trees.map((tree, index) => (
        <object3D key={index} position={[tree.position.x, 0, tree.position.z]}>
          <mesh scale={[tree.box, tree.box, tree.box]}>
            <boxGeometry />
            <meshStandardMaterial color={"blue"} wireframe />
          </mesh>
          <primitive object={model.scene.clone()} />
        </object3D>
      ))}
    </group>
  );
};

export default Trees;
