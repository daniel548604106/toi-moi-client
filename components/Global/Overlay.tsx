import React from 'react';

interface OverlayProps {
  children: React.ReactChild;
}

const Overlay = ({ children }: OverlayProps) => {
  return (
    <div className="z-50  flex items-center justify-center bg-black bg-opacity-10 fixed top-0 left-0 w-screen h-screen">
      {children}
    </div>
  );
};

export default Overlay;
