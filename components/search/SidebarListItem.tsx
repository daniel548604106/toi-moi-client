import React from 'react';

interface SidebarListItemProps {
  Icon: any;
  title: string;
  active: boolean;
}

const SidebarListItem = (props: SidebarListItemProps) => {
  const { Icon, title, active } = props;
  return (
    <div
      className={` ${
        active && 'bg-blue-200 text-secondary'
      } flex items-center rounded-md p-2 hover:bg-gray-100`}
    >
      <span className={`cursor-pointer rounded-full bg-gray-200 p-2 ${active && 'bg-main'}`}>
        <Icon className="h-6" />
      </span>
      <span className="ml-[10px]">{title}</span>
    </div>
  );
};

export default SidebarListItem;
