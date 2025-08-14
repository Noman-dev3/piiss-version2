"use client";

export const Preloader = () => {
  return (
    <div className="preloader">
      <div className="loader"></div>
      <p className="text-lg font-medium text-muted-foreground animate-pulse mt-4">
        Loading PIISS...
      </p>
    </div>
  );
};
