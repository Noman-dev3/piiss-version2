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
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            // Use the current value of the ref inside the callback
            if (placeholderRef.current) {
              obs.unobserve(placeholderRef.current);
            }
          }
        });
      },
      { rootMargin: "0px 0px 200px 0px" } // Load 200px before it enters viewport
    );

    // Use the current value of the ref when starting to observe
    if (placeholderRef.current) {
      observer.observe(placeholderRef.current);
    }

    return () => {
      // Use the current value of the ref for cleanup
      if (placeholderRef.current) {
        observer.unobserve(placeholderRef.current);
      }
    };
  }, []);

  if (isVisible) {
    return <>{children}</>;
  }
  
  return <Skeleton ref={placeholderRef} className="w-full" style={{ height }} />;
};

export default LazyLoad;
