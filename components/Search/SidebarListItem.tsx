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
      } flex items-center p-2 rounded-md hover:bg-gray-100`}
    >
      <span className={`p-2 rounded-full bg-gray-200 cursor-pointer ${active && 'bg-main'}`}>
        <Icon className="h-6" />
      </span>
      <span className="ml-[10px]">{title}</span>
    </div>
  );
};

export default SidebarListItem;
