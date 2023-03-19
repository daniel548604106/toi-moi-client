import React, { useEffect, useState } from 'react';

import { DotsHorizontalIcon } from '@heroicons/react/outline';
import axios from 'axios';

import { postReadNotificationsAPI } from '@/axios/notificationRequest';

import CommentNotification from '@/components/Notifications/CommentNotification';
import EmptyNotification from '@/components/Notifications/EmptyNotification';
import FriendNotification from '@/components/Notifications/FriendNotification';
import LikeNotification from '@/components/Notifications/LikeNotification';

const Index = ({ notifications }) => {
  const [currentNotifications, setCurrentNotifications] = useState(notifications);
  useEffect(() => {
    const readNotifications = async () => {
      try {
        await postReadNotificationsAPI();
      } catch (error) {
        console.log(error);
      }
    };
    readNotifications();
  }, []);

  const removeNotification = (id) => {
    setCurrentNotifications(notifications.filter((notification) => notification._id !== id));
  };

  return (
    <div className=" overflow-y-auto  sm:py-[80px] ">
      <div className="mx-auto w-full max-w-[600px] rounded-xl  bg-secondary p-3 text-secondary shadow-lg">
        <div className="mb-[20px] flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Notification</h2>
          <DotsHorizontalIcon className="h-6 cursor-pointer" />
        </div>
        {currentNotifications.length > 0 ? (
          <div>
            {currentNotifications.map((notification) => (
              <div key={notification._id}>
                {notification.type === 'newLike' && (
                  <LikeNotification notification={notification} />
                )}
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
            ))}
          </div>
        ) : (
          <EmptyNotification />
        )}
      </div>
    </div>
  );
};

export default Index;

export async function getServerSideProps({ req, res }) {
  try {
    // get server side cookies
    const token = req.cookies.token;
    const res = await axios.get(`${process.env.API_BASE_URL}/api/notifications`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.data) {
      return {
        notFound: true,
      };
    }
    return {
      props: {
        notifications: res.data,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      props: {
        ok: false,
        reason: 'some error description for your own consumption, not for client side',
      },
    };
  }
}
