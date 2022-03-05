import Image from 'next/dist/client/image';
import router from 'next/router';
import React from 'react';

import genderAvatar from '@/Utils/genderAvatar';

interface AvatarProps {
  width: number;
  height: number;
  profileImage: string;
  layout?: 'intrinsic' | 'fixed' | 'responsive';
  username?: string;
  gender?: 'male' | 'female' | 'other';
}
const Avatar = (props: AvatarProps) => {
  const {
    width = 60,
    height = 60,
    profileImage,
    layout = 'intrinsic',
    username = '',
    gender = 'other',
  } = props;

  return (
    <Image
      onClick={() => router.push(`/${username}`)}
      className="rounded-full object-cover cursor-pointer avatarFallback "
      width={width}
      layout={layout}
      height={height}
      src={profileImage || genderAvatar(gender)}
    />
  );
};

export default Avatar;
