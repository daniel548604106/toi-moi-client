import router from 'next/router';
import React, { useRef } from 'react';

interface SidebarListItemProps {
  Icon: any;
  title: string;
  link: string;
}

const SidebarListItem = ({ Icon, title, link }: SidebarListItemProps) => {
  const active = router.pathname.includes(link);
  const handleClick = (e) => {
    router.push(`/friends/${link}`, undefined, { shallow: true });
    console.log('clicked');
  };
  return (
    <div
      onClick={(e) => handleClick(e)}
      className={`flex cursor-pointer items-center p-3 py-2 ${active && 'text-main'}`}
    >
      <span
        className={`mr-3 rounded-full p-1 sm:p-2  ${
          active ? 'bg-main text-white' : 'bg-button text-secondary'
        }`}
      >
        <Icon className="h-5 sm:h-6" />
      </span>
      <p className="sm:text-md text-sm">{title}</p>
    </div>
  );
};

export default SidebarListItem;
