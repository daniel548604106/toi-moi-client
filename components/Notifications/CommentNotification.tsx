import React from 'react';

import { ChatAlt2Icon, DotsHorizontalIcon } from '@heroicons/react/outline';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';

import { useAppSelector } from '@/hooks/useAppRedux';

import { postReadSingleNotificationAPI } from '@/axios/notificationRequest';

import Avatar from '@/components/Global/Avatar';
import { timeDiff } from '@/lib/dayjs';

interface CommentNotificationProps {
  notification: any;
}

const CommentNotification = ({ notification }: CommentNotificationProps) => {
  const { t } = useTranslation('header');
  const userInfo = useAppSelector((state) => state.user.userInfo);
  const router = useRouter();
  const handleReadNotification = async (notificationId) => {
    router.push(`/${userInfo.username}/posts/${notification.post._id}?comment_id=`);
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
      className="group  relative mb-2  flex w-full  cursor-pointer items-center justify-between rounded-lg p-2"
    >
      <div className="flex items-center">
        <span className="relative">
          <Avatar
            width={60}
            height={60}
            username={notification.user.username}
            profileImage={notification.user.profileImage}
            gender={notification.user.gender}
          />
          <span className="absolute bottom-1 right-0 rounded-full bg-green-400 p-1 text-white text-secondary">
            <ChatAlt2Icon className="h-4" />
          </span>
        </span>
        <div className=" ml-[10px]">
          <p className="text-sm ">
            <span className=" font-semibold">{notification.user.name}</span>{' '}
            {t('commentedOnYourPost')}
          </p>
          <p className={`text-xs ${!notification.isNotificationRead && 'text-main'}  `}>
            {timeDiff(notification.date)}
          </p>{' '}
        </div>
      </div>
      <div className="flex items-center">
        <div className="hidden cursor-pointer rounded-full border bg-secondary p-2  text-secondary group-hover:block">
          <DotsHorizontalIcon className="h-6 " />
        </div>
        {!notification.isNotificationRead && (
          <div className="ml-[10px] h-[8px] w-[8px] rounded-full bg-main"></div>
        )}{' '}
      </div>
    </div>
  );
};

export default CommentNotification;
