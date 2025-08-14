"use client";

import React, { useState, useRef, useEffect } from "react";
import { Skeleton } from "./ui/skeleton";

interface LazyLoadProps {
  children: React.ReactNode;
  height?: string;
}

const LazyLoad: React.FC<LazyLoadProps> = ({ children, height = "80vh" }) => {
  const [isVisible, setIsVisible] = useState(false);
  const placeholderRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const node = placeholderRef.current; // Capture the current ref value

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            if (node) {
              obs.unobserve(node);
            }
          }
        });
      },
      { rootMargin: "0px 0px 200px 0px" } // Load 200px before it enters viewport
    );

    if (node) {
      observer.observe(node);
    }

    return () => {
      if (node) {
        observer.unobserve(node);
      }
    };
  }, []); // The effect only needs to run once

  if (isVisible) {
    return <>{children}</>;
  }
  
  return <Skeleton ref={placeholderRef} className="w-full" style={{ height }} />;
};

export default LazyLoad;
