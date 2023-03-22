import React from 'react';

import { XIcon } from '@heroicons/react/outline';
import router from 'next/router';

import { useAppSelector } from '@/hooks/useAppRedux';

import ProfilePic from '@/components/global/ProfilePic';

interface PostNotificationProps {
  setNewNotification: (any) => void;
  newNotification: { profileImage: string; postId: string; username: string; name: string };
}

const PostNotification = (props: PostNotificationProps) => {
  const {
    setNewNotification,
    newNotification: { profileImage, postId, username, name },
  } = props;
  const { userInfo } = useAppSelector((state) => state.user);
  return (
    <div
      onClick={() => router.push(`/${userInfo.username}/posts/${postId}`)}
      className=" relative flex cursor-pointer items-center space-x-3 rounded-lg border bg-secondary p-2 "
    >
      <XIcon
        onClick={(e) => {
          e.stopPropagation();
          setNewNotification(null);
        }}
        className="absolute top-2 right-2 h-5"
      />
      <ProfilePic profileImage={profileImage} username={username} />
      <p className="sm:text-md text-sm">
        <span>{name}</span> liked your post
      </p>
    </div>
  );
};

export default PostNotification;
