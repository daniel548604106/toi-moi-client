import React, { useEffect } from 'react';
import axios from 'axios';
import Image from 'next/image';
import { DotsHorizontalIcon } from '@heroicons/react/outline';
import { apiPostReadNotifications } from '@/Api';
import LikeNotification from '../components/Notifications/LikeNotification';
import CommentNotification from '../components/Notifications/CommentNotification';
import FriendNotification from '../components/Notifications/FriendNotification';
import EmptyNotification from '../components/Notifications/EmptyNotification';
const Index = ({ notifications }) => {
  useEffect(() => {
    console.log(notifications);

    const readNotifications = async (req, res) => {
      try {
        await apiPostReadNotifications();
      } catch (error) {
        console.log(error);
      }
    };
    readNotifications();
  }, []);
  return (
    <div className=" overflow-y-auto  sm:py-[80px] ">
      <div className="p-3 rounded-xl w-full max-w-[600px]  mx-auto bg-secondary text-secondary shadow-lg">
        <div className="flex items-center justify-between mb-[20px]">
          <h2 className="font-semibold text-2xl">Notification</h2>
          <DotsHorizontalIcon className="h-6 cursor-pointer" />
        </div>
        {notifications.length > 0 ? (
          <div>
            {notifications.map((notification) => (
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
                  <FriendNotification notification={notification} />
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
    const res = await axios.get(`${process.env.BASE_URL}/api/notifications`, {
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
