
"use client";

import { Canvas } from "@react-three/fiber";
import { PuzzleCube } from "./puzzle-cube";

export const Preloader = () => {
  return (
    <div className="preloader">
      <div className="h-48 w-48">
        <Canvas>
          <ambientLight intensity={1.5} />
          <pointLight position={[10, 10, 10]} />
          <PuzzleCube />
        </Canvas>
      </div>
      <p className="text-lg font-medium text-muted-foreground animate-pulse">
        Loading PIISS...
      </p>
    </div>
  );
};
