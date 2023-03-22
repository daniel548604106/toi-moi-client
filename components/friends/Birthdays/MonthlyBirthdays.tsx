import React from 'react';

import dayjs from 'dayjs';
import Image from 'next/image';
import router from 'next/router';

import genderAvatar from '@/utils/genderAvatar';

interface MonthlyBirthdaysProps {
  birthdays: any;
  month: number;
}

const MonthlyBirthdays = ({ birthdays, month }: MonthlyBirthdaysProps) => {
  return (
    <div className="rounded-lg bg-secondary p-5 text-secondary">
      <h2 className="text-md mb-2 font-semibold sm:mb-3 sm:text-lg">{month}月</h2>
      <p className="sm:text-md my-3 text-sm font-semibold">
        {birthdays[0].name} {birthdays.length > 2 ? '& others' : ''}
      </p>
      <div className="flex items-center ">
        {birthdays.map((user) => (
          <span key={user.username} className="group relative  mr-2">
            <Image
              onClick={() => router.push(`/${user.username}`)}
              className="cursor-pointer rounded-full"
              width={50}
              height={50}
              src={user.profileImage || genderAvatar(user.gender)}
              alt="profile-image"
            />
            <div className="absolute left-1/2 bottom-0 hidden translate-y-full -translate-x-1/2 transform whitespace-nowrap rounded-lg bg-main p-2 text-xs text-white group-hover:block">{`${
              user.name
            }的生日是 ${dayjs(user.birthday).format('MM/DD')}`}</div>
          </span>
        ))}
      </div>
    </div>
  );
};

export default MonthlyBirthdays;
