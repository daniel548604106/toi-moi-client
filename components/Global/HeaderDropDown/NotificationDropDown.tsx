import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import { apiGetNotifications } from '@/Axios/index';
import CommentNotification from '@/Components/Notifications/CommentNotification';
import EmptyNotification from '@/Components/Notifications/EmptyNotification';
import FriendNotification from '@/Components/Notifications/FriendNotification';
import LikeNotification from '@/Components/Notifications/LikeNotification';

interface NotificationDropDownProps {
  t: (text: string) => string;
}

const NotificationDropDown = (props: NotificationDropDownProps) => {
  const { t } = props;
  const router = useRouter();
  const [notifications, setNotifications] = useState([]);
  useEffect(() => {
    const getNotifications = async () => {
      try {
        const { data } = await apiGetNotifications();
        console.log(data, 'notification');
        setNotifications(data);
      } catch (error) {
        console.log(error);
      }
    };
    getNotifications();
  }, []);
  const removeNotification = (id) => {
    setNotifications(notifications.filter((notification) => notification._id !== id));
  };
  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">{t('notification')}</h2>
        <span
          onClick={() => router.push('/notifications')}
          className="text-main cursor-pointer text-sm"
        >
          {t('seeAll')}
        </span>
      </div>
      {notifications.length > 0 ? (
        notifications.map((notification) => (
          <div key={notification._id}>
            {notification.type === 'newLike' && <LikeNotification notification={notification} />}
            {notification.type === 'newComment' && (
              <CommentNotification notification={notification} />
            )}
            {(notification.type === 'newFriendAccepted' ||
              notification.type === 'newFriendInvitation' ||
              notification.type === 'newFriendAdded') && (
              <FriendNotification
                removeNotification={removeNotification}
                notification={notification}
              />
            )}
          </div>
        ))
      ) : (
        <EmptyNotification />
      )}
    </div>
  );
};

export default NotificationDropDown;
