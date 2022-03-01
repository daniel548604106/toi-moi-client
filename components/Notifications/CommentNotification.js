import React from 'react';
import { timeDiff } from '@/Lib/dayjs';
import { DotsHorizontalIcon, ChatAlt2Icon } from '@heroicons/react/outline';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { apiPostReadSingleNotification } from '@/Axios/index';
import useTranslation from 'next-translate/useTranslation';
import Avatar from '../Global/Avatar';
const CommentNotification = ({ notification }) => {
  const { t } = useTranslation('header');
  const userInfo = useSelector((state) => state.user.userInfo);
  const router = useRouter();
  const handleReadNotification = async (notificationId) => {
    router.push(`/${userInfo.username}/posts/${notification.post._id}?comment_id=`);
    try {
      const res = await apiPostReadSingleNotification(notificationId);
      console.log('res,', res);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div
      onClick={() => handleReadNotification(notification._id)}
      className="group  relative w-full  p-2 rounded-lg  justify-between cursor-pointer mb-2 flex items-center"
    >
      <div className="flex items-center">
        <span className="relative">
          <Avatar
            width="60"
            height="60"
            username={notification.user.username}
            profileImage={notification.user.profileImage}
            gender={notification.user.gender}
          />
          <span className="absolute bottom-1 right-0 rounded-full text-white bg-green-400 text-secondary p-1">
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
        <div className="hidden group-hover:block rounded-full cursor-pointer bg-secondary text-secondary  border p-2">
          <DotsHorizontalIcon className="h-6 " />
        </div>
        {!notification.isNotificationRead && (
          <div className="rounded-full ml-[10px] w-[8px] h-[8px] bg-main"></div>
        )}{' '}
      </div>
    </div>
  );
};

export default CommentNotification;
