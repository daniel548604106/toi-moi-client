import React from 'react';

import router from 'next/router';

import ProfilePic from '@/components/global/ProfilePic';
import { UserInfo } from '@/interfaces/I_common';

interface RequestCardProps {
  user: UserInfo;
  t: any;
}

const RequestCard = ({ user, t }: RequestCardProps) => {
  return (
    <div
      className="mb-3  w-full items-center justify-between rounded-lg bg-secondary p-2 shadow-lg sm:p-3 md:flex  "
      key={user.username}
    >
      <div
        onClick={() => router.push(`/${user.username}`)}
        className="flex items-center p-2 sm:p-3"
      >
        <ProfilePic
          width={50}
          height={50}
          username={user.username}
          profileImage={user.profileImage}
          gender={user.gender}
        />
        <div className=" ml-[10px] flex flex-1 items-center justify-between truncate whitespace-nowrap">
          <p className="cursor-pointer truncate hover:underline">{user.name}</p>
        </div>
      </div>
      <div className="flex w-full items-center sm:justify-end">
        <button className="sm:text-md w-full rounded-md  bg-main p-1 text-sm text-white sm:w-auto sm:px-3">
          {t('confirm')}
        </button>
        <button className="sm:text-md ml-[10px] w-full  rounded-md bg-button p-1 text-sm text-secondary sm:w-auto sm:px-3">
          {t('cancel')}
        </button>
      </div>
    </div>
  );
};

export default RequestCard;
