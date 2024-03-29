import React, { useState } from 'react';

import { ChevronDownIcon } from '@heroicons/react/outline';
import useTranslation from 'next-translate/useTranslation';
import Image from 'next/image';
import router from 'next/router';

import { useAppSelector } from '@/hooks/useAppRedux';

import genderAvatar from '@/utils/genderAvatar';

import SidebarListItem from './SidebarListItem';

const Sidebar = () => {
  const { t } = useTranslation('common');
  const userInfo = useAppSelector((state) => state.user.userInfo);
  const [isSeeMoreOpen, setSeeMoreOpen] = useState(false);
  const handleSeeMore = () => {
    setSeeMoreOpen(true);
  };
  return (
    <div className="top-[80px] max-w-[400px] text-secondary sm:sticky ">
      <div
        className="flex cursor-pointer items-center rounded-lg p-4 py-3 hover:bg-gray-200 "
        onClick={() => router.push(`/${userInfo.username}`)}
      >
        <Image
          width="60"
          height="60"
          alt="profile-image"
          className="h-[60px] w-[60px] rounded-full object-cover"
          src={userInfo.profileImage || genderAvatar(userInfo.gender)}
        />
        <p className=" ml-3 font-medium sm:inline-flex">{userInfo.name}</p>
      </div>
      <hr className="sm:hidden" />
      <SidebarListItem link="friends" src="/icons/friend.png" title={t('sidebar.friends')} />
      <SidebarListItem
        src="/icons/marketplace.png"
        link="marketplace/browse/all"
        title={t('sidebar.marketPlace')}
      />
      <SidebarListItem link="groups" src="/icons/group.png" title={t('sidebar.groups')} />
      <SidebarListItem link="saved" src="/icons/bookmark.png" title={t('sidebar.saved')} />
      <SidebarListItem link="fanpage" src="/icons/page.png" title={t('sidebar.fanPage')} />
      {isSeeMoreOpen ? (
        <>
          <SidebarListItem
            link="favorite"
            src="/icons/favorite.png"
            title={t('sidebar.favorite')}
          />
          <SidebarListItem link="events" src="/icons/event.png" title={t('sidebar.events')} />
        </>
      ) : (
        <div onClick={() => handleSeeMore()}>
          <SidebarListItem Icon={ChevronDownIcon} title={t('sidebar.seeMore')} />
        </div>
      )}
    </div>
  );
};

export default Sidebar;
