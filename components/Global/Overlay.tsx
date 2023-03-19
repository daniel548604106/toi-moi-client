import React from 'react';

interface OverlayProps {
  children: React.ReactChild;
}

const Overlay = ({ children }: OverlayProps) => {
  return (
    <div className="fixed  top-0 left-0 z-50 flex h-screen w-screen items-center justify-center bg-black bg-opacity-10">
      {children}
    </div>
  );
};

export default Overlay;
