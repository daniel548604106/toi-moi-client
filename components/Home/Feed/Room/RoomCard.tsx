import React from 'react';

import Image from 'next/image';

import { UserInfo } from '@/interfaces/I_common';

import genderAvatar from '@/utils/genderAvatar';

interface RoomCardProps {
  user: UserInfo;
}
const RoomCard = ({ user }: RoomCardProps) => {
  return (
    <div className="flex w-[100px]   flex-shrink-0 flex-col items-center justify-center space-y-1 rounded-lg border bg-secondary p-2 text-secondary sm:w-[150px] sm:space-y-3  sm:p-3">
      <Image
        width={60}
        height={60}
        className="cursor-pointer rounded-full"
        src={user.profileImage || genderAvatar(user.gender)}
        alt="profile-image"
      />
      <p className="w-full overflow-hidden text-center">
        <span className="w-1/2 truncate">{user.name}</span>
      </p>
      <button className="focus:outline-none sm:text-md w-full rounded-lg border bg-main p-1 text-sm text-white">
        Join
      </button>
    </div>
  );
};

export default RoomCard;
