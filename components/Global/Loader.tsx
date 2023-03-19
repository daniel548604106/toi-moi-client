import React from 'react';

const Loader = () => {
  return (
    <div className="loaderBounce flex space-x-2 p-2 text-white">
      <div className="h-2 w-2 animate-bounce rounded-full bg-secondary text-white"></div>
      <div className="h-2 w-2 animate-bounce rounded-full bg-secondary text-white"></div>
      <div className="h-2 w-2 animate-bounce rounded-full bg-secondary text-white"></div>
    </div>
  );
};

export default Loader;
