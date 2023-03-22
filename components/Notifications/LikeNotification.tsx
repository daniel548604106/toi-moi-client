import React from 'react';

import { ThumbUpIcon } from '@heroicons/react/outline';
import useTranslation from 'next-translate/useTranslation';
import router from 'next/router';

import { useAppSelector } from '@/hooks/useAppRedux';

import { postReadSingleNotificationAPI } from '@/axios/notificationRequest';

import Avatar from '@/components/global/ProfilePic';
import { timeDiff } from '@/lib/dayjs';

interface LikeNotificationProps {
  notification: any;
}

const LikeNotification = ({ notification }: LikeNotificationProps) => {
  const { t } = useTranslation('header');
  const userInfo = useAppSelector((state) => state.user.userInfo);
  const handleReadNotification = async (notificationId) => {
    router.push(`/${userInfo.username}/posts/${notification.post._id}`);
    try {
      const res = await postReadSingleNotificationAPI(notificationId);
      console.log('res,', res);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div
      onClick={() => handleReadNotification(notification._id)}
      className="group  relative mb-2  flex w-full cursor-pointer items-center justify-between rounded-lg p-2 hover:bg-gray-100"
    >
      <div className="flex items-center">
        <span className="relative">
          <Avatar
            username={notification.user.username}
            profileImage={notification.user.profileImage}
            gender={notification.user.gender}
          />
          <span className="absolute bottom-1 right-0 rounded-full  bg-main p-1 text-white text-secondary">
            <ThumbUpIcon className="h-4" />
          </span>
        </span>
        <div className=" ml-[10px]">
          <p className="text-sm">
            <span className="font-semibold">{notification.user.name}</span> {t('likedYourPost')}
          </p>
          <p className={`text-xs  ${!notification.isNotificationRead && 'text-main'}`}>
            {timeDiff(notification.date)}
          </p>
        </div>
      </div>
      <div className="flex items-center">
        {!notification.isNotificationRead && (
          <div className="ml-[10px] h-[8px] w-[8px] rounded-full bg-main"></div>
        )}{' '}
      </div>
    </div>
  );
};

export default LikeNotification;
