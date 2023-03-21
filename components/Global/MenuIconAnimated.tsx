import React from 'react';

interface MenuIconAnimatedProps {
  onClick: () => void;
  isOpen: boolean;
}

const MenuIconAnimated = ({ onClick, isOpen }: MenuIconAnimatedProps) => {
  return (
    <button
      className={`focus:outline-none relative h-6 w-6 rounded-sm ${
        isOpen ? 'fixed z-menu text-main' : 'text-primary'
      }`}
      onClick={() => {
        onClick();
      }}
    >
      <div className="absolute left-1/2 top-1/2 block w-5 -translate-x-1/2 -translate-y-1/2 transform">
        <span
          aria-hidden="true"
          className={`absolute block h-0.5 w-5 transform bg-current transition duration-500 ease-in-out ${
            isOpen ? 'rotate-45' : '-translate-y-1.5'
          }`}
        ></span>
        <span
          aria-hidden="true"
          className={`absolute block  h-0.5 w-5 transform  bg-current transition duration-500 ease-in-out ${
            isOpen && 'opacity-0'
          }`}
        ></span>
        <span
          aria-hidden="true"
          className={`absolute block  h-0.5 w-5 transform bg-current transition duration-500 ease-in-out ${
            isOpen ? '-rotate-45' : 'translate-y-1.5'
          }`}
        ></span>
      </div>
    </button>
  );
};

export default MenuIconAnimated;
