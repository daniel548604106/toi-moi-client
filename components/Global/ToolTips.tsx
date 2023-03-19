import React from 'react';

interface ToolTipsProps {
  children: React.ReactChild;
}

const ToolTips = ({ children }: ToolTipsProps) => {
  return (
    <div className="absolute bottom-0  left-1/2 z-50 hidden -translate-x-1/2 transform whitespace-nowrap rounded-lg bg-black bg-opacity-80 p-2 px-5 text-xs text-secondary">
      {children}
    </div>
  );
};

export default ToolTips;
