import router from 'next/router';
import React from 'react';

import FilterListRow from '@/Components/Search/FilterListRow';
import SectionCard from '@/Components/Search/SectionCard';
import SidebarList from '@/Components/Search/SidebarList';
import { ChartSquareBarIcon, PhotographIcon, UsersIcon } from '@heroicons/react/outline';

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
    <div className="flex-col md:flex-row flex fullBodyHeight">
      <div className="w-full md:block hidden fullBodyHeight max-w-[360px]">
        <SidebarList filterList={filterList} />
      </div>
      <div className="md:hidden block">
        <FilterListRow filterList={filterList} />
      </div>
      <div className="flex-1 py-7 px-3">
        {router.query.type === 'top' && (
          <div className="w-full max-w-[700px] space-y-3  mx-auto">
            <SectionCard title="People">hihi</SectionCard>
            <SectionCard title="Posts">hihi</SectionCard>
          </div>
        )}
        {router.query.type === 'posts' && <div className="w-full max-w-[700px] mx-auto">posts</div>}
        {router.query.type === 'people' && (
          <div className="w-full max-w-[700px] mx-auto">People</div>
        )}
      </div>
    </div>
  );
};

export default SearchType;
