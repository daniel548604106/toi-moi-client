import React from 'react';

import { InformationCircleIcon, PhoneIcon, VideoCameraIcon } from '@heroicons/react/solid';
import Image from 'next/image';
import router from 'next/router';

import { User } from '@/interfaces/I_socket';

interface ChatroomMainHeaderProps {
  openChatUser: {
    name: string;
    profileImage: string;
  };
  connectedUsers: User[];
}
const ChatroomMainHeader = (props: ChatroomMainHeaderProps) => {
  const { openChatUser, connectedUsers } = props;
  const isOnline =
    connectedUsers.length > 0 &&
    connectedUsers.filter((user) => user.userId === router.query.message).length > 0;
  return (
    <div className=" flex items-center justify-between border-b-2 p-2 sm:p-3">
      <div className="flex items-center">
        {openChatUser.profileImage && (
          <Image
            className="h-[25px] w-[25px] cursor-pointer rounded-full sm:h-[50px]  sm:w-[50px]"
            src={openChatUser.profileImage}
            width="50"
            height="50"
            alt="profile-image"
          />
        )}
        <div className="ml-3">
          <p className="cursor-pointer truncate text-sm font-medium hover:underline sm:text-lg">
            {openChatUser.name}
          </p>
          {isOnline && <p className="text-xs text-gray-500 sm:text-sm">目前在線上</p>}
        </div>
      </div>
      <div className="flex items-center space-x-3">
        <PhoneIcon className="h-5 cursor-pointer text-main sm:h-6" />
        <VideoCameraIcon className="h-5 cursor-pointer text-main sm:h-6" />
        <InformationCircleIcon className="h-5 cursor-pointer text-main sm:h-6" />
      </div>
    </div>
  );
};

export default ChatroomMainHeader;
