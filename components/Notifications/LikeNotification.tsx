import useTranslation from 'next-translate/useTranslation';
import router from 'next/router';
import React from 'react';

import { postReadSingleNotificationAPI } from '@/Axios/notificationRequest';
import Avatar from '@/Components/Global/Avatar';
import { useAppSelector } from '@/Hooks/useAppRedux';
import { timeDiff } from '@/Lib/dayjs';
import { ThumbUpIcon } from '@heroicons/react/outline';

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
      className="group  relative w-full  p-2 rounded-lg hover:bg-gray-100 justify-between cursor-pointer mb-2 flex items-center"
    >
      <div className="flex items-center">
        <span className="relative">
          <Avatar
            username={notification.user.username}
            profileImage={notification.user.profileImage}
            gender={notification.user.gender}
          />
          <span className="absolute bottom-1 right-0 rounded-full  text-white bg-main text-secondary p-1">
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
          <div className="rounded-full ml-[10px] w-[8px] h-[8px] bg-main"></div>
        )}{' '}
      </div>
    </div>
  );
};

export default LikeNotification;
