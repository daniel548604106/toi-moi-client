import React from 'react';

import { useRouter } from 'next/router';

import SidebarListItem from '../Activity/SidebarListItem';

interface SidebarListProps {
  filterList: any;
}

const SidebarLIst = ({ filterList }: SidebarListProps) => {
  const router = useRouter();
  return (
    <div className="h-full border-r bg-secondary p-5 text-secondary">
      <div className="flex items-center">
        <span className="text-gray-400 ">{router.query.q}'s</span>
        <h2 className="ml-[5px] text-xl font-semibold">Search Result</h2>
      </div>
      <hr className="my-2" />
      <div>
        <h3 className="text-md my-2 font-semibold">Filter</h3>
        {filterList.map((list) => (
          <SidebarListItem
            key={list.title}
            param={list.param}
            title={list.title}
            Icon={list.Icon}
          />
        ))}
      </div>
    </div>
  );
};

export default SidebarLIst;
