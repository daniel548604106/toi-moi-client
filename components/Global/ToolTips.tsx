import React from 'react';

interface ToolTipsProps {
  children: React.ReactChild;
}

const ToolTips = ({ children }: ToolTipsProps) => {
  return (
    <div className="z-50 absolute  hidden text-secondary whitespace-nowrap bottom-0 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-80 rounded-lg p-2 px-5 text-xs">
      {children}
    </div>
  );
};

export default ToolTips;
