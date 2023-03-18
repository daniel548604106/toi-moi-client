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
    <div className="text-primary bg-primary  p-3">
      <div className="flex relative items-center justify-between mb-3">
        <Avatar
          profileImage={userInfo.profileImage}
          gender={userInfo.gender}
          width={40}
          height={40}
          username={userInfo.username}
        />
        <h2 className="text-lg sm:text-2xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 font-semibold ">
          Messenger
        </h2>
        <div className="flex items-center space-x-2">
          <span className="p-2 ml-[5px] rounded-full bg-button text-secondary">
            <VideoCameraIcon className="h-5 w-5  cursor-pointer   rounded-full" />
          </span>
          <span
            onClick={() => dispatch(toggleListOpen())}
            className="sm:hidden p-2 rounded-full bg-button text-secondary"
          >
            <XIcon className="h-5 w-5  cursor-pointer  rounded-full" />
          </span>
        </div>
      </div>
      <div className="rounded-2xl bg-gray-200 flex items-center p-2">
        <SearchIcon className="h-5 mr-2" />
        <input
          onChange={(e) => setSearchText(e.target.value)}
          type="text"
          value={searchText}
          className="w-full bg-gray-200 focus:outline-none"
          placeholder={t('searchMessenger')}
        />
      </div>
    </div>
  );
};

export default Header;
