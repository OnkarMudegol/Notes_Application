// src/components/Loader.js
import React from 'react';
import './Loader.css';

function Loader() {
  return (
    <div className="loader-overlay">
      <div className="loader-content">
        <h1 className="logo">
          takenotes in 123!
        </h1>
      </div>
    </div>
  );
}

export default Loader;