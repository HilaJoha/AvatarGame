// import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  Stats,
  useGLTF,
  useAnimations,
} from "@react-three/drei";
import { useEffect, useRef } from "react";
import useInput from "../hooks/useInput";
import Lights from "../components/Lights";
import Ground from "../components/Ground";
import Trees from "../components/Trees";

const MyPlayer = () => {
  const { forward, backward, left, right, jump, shift } = useInput();
  const player = useGLTF("./models/player2.glb");
  console.log("Available animations: ", player.animations, player.scene);

  const { actions } = useAnimations(player.animations, player.scene);

  player.scene.scale.set(1.5, 1.5, 1.5);

  player.scene.traverse((object) => {
    if (object.isMesh) {
      object.castShadow = true;
    }
  });

  const currentAction = useRef("");

  useEffect(() => {
    let action = "";
    if (forward || backward || left || right) {
      action = "walking";
      if (shift) {
        action = "running";
      }
    } else if (jump) {
      action = "jumping";
    } else {
      action = "Idle";
    }
    // actions?.Idle?.play();
    // console.log("forward: ", forward);
  }, [forward, backward, left, right, jump, shift]);

  return <primitive object={player.scene} />;
};

const App = () => {
  const testing = true;

  return (
    <div className="container">
      <Canvas shadows>
        {testing ? <Stats /> : null}
        {testing ? <axesHelper visible={testing} args={[2]} /> : null}
        {testing ? <gridHelper visible={testing} args={[10, 10]} /> : null}

        <OrbitControls />

        <Trees boundary={100} count={20} />
        <Lights />
        <MyPlayer />
        <Ground />
      </Canvas>
    </div>
  );
};

export default App;
