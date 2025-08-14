
"use client";

import React from 'react';

const FingerWaveLoader = () => {
  return (
    <div className="loader-container">
      <div className="hand">
        <div className="finger finger-1"></div>
        <div className="finger finger-2"></div>
        <div className="finger finger-3"></div>
        <div className="finger finger-4"></div>
        <div className="palm"></div>
        <div className="thumb"></div>
      </div>
    </div>
  );
};


export const Preloader = () => {
  return (
    <div className="preloader">
        <div className="wave-loader-wrapper">
             <FingerWaveLoader />
            <div className="loader-text">LOADING</div>
        </div>
    </div>
  );
};
