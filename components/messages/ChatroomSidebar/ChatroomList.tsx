import React from 'react';
import { useDispatch } from 'react-redux';

import Image from 'next/image';
import { useRouter } from 'next/router';

import { User } from '@/interfaces/I_socket';
import { timeDiff } from '@/lib/dayjs';
import { toggleListOpen } from '@/redux/slices/messageSlice';

import genderAvatar from '@/utils/genderAvatar';

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
      className={`flex cursor-pointer items-center  p-2 hover:bg-gray-100 ${
        router.query.message === chat.messagesWith ? 'bg-blue-100 hover:bg-blue-100' : ''
      }`}
    >
      <div className="relative flex h-[40px] w-[40px] items-center ">
        <Image
          width="40"
          height="40"
          className="rounded-full object-cover "
          src={chat.profileImage}
          alt="profile-image"
        />
        {isOnline && (
          <div className="absolute top-[3px] right-[3px] h-[8px] w-[8px] rounded-full border border-white bg-green-400"></div>
        )}
      </div>
      <div className="ml-3 flex-1 overflow-hidden truncate">
        <div className="flex w-full items-center justify-between">
          <p className="mr-2">{chat.name}</p>
          <p className="text-xs text-gray-600">{timeDiff(chat.date)}</p>
        </div>
        <p className=" truncate text-sm text-gray-600">{chat.lastMessage}</p>
      </div>
    </div>
  );
};

export default ChatroomList;
