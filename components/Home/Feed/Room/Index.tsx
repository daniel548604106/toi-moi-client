import React, { useState } from 'react';

import { VideoCameraIcon } from '@heroicons/react/outline';

import Avatar from '@/components/Global/Avatar';

import genderAvatar from '@/utils/genderAvatar';

import CreateRoomCard from './CreateRoomCard';
import RoomCard from './RoomCard';

interface RoomProps {
  roomList: any;
}

const Room = ({ roomList }: RoomProps) => {
  const [isRoomShow, setRoomShow] = useState(false);
  return (
    <div className="w-full">
      {isRoomShow ? (
        <div className="flex space-x-2 overflow-x-auto scrollbar-hide">
          <CreateRoomCard />
          {roomList && roomList.map(({ user }) => <RoomCard key={user._id} user={user} />)}
        </div>
      ) : (
        <div className="flex w-full items-center space-x-2 overflow-x-auto rounded-lg bg-secondary p-3 text-secondary shadow-lg scrollbar-hide">
          <div
            onClick={() => setRoomShow(true)}
            className="flex cursor-pointer items-center rounded-full border border-main bg-secondary p-2 text-main"
          >
            <VideoCameraIcon className="h-6" />
            <span className="ml-[5px] whitespace-nowrap text-xs sm:text-sm">Create Room</span>
          </div>
          <div
            onClick={() => setRoomShow(true)}
            className="flex w-full flex-shrink-0 items-center space-x-2 overflow-x-auto whitespace-nowrap"
          >
            {roomList?.map(({ user }) => (
              <span key={user._id} className="space-x-2">
                <Avatar
                  key={user._id}
                  width={40}
                  height={40}
                  profileImage={user.profileImage || genderAvatar(user.gender)}
                />
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Room;
