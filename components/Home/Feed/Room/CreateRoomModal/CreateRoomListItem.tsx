import React from 'react';

interface CreateRoomListItemProps {
  Icon: any;
  RightIcon: any;
  title: string;
  subtitle: string;
}

const CreateRoomListItem = (props: CreateRoomListItemProps) => {
  const { Icon, RightIcon, title, subtitle } = props;
  return (
    <div className="flex cursor-pointer items-center justify-between p-2">
      <div className="flex items-center">
        <span className="flex h-[50px] w-[50px] items-center justify-center rounded-full border">
          {Icon ? <Icon className="h-6" /> : <span className="text-lg sm:text-2xl">icon</span>}
        </span>
        <div className="ml-[10px]">
          <p>{title}</p>
          <p className="text-xs sm:text-sm">{subtitle}</p>
        </div>
      </div>
      <span className="rounded-full border p-2">
        <RightIcon className="h-6" />
      </span>
    </div>
  );
};

export default CreateRoomListItem;
