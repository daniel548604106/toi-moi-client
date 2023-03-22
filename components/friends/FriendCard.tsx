import React, { useState } from 'react';

import { CheckIcon } from '@heroicons/react/solid';
import Image from 'next/image';
import router from 'next/router';

import { postFriendRequestAPI } from '@/axios/friendRequest';

import { UserInfo } from '@/interfaces/I_common';

import genderAvatar from '@/utils/genderAvatar';

interface FriendCardProps {
  user: UserInfo;
  removeRecommendation: (id: string) => void;
}

const FriendCard = ({ user, removeRecommendation }: FriendCardProps) => {
  const [added, setAdded] = useState(false);
  const handleAddFriend = async () => {
    try {
      setAdded(true);
      const { data } = await postFriendRequestAPI(user.username);
      removeRecommendation(user._id);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div
      className={`${
        added && 'opacity-20'
      } rounded-lg bg-secondary  p-3 text-secondary shadow-lg transition-opacity duration-500`}
    >
      <div
        onClick={() => router.push(`/friends/suggestions?profile_id=${user._id}`)}
        className="relative h-[150px] sm:h-[200px]"
      >
        <Image
          className="h-auto w-full cursor-pointer rounded-lg object-cover"
          src={user.profileImage || genderAvatar(user.gender)}
          fill={true}
          alt="profile-image"
        />
      </div>
      <p className="mb-5 mt-3 text-xs font-semibold sm:text-sm">{user.name}</p>
      <div className="space-y-2">
        <button
          onClick={() => handleAddFriend()}
          className="outline-none flex w-full items-center justify-center rounded-lg bg-main p-2 text-xs text-white sm:text-sm "
        >
          {added ? <CheckIcon className="h-4 text-white" /> : 'Add Friend'}
        </button>
        <button
          onClick={() => removeRecommendation(user._id)}
          className="w-full rounded-lg bg-button p-2 text-xs text-secondary sm:text-sm"
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default FriendCard;
