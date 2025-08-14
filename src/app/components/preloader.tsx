
"use client";

export const Preloader = () => {
  return (
    <div className="preloader">
      <div className="hypnotic-loader">
        <svg viewBox="0 0 100 100" className="circle-svg">
          <circle className="bg" cx="50" cy="50" r="45"></circle>
          <circle className="fg" cx="50" cy="50" r="45"></circle>
        </svg>
      </div>
      <p className="text-lg font-medium text-muted-foreground animate-pulse mt-4">
        Loading PIISS...
      </p>
    </div>
  );
};
