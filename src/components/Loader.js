// src/components/Loader.js
import React from 'react';
import './Loader.css';

function Loader() {
  return (
    <div className="loader-overlay">
      <div className="loader-content">
        <h1 className="logo">
          <span className="pencil-icon">✏️</span> NOTE.me
        </h1>
        <div className="progress-bar">
          <div className="progress"></div>
        </div>
      </div>
    </div>
  );
}

export default Loader;