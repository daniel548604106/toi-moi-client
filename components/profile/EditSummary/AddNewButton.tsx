import React from 'react';

import { PlusCircleIcon } from '@heroicons/react/solid';

interface AddNewButtonProps {
  title: string;
}

const AddNewButton = ({ title }: AddNewButtonProps) => {
  return (
    <div className="flex w-full cursor-pointer items-center justify-center rounded-lg  border p-3 text-main">
      <PlusCircleIcon className="h-6" />
      <span className="ml-[10px] text-sm">{title}</span>
    </div>
  );
};
export default AddNewButton;
