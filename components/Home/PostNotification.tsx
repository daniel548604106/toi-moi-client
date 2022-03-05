import router from 'next/router';
import React from 'react';

import Avatar from '@/Components/Global/Avatar';
import { useAppSelector } from '@/Hooks/useAppRedux';
import { XIcon } from '@heroicons/react/outline';

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
      className=" relative rounded-lg border bg-secondary p-2 cursor-pointer flex items-center space-x-3 "
    >
      <XIcon
        onClick={(e) => {
          e.stopPropagation();
          setNewNotification(null);
        }}
        className="h-5 absolute top-2 right-2"
      />
      <Avatar profileImage={profileImage} username={username} />
      <p className="text-sm sm:text-md">
        <span>{name}</span> liked your post
      </p>
    </div>
  );
};

export default PostNotification;
