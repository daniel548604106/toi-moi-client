import React from 'react';

import { ChevronDownIcon } from '@heroicons/react/outline';
import router from 'next/router';

interface SidebarListItemProps {
  Icon?: any;
  title: string;
  lists?: string[];
  param?: string;
}

const SidebarListItem = (props: SidebarListItemProps) => {
  const { Icon, title, lists, param } = props;
  const handleClick = () => {
    router.push(`/search/${param}?q=${router.query.q}`);
  };
  const isActive = router.query.type === param;
  return (
    <div
      onClick={() => handleClick()}
      className={`flex  cursor-pointer items-center justify-between rounded-md p-3 py-2 hover:bg-gray-100 ${
        isActive && 'bg-blue-100'
      }`}
    >
      <div className="flex items-center">
        <span
          className={`mr-[20px] rounded-full bg-gray-100 p-2 ${
            isActive && 'bg-main text-secondary'
          }`}
        >
          <Icon className="h-6" />
        </span>
        <span>{title}</span>
      </div>
      {lists && (
        <span className="rounded-full p-1 hover:bg-gray-100">
          <ChevronDownIcon className="h-6" />
        </span>
      )}
    </div>
  );
};

export default SidebarListItem;
