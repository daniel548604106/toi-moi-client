import React from 'react';

import Image from 'next/image';
import router from 'next/router';

import genderAvatar from '@/utils/genderAvatar';

import CardLayout from './CardLayout';

interface FriendsProps {
  friends: any;
}

const Friends = ({ friends }: FriendsProps) => {
  return (
    <CardLayout title="Friends" buttonName="See All Friends" buttonLink="friends">
      <>
        <h2 className="mb-3 text-lg text-gray-400">{`${friends.friends_total} ${
          friends.friends_total > 1 ? 'friends' : 'friend'
        }`}</h2>
        <div className="grid grid-cols-3 gap-2">
          {friends.friends_preview.map((friend) => (
            <span
              key={friend.user._id}
              onClick={() => router.push(`/${friend.user.username}`)}
              className=""
            >
              <Image
                className="cursor-pointer rounded-md object-cover "
                width={150}
                height={150}
                src={friend.user.profileImage || genderAvatar(friend.user.gender)}
                alt="profile-image"
              />
              <p> {friend.user.name}</p>
            </span>
          ))}
        </div>
      </>
    </CardLayout>
  );
};

export default Friends;
