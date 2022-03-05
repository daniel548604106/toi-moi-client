import React, { useEffect, useRef, useState } from 'react';

import {
    CakeIcon, UserAddIcon, UserGroupIcon, UserIcon, UsersIcon
} from '@heroicons/react/outline';

import SidebarListItem from './SidebarListItem';

const Sidebar = () => {
  const scrollRef = useRef<HTMLDivElement>();
  const currentScrollPosition = useRef(0);
  const scrollOnClick = (e) => {
    if (currentScrollPosition?.current) {
      currentScrollPosition.current =
        e.target.getBoundingClientRect().left + scrollRef.current.scrollLeft - 56;

      scrollRef.current.scrollTo({
        left: e.target.getBoundingClientRect().left + scrollRef.current.scrollLeft - 56,
        top: 0,
        behavior: 'smooth',
      });
    }
  };
  useEffect(() => {
    console.log(currentScrollPosition);
    if (currentScrollPosition) {
      scrollRef.current.scrollTo({
        left: currentScrollPosition.current,
        top: 0,
        behavior: 'smooth',
      });
    }
  }, []);
  return (
    <div
      ref={scrollRef}
      className="flex  w-screen scrollbar-hide   items-center overflow-x-auto lg:fixed lg:left-0  lg:w-[300px] lg:h-screen lg:overflow-y-auto lg:pt-[60px]  whitespace-nowrap lg:flex-col lg:items-start p-1 lg:p-3  bg-secondary"
    >
      <h2 className=" text-lg mb-3 sm:text-2xl font-semibold hidden lg:block">Friend</h2>
      <div onClick={(e) => scrollOnClick(e)}>
        <SidebarListItem link="" Icon={UsersIcon} title="Home Page" />
      </div>
      <div onClick={(e) => scrollOnClick(e)}>
        <SidebarListItem link="suggestions" Icon={UserIcon} title="Suggestions" />
      </div>
      <div onClick={(e) => scrollOnClick(e)}>
        <SidebarListItem link="requests" Icon={UserAddIcon} title="Friend Requests" />
      </div>
      <div onClick={(e) => scrollOnClick(e)}>
        <SidebarListItem link="lists" Icon={UserGroupIcon} title="All Friends" />
      </div>
      <div onClick={(e) => scrollOnClick(e)}>
        <SidebarListItem link="birthdays" Icon={CakeIcon} title="Birthdays" />
      </div>
    </div>
  );
};

export default Sidebar;
