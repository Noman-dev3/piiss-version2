
"use client";

export const Preloader = () => {
  return (
    <div className="preloader">
      <div className="hourglass-loader">
        <div className="hourglass__top"></div>
        <div className="hourglass__bottom"></div>
        <div className="hourglass__line"></div>
      </div>
      <p className="text-lg font-medium text-muted-foreground animate-pulse mt-4">
        Loading PIISS...
      </p>
    </div>
  );
};
