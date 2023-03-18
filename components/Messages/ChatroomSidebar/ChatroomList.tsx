import React from 'react';
import { useDispatch } from 'react-redux';

import Image from 'next/image';
import { useRouter } from 'next/router';

import { User } from '@/Interfaces/I_socket';

import { timeDiff } from '@/Lib/dayjs';
import { toggleListOpen } from '@/Redux/slices/messageSlice';

import genderAvatar from '@/Utils/genderAvatar';

interface ChatroomListProps {
  chat: any;
  connectedUsers: User[];
  setOpenChatUser: ({ name, profileImage }: { name: string; profileImage: string }) => void;
}
const ChatroomList = (props: ChatroomListProps) => {
  const { chat, connectedUsers, setOpenChatUser } = props;
  const router = useRouter();
  const dispatch = useDispatch();
  const isOnline =
    connectedUsers.length > 0 &&
    connectedUsers.filter((user) => user.userId === chat.messagesWith).length > 0;

  const startChat = () => {
    router.push(`/messages?message=${chat.messagesWith}`, undefined, {
      shallow: true,
    });
    dispatch(toggleListOpen());
    setOpenChatUser({
      name: chat.name,
      profileImage: chat.profileImage || genderAvatar(),
    });
  };
  return (
    <div
      onClick={() => startChat()}
      className={`flex items-center p-2  hover:bg-gray-100 cursor-pointer ${
        router.query.message === chat.messagesWith ? 'bg-blue-100 hover:bg-blue-100' : ''
      }`}
    >
      <div className="relative h-[40px] w-[40px] flex items-center ">
        <Image
          width="40"
          height="40"
          className="rounded-full object-cover "
          src={chat.profileImage}
          alt="profile-image"
        />
        {isOnline && (
          <div className="absolute top-[3px] right-[3px] h-[8px] w-[8px] border border-white rounded-full bg-green-400"></div>
        )}
      </div>
      <div className="ml-3 flex-1 truncate overflow-hidden">
        <div className="flex items-center justify-between w-full">
          <p className="mr-2">{chat.name}</p>
          <p className="text-xs text-gray-600">{timeDiff(chat.date)}</p>
        </div>
        <p className=" truncate text-sm text-gray-600">{chat.lastMessage}</p>
      </div>
    </div>
  );
};

export default ChatroomList;
