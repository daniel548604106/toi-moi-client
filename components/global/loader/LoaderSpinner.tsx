import React from 'react';

const LoaderSpinner = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="loaderSpinner h-12 w-12 rounded-full border-4 border-t-4 border-gray-200 ease-linear"></div>
    </div>
  );
};

export default LoaderSpinner;
