
"use client";

import * as THREE from "three";
import { useMemo, useRef, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { useTheme } from "next-themes";

const colors = [
  new THREE.Color("#87CEEB"), // primary
  new THREE.Color("#FFDAB9"), // accent
  new THREE.Color("#fde047"), // yellow-300
  new THREE.Color("#f87171"), // red-400
  new THREE.Color("#60a5fa"), // blue-400
  new THREE.Color("#4ade80"), // green-400
];

function LittleCube({ position }: { position: [number, number, number] }) {
  const ref = useRef<THREE.Mesh>(null!);
  const [color] = useState(
    () => colors[Math.floor(Math.random() * colors.length)]
  );

  return (
    <mesh ref={ref} position={position}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}

export function PuzzleCube() {
  const groupRef = useRef<THREE.Group>(null!);

  const cubes = useMemo(() => {
    const cubeArray: JSX.Element[] = [];
    const size = 3;
    const offset = (size - 1) / 2;

    for (let x = 0; x < size; x++) {
      for (let y = 0; y < size; y++) {
        for (let z = 0; z < size; z++) {
           const position: [number, number, number] = [
              (x - offset) * 1.1,
              (y - offset) * 1.1,
              (z - offset) * 1.1,
            ];
            cubeArray.push(<LittleCube key={`${x}-${y}-${z}`} position={position} />);
        }
      }
    }
    return cubeArray;
  }, []);

  useFrame((state, delta) => {
    groupRef.current.rotation.x += delta * 0.2;
    groupRef.current.rotation.y += delta * 0.2;
    groupRef.current.rotation.z += delta * 0.2;
  });

  return <group ref={groupRef}>{cubes}</group>;
}
