import React from 'react';

import { ChartSquareBarIcon, PhotographIcon, UsersIcon } from '@heroicons/react/outline';
import router from 'next/router';

import FilterListRow from '@/components/search/FilterListRow';
import SectionCard from '@/components/search/SectionCard';
import SidebarList from '@/components/search/SidebarList';

const SearchType = () => {
  const filterList = [
    {
      title: 'All',
      param: 'top',
      Icon: ChartSquareBarIcon,
    },
    {
      title: 'Posts',
      param: 'posts',
      Icon: PhotographIcon,
    },
    {
      title: 'People',
      param: 'people',
      Icon: UsersIcon,
    },
  ];
  return (
    <div className="fullBodyHeight flex flex-col md:flex-row">
      <div className="fullBodyHeight hidden w-full max-w-[360px] md:block">
        <SidebarList filterList={filterList} />
      </div>
      <div className="block md:hidden">
        <FilterListRow filterList={filterList} />
      </div>
      <div className="flex-1 py-7 px-3">
        {router.query.type === 'top' && (
          <div className="mx-auto w-full max-w-[700px]  space-y-3">
            <SectionCard title="People">hihi</SectionCard>
            <SectionCard title="Posts">hihi</SectionCard>
          </div>
        )}
        {router.query.type === 'posts' && <div className="mx-auto w-full max-w-[700px]">posts</div>}
        {router.query.type === 'people' && (
          <div className="mx-auto w-full max-w-[700px]">People</div>
        )}
      </div>
    </div>
  );
};

export default SearchType;
