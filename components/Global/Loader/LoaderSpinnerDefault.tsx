import './Loader.module.css';

import React from 'react';

const LoaderSpinnerDefault = () => {
  return (
    <div className="cell">
      <div className="card">
        <span className="spinner-loader">Loading&#8230;</span>
      </div>
    </div>
  );
};

export default LoaderSpinnerDefault;
