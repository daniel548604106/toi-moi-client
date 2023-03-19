import React from 'react';

import { SearchIcon, VideoCameraIcon, XIcon } from '@heroicons/react/solid';

import { useAppDispatch, useAppSelector } from '@/hooks/useAppRedux';

import Avatar from '@/components/Global/Avatar';
import { toggleListOpen } from '@/redux/slices/messageSlice';

interface ChatroomSidebarHeaderProps {
  searchText: string;
  setSearchText: (string) => void;
  t: (string) => string;
}

const Header = (props: ChatroomSidebarHeaderProps) => {
  const { searchText, t, setSearchText } = props;
  const dispatch = useAppDispatch();
  const userInfo = useAppSelector((state) => state.user.userInfo);
  return (
    <div className="bg-primary p-3  text-primary">
      <div className="relative mb-3 flex items-center justify-between">
        <Avatar
          profileImage={userInfo.profileImage}
          gender={userInfo.gender}
          width={40}
          height={40}
          username={userInfo.username}
        />
        <h2 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform text-lg font-semibold sm:text-2xl ">
          Messenger
        </h2>
        <div className="flex items-center space-x-2">
          <span className="ml-[5px] rounded-full bg-button p-2 text-secondary">
            <VideoCameraIcon className="h-5 w-5  cursor-pointer   rounded-full" />
          </span>
          <span
            onClick={() => dispatch(toggleListOpen())}
            className="rounded-full bg-button p-2 text-secondary sm:hidden"
          >
            <XIcon className="h-5 w-5  cursor-pointer  rounded-full" />
          </span>
        </div>
      </div>
      <div className="flex items-center rounded-2xl bg-gray-200 p-2">
        <SearchIcon className="mr-2 h-5" />
        <input
          onChange={(e) => setSearchText(e.target.value)}
          type="text"
          value={searchText}
          className="focus:outline-none w-full bg-gray-200"
          placeholder={t('searchMessenger')}
        />
      </div>
    </div>
  );
};

export default Header;
