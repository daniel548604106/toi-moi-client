import React, { ReactNode } from 'react';

interface CreateListItemProps {
  Icon: any;
  title: string;
  description: string;
}

const CreateListItem = ({ Icon, title, description }: CreateListItemProps) => {
  return (
    <div className="flex cursor-pointer items-center rounded-lg p-2 hover:bg-gray-100">
      <Icon className="h-10 rounded-full bg-gray-200 p-2" />
      <div className="ml-[10px]">
        <p className="text-md font-semibold">{title}</p>
        <p className="text-xs text-gray-400">{description}</p>
      </div>
    </div>
  );
};

export default CreateListItem;
