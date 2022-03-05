import React from 'react';

import { PlusCircleIcon } from '@heroicons/react/solid';

interface AddNewButtonProps {
  title: string;
}

const AddNewButton = ({ title }: AddNewButtonProps) => {
  return (
    <div className="w-full flex items-center justify-center text-main cursor-pointer  p-3 rounded-lg border">
      <PlusCircleIcon className="h-6" />
      <span className="ml-[10px] text-sm">{title}</span>
    </div>
  );
};
export default AddNewButton;
