import Image from 'next/image';
import router from 'next/router';
import React from 'react';

interface SidebarListItemProps {
  Icon?: any;
  src?: string;
  title: string;
  link?: string;
}
const SidebarListItem = (props: SidebarListItemProps) => {
  const { Icon, src, title, link } = props;
  return (
    <div>
      {Icon ? (
        <div className="flex cursor-pointer items-center rounded-lg p-2 hover:bg-gray-200 sm:p-4 sm:py-3 ">
          <Icon className="h-8 w-8 text-main " />
          <p className="sm:text-md ml-3 text-sm font-medium sm:inline-flex">{title}</p>
        </div>
      ) : (
        <div
          onClick={() => router.push(`/${link}`)}
          className="flex cursor-pointer items-center rounded-lg p-2 hover:bg-gray-200 sm:p-4 sm:py-3 "
        >
          <img alt={title} className="h-[35px] w-[35px] rounded-full" src={src} />
          <p className="sm:text-md ml-3 text-sm font-medium sm:inline-flex">{title}</p>
        </div>
      )}
    </div>
  );
};

export default SidebarListItem;
