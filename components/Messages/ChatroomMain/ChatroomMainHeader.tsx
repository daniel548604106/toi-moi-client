import Image from 'next/image';
import router from 'next/router';
import React from 'react';

import { User } from '@/Interfaces/I_socket';
import { InformationCircleIcon, PhoneIcon, VideoCameraIcon } from '@heroicons/react/solid';

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
    <div className=" border-b-2 flex items-center justify-between p-2 sm:p-3">
      <div className="flex items-center">
        {openChatUser.profileImage && (
          <Image
            className="rounded-full w-[25px] h-[25px] sm:w-[50px] sm:h-[50px]  cursor-pointer"
            src={openChatUser.profileImage}
            width="50"
            height="50"
          />
        )}
        <div className="ml-3">
          <p className="text-sm truncate sm:text-lg font-medium cursor-pointer hover:underline">
            {openChatUser.name}
          </p>
          {isOnline && <p className="text-xs sm:text-sm text-gray-500">目前在線上</p>}
        </div>
      </div>
      <div className="flex items-center space-x-3">
        <PhoneIcon className="h-5 sm:h-6 text-main cursor-pointer" />
        <VideoCameraIcon className="h-5 sm:h-6 text-main cursor-pointer" />
        <InformationCircleIcon className="h-5 sm:h-6 text-main cursor-pointer" />
      </div>
    </div>
  );
};

export default ChatroomMainHeader;
