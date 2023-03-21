import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

interface OverlayProps {
  children: React.ReactChild;
}

const Overlay = ({ children }: OverlayProps) => {
  const [showOverlay, setShowOverlay] = useState(false);

  useEffect(() => {
    setShowOverlay(true);

    return () => {
      setShowOverlay(false);
    };
  }, []);

  return ReactDOM.createPortal(
    <div
      className={`fixed top-0 left-0 z-50 flex h-screen w-screen items-center justify-center bg-black transition ease-in-out ${
        showOverlay ? 'bg-opacity-10' : 'bg-opacity-0'
      } `}
    >
      {showOverlay && children}
    </div>,

    document.body,
  );
};

export default Overlay;
