import React, { useState } from 'react';

import { UsersIcon } from '@heroicons/react/outline';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';

import { postFriendRequestAPI, rejectFriendRequestAPI } from '@/axios/friendRequest';
import { postReadSingleNotificationAPI } from '@/axios/notificationRequest';

import Avatar from '@/components/global/Avatar';
import { timeDiff } from '@/lib/dayjs';

interface FriendNotificationProps {
  notification: any;
  removeNotification: (string) => void;
}
const FriendNotification = (props: FriendNotificationProps) => {
  const { notification, removeNotification } = props;
  const { t } = useTranslation('header');
  const router = useRouter();
  const [isAccepted, setAccepted] = useState(false);

  const handleReadNotification = async (notificationId) => {
    router.push(`/${notification.user.username}`);
    try {
      await postReadSingleNotificationAPI(notificationId);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAcceptFriendRequest = async (e, username) => {
    e.stopPropagation();
    setAccepted(true);
    try {
      const res = await postFriendRequestAPI(username);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const handleRejectRequest = async (e, username) => {
    e.stopPropagation();
    removeNotification(notification._id);
    try {
      await rejectFriendRequestAPI(username);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      onClick={() => handleReadNotification(notification._id)}
      className={`${
        isAccepted ? 'cursor-pointer' : 'cursor-none'
      } group relative mb-2  flex w-full items-center   rounded-lg p-2 hover:bg-gray-100`}
    >
      <div className=" flex flex-1 items-center">
        <span className="relative">
          <Avatar
            width={60}
            height={60}
            gender={notification.user.gender}
            profileImage={notification.user.profileImage}
          />
          <span className="absolute bottom-1 right-0 rounded-full  bg-gray-800 p-1">
            <UsersIcon className="h-4 text-white" />
          </span>
        </span>

        <div className=" ml-[10px]">
          <p className="text-sm text-primary">
            <span className="cursor-pointer font-semibold text-primary hover:underline">
              {notification.user.name}
            </span>{' '}
            {notification.type === ('newFriendInvitation' && isAccepted) ||
              (notification.type === 'newFriendAdded' && (
                <span>{`You are now friend with  ${notification.user.name}`}</span>
              ))}
            {notification.type === 'newFriendInvitation' && !isAccepted && (
              <span>sent you a friend request</span>
            )}
            {notification.type === 'newFriendAccepted' && t('acceptedYourFriendRequest')}
          </p>
          <p className={`text-xs text-gray-500 ${!notification.isNotificationRead && 'text-main'}`}>
            {timeDiff(notification.date)}
          </p>{' '}
          {notification.type === 'newFriendInvitation' && !isAccepted && (
            <div className="mt-[5px] flex w-full flex-1 items-center">
              <div
                onClick={(e) => handleAcceptFriendRequest(e, notification.user.username)}
                className={`flex w-full cursor-pointer items-center justify-center rounded-md   bg-main p-2 px-4 text-xs text-white `}
              >
                {t('confirm')}
              </div>
              <div
                onClick={(e) => handleRejectRequest(e, notification.user.username)}
                className=" ml-[10px] flex w-full cursor-pointer items-center justify-center rounded-md border p-2 px-4 text-xs"
              >
                {t('cancel')}
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="flex items-center">
        {!notification.isNotificationRead && (
          <div className="ml-[10px] h-[8px] w-[8px] rounded-full bg-main"></div>
        )}
      </div>
    </div>
  );
};

export default FriendNotification;
