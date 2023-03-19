import React, { useRef, useState } from 'react';

import { BookmarkAltIcon, MenuIcon, PlayIcon, ShoppingCartIcon } from '@heroicons/react/outline';
import {
  BellIcon,
  ChatIcon,
  ChevronDownIcon,
  HomeIcon,
  PlusIcon,
  UserGroupIcon,
} from '@heroicons/react/solid';
import { AnimateSharedLayout } from 'framer-motion';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';

import { useAppDispatch, useAppSelector } from '@/hooks/useAppRedux';
import useClickOutside from '@/hooks/useClickOutside';

import { setUnreadNotification } from '@/redux/slices/userSlice';

import genderAvatar from '@/utils/genderAvatar';

import Sidebar from '../Home/Sidebar/Sidebar';
import DropDownMenuIcon from './DropDownMenuIcon';
import AccountDropDown from './HeaderDropDown/AccountDropDown';
import CreateDropDown from './HeaderDropDown/CreateDropDown';
import MessageDropDown from './HeaderDropDown/MessageDropDown';
import NotificationDropDown from './HeaderDropDown/NotificationDropDown';
import HeaderIcon from './HeaderIcon';
import Search from './Search/Search';

const menuTabs = [
  {
    title: 'home',
    href: '/',
    Icon: HomeIcon,
  },
  {
    title: 'saved',
    href: '/saved',
    Icon: BookmarkAltIcon,
  },
  {
    title: 'watch',
    href: '/watch/view/all',
    Icon: PlayIcon,
  },
  {
    title: 'marketplace',
    href: '/marketplace/browse/all',
    Icon: ShoppingCartIcon,
  },
  {
    title: 'groups',
    href: '/groups/feed',
    Icon: UserGroupIcon,
  },
];

const Header = () => {
  const { t } = useTranslation('header');
  const router = useRouter();
  const elRef = useRef();
  const dispatch = useAppDispatch();
  useClickOutside(elRef, () => setSideMenuShow(false));

  const { userInfo } = useAppSelector((state) => state.user);

  const [isSideMenuShow, setSideMenuShow] = useState(false);
  const [activeTab, setActiveTab] = useState(router.pathname);

  const handleSideMenuShow = (e) => {
    e.stopPropagation();
    setSideMenuShow(!isSideMenuShow);
  };

  return (
    <div className="fixed left-0 right-0 top-0 z-40 flex items-center bg-secondary px-3 py-1 text-secondary shadow-md sm:px-5  md:py-0 ">
      <div className="w-1/2">
        <div className="flex items-center space-x-2 ">
          <img
            onClick={() => router.push('/')}
            className="h-[40px] w-[40px] cursor-pointer"
            src="/logo.svg"
            alt="logo"
          />
          <Search t={t} />
        </div>
      </div>
      <AnimateSharedLayout>
        <div
          className={`${
            router.pathname.includes('messages') && 'hidden'
          } fixed top-[50px] left-0 flex w-full max-w-[750px] flex-grow items-center    bg-secondary text-secondary  sm:mx-0 sm:px-5 md:static xl:px-10`}
        >
          {menuTabs.map(({ title, href, Icon }) => (
            <HeaderIcon
              key={title}
              href={href}
              Icon={Icon}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
          ))}
        </div>
      </AnimateSharedLayout>

      <div className="relative  flex w-1/2 items-center justify-end space-x-1 sm:space-x-2 ">
        <div
          onClick={() => router.push(`/${userInfo.username}`)}
          className="flex cursor-pointer items-center space-x-2 rounded-full border  p-1 hover:border-main "
        >
          <img
            className="h-[35px] min-w-[35px] cursor-pointer rounded-full  object-cover"
            src={userInfo.profileImage || genderAvatar(userInfo.gender)}
            alt="profile-image"
          />
          <p className="ml-2 hidden whitespace-nowrap pr-2 text-sm xl:block">{userInfo.name}</p>
        </div>
        <div className="hidden items-center md:flex">
          <DropDownMenuIcon title="Create" Icon={PlusIcon}>
            <CreateDropDown t={t} />
          </DropDownMenuIcon>
          <DropDownMenuIcon title="Notification" Icon={BellIcon}>
            <NotificationDropDown t={t} />
          </DropDownMenuIcon>
          <DropDownMenuIcon title="Messenger" Icon={ChatIcon}>
            <MessageDropDown t={t} />
          </DropDownMenuIcon>
          <DropDownMenuIcon title="Account" Icon={ChevronDownIcon}>
            <AccountDropDown t={t} />
          </DropDownMenuIcon>
        </div>
        <div className="flex items-center space-x-3 md:hidden">
          <span className="relative">
            <BellIcon onClick={() => router.push('/notifications')} className="h-6" />
            {userInfo.unreadNotification && (
              <div
                onClick={() => dispatch(setUnreadNotification(false))}
                className="absolute top-[3px] right-1 h-[5px] w-[5px] rounded-full bg-main"
              ></div>
            )}
          </span>
          <ChatIcon onClick={() => router.push('/messages')} className="h-6" />
          <MenuIcon
            onClick={(e) => handleSideMenuShow(e)}
            className={`h-6 ${isSideMenuShow ? 'text-main' : ''}`}
          />
        </div>
        {isSideMenuShow && (
          <div
            ref={elRef}
            className={`${
              isSideMenuShow && '-translate-x-full'
            } fixed left-full top-[50px] z-40  h-full  w-full transform overflow-y-auto bg-secondary text-button transition-transform delay-500 ease-in-out`}
          >
            <div onClick={(e) => handleSideMenuShow(e)}>
              <Sidebar />
            </div>
            <AccountDropDown t={t} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
