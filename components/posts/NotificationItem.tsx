import React from 'react';

import { ChatAlt2Icon, ThumbUpIcon, UsersIcon } from '@heroicons/react/outline';
import router from 'next/router';

import { useAppSelector } from '@/hooks/useAppRedux';

import ProfilePic from '@/components/global/ProfilePic';

interface NotificationListProps {
  notification: any;
}

const NotificationList = ({ notification }: NotificationListProps) => {
  const userInfo = useAppSelector((state) => state.user.userInfo);

  const notificationMessage = (type): string => {
    switch (type) {
      case 'newFriendAccepted':
        return 'accepted your friend request';
      case 'newFriendInvitation':
        return 'sent you a friend request';
      case 'newLike':
        return 'likes your post';
      case 'newComment':
        return 'commented on your post';
      default:
        return '';
    }
  };

  const handleDirectToNotification = (type) => {
    switch (type) {
      case 'newFriendAccepted':
        router.push(`/${notification.user.username}`);
        break;
      case 'newFriendInvitation':
        router.push(`/${notification.user.username}`);
        break;
      case 'newLike':
        router.push(`/${userInfo.username}/posts/${notification.post._id}`);
        break;
      case 'newComment':
        router.push(`/${userInfo.username}/posts/${notification.post._id}`);
      default:
        return;
    }
  };

  if (!notification.type) return <div>Loading</div>;
  return (
    <div
      onClick={() => handleDirectToNotification(notification.type)}
      className="flex cursor-pointer items-center rounded-md p-2 hover:bg-gray-100"
    >
      <span className="relative">
        <ProfilePic
          username={notification.user.username}
          profileImage={notification.user.profileImage}
          gender={notification.user.gender}
        />
        {notification.type === 'newLike' && (
          <span className="absolute bottom-1 right-0 rounded-full bg-main p-1 text-white">
            <ThumbUpIcon className="h-5" />
          </span>
        )}
        {notification.type === 'newComment' && (
          <span className="absolute bottom-1 right-0 rounded-full bg-green-400 p-1 text-white">
            <ChatAlt2Icon className="h-5" />
          </span>
        )}
        {(notification.type === 'newFriendAccepted' ||
          notification.type === 'newFriendInvitation') && (
          <span className="absolute bottom-1 right-0 rounded-full bg-gray-600 p-1 text-white">
            <UsersIcon className="h-5" />
          </span>
        )}
      </span>
      <div className="ml-[10px]">
        <span className="text-sm font-semibold">{notification.user.name}</span>
        <span className="ml-[3px] text-xs text-gray-600">
          {notificationMessage(notification.type)}
        </span>
      </div>
    </div>
  );
};

export default NotificationList;
