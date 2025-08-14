
"use client";

import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

const colors = [
  "hsl(var(--primary))",
  "hsl(var(--accent))",
  "#fde047", // yellow-300
  "#f87171", // red-400
  "#60a5fa", // blue-400
  "#4ade80", // green-400
];

const Cube = () => {
  const [cubeStyle, setCubeStyle] = useState({});

  useEffect(() => {
    const interval = setInterval(() => {
        const color = colors[Math.floor(Math.random() * colors.length)];
        setCubeStyle({ '--cube-color': color });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const faces = ["front", "back", "right", "left", "top", "bottom"];

  return (
    <div className="loader-container">
        <div className="cube" style={cubeStyle}>
        {faces.map((face) => (
            <div key={face} className={`cube__face cube__face--${face}`}>
            {[...Array(9)].map((_, i) => (
                <div
                key={i}
                className="cube__piece"
                style={{ backgroundColor: 'hsl(var(--primary))' }}
                />
            ))}
            </div>
        ))}
        </div>
    </div>
  );
};

export const Preloader = () => {
  return (
    <div className="preloader">
        <Cube />
        <p className="text-lg font-medium text-muted-foreground animate-pulse">Loading PIISS...</p>
    </div>
  );
};
