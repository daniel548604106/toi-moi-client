import React from 'react';
import Image from 'next/image';
import {
  SearchIcon,
  PlayIcon,
  FlagIcon,
  ShoppingCartIcon,
  MenuIcon
} from '@heroicons/react/outline';
import {
  BellIcon,
  ChatIcon,
  ChevronDownIcon,
  HomeIcon,
  UserGroupIcon,
  PlusIcon,
  ViewGridIcon
} from '@heroicons/react/solid';
import HeaderIcon from './HeaderIcon';
import genderAvatar from '../../utils/genderAvatar';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import AccountDropDown from './AccountDropDown';
import DropDownMenu from './DropDownMenu';
import DropDownMenuIcon from './DropDownMenuIcon';
import MessageDropDown from './MessageDropDown';
import CreateDropDown from './CreateDropDown';
import Search from './Search';
import NotificationDropDown from './NotificationDropDown';
const Header = () => {
  const router = useRouter();
  const userInfo = useSelector((state) => state.user.userInfo);

  return (
    <div className="flex items-center sticky left-0 right-0 top-0 bg-secondary text-secondary z-40 shadow-md p-1 sm:px-5 ">
      <div className="w-1/2">
        <div className="flex space-x-2 items-center ">
          <Image
            onClick={() => router.push('/')}
            className="cursor-pointer"
            src="/logo.svg"
            width={40}
            height={40}
            layout="fixed"
          />
          <Search />
          <div className="block md:hidden">
            <HeaderIcon Icon={MenuIcon} />
          </div>
        </div>
      </div>

      <div className="fixed top-[60px] left-0 flex   w-full md:static items-center flex-grow sm:px-5 sm:mx-0 xl:px-10">
        <HeaderIcon
          title="home"
          href="/"
          active={router.pathname === '/'}
          Icon={HomeIcon}
        />
        <HeaderIcon title="flag" Icon={FlagIcon} />
        <HeaderIcon title="watch" href="/watch/view/all" Icon={PlayIcon} />
        <HeaderIcon
          title="marketplace"
          href="/marketplace/browse/all"
          Icon={ShoppingCartIcon}
        />
        <HeaderIcon title="groups" href="/groups/feed" Icon={UserGroupIcon} />
      </div>
      <div className="w-1/2  relative flex justify-end items-center space-x-1 sm:space-x-2 ">
        <div
          onClick={() => router.push(`/${userInfo.username}`)}
          className="flex border items-center rounded-full space-x-2 hover:border-main  p-1 cursor-pointer "
        >
          <Image
            className="cursor-pointer object-cover mr-2 rounded-full"
            layout="fixed"
            src={userInfo.profileImage || genderAvatar(userInfo.gender)}
            width="40"
            height="40"
          />
          <p className="pr-2 text-sm text-gray-600 whitespace-nowrap hidden xl:block">
            {userInfo.name}
          </p>
        </div>
        <div className="hidden md:block">
          <DropDownMenuIcon title="Create" Icon={PlusIcon}>
            <DropDownMenu>
              <CreateDropDown />
            </DropDownMenu>
          </DropDownMenuIcon>
        </div>
        <DropDownMenuIcon title="Notification" Icon={BellIcon}>
          <DropDownMenu>
            <NotificationDropDown />
          </DropDownMenu>
        </DropDownMenuIcon>
        <DropDownMenuIcon title="Messenger" Icon={ChatIcon}>
          <DropDownMenu>
            <MessageDropDown />
          </DropDownMenu>
        </DropDownMenuIcon>
        <DropDownMenuIcon title="Account" Icon={ChevronDownIcon}>
          <DropDownMenu>
            <AccountDropDown />
          </DropDownMenu>
        </DropDownMenuIcon>
      </div>
    </div>
  );
};

export default Header;
