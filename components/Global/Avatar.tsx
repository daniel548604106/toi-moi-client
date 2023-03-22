import React from 'react';

import Image from 'next/image';
import router from 'next/router';

import genderAvatar from '@/utils/genderAvatar';

interface AvatarProps {
  width?: number;
  height?: number;
  profileImage: string;
  username?: string;
  gender?: 'male' | 'female' | 'other';
}
const Avatar = ({
  width = 60,
  height = 60,
  profileImage,
  username = '',
  gender = 'other',
}: AvatarProps) => {
  return (
    <Image
      style={{
        width,
        height,
      }}
      onClick={() => router.push(`/${username}`)}
      className={`${
        !profileImage ? 'avatarFallback' : ''
      } ] cursor-pointer rounded-full object-cover `}
      width={width}
      height={height}
      src={profileImage || genderAvatar(gender)}
      alt="profile-image"
    />
  );
};

export default Avatar;
