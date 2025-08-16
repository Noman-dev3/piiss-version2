
"use client";

import { Loader } from "./ui/loader";

export const Preloader = () => {
  return (
    <div className="preloader">
      <Loader text="Loading PIISS..."/>
    </div>
  );
};
