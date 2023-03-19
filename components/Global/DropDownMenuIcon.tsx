import React, { useEffect, useState } from 'react';

import { postReadNotificationsAPI } from '@/axios/notificationRequest';

import { useAppDispatch, useAppSelector } from '@/hooks/useAppRedux';
import { getMyInfo } from '@/redux/slices/userSlice';

const DropDownMenuIcon = ({ Icon, children, title }) => {
  const dispatch = useAppDispatch();
  const userInfo = useAppSelector((state) => state.user.userInfo);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [unreadNotification, setUnreadNotification] = useState(userInfo?.unreadNotification);

  const handleReadNotification = async () => {
    try {
      setMenuOpen(!isMenuOpen);
      if (title === 'Notification') {
        setUnreadNotification(false);
        const { data } = await postReadNotificationsAPI();
        // Update userInfo
        dispatch(getMyInfo());
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setUnreadNotification(userInfo.unreadNotification);
  }, [userInfo]);
  return (
    <button className="cursor-none focus:outline-none group cursor-default">
      {title === 'Notification' && unreadNotification && (
        <div className="relative">
          <p className="absolute top-0 right-0 z-50 flex h-[20px] w-[20px] -translate-y-1/2 transform items-center justify-center rounded-full bg-red-400 text-xs text-white">
            <span>1</span>
          </p>
        </div>
      )}
      <Icon
        onClick={() => handleReadNotification()}
        className="icon group-hover:text-main group-focus:text-main"
      />
      <div className="cursor-none hidden group-focus:block">
        <div className="absolute bottom-1 right-0 z-50 max-h-[90vh] w-[360px] translate-y-full transform overflow-y-auto rounded-lg bg-secondary p-3  text-left text-primary shadow-lg md:right-3">
          {children}
        </div>
      </div>
    </button>
  );
};

export default DropDownMenuIcon;
