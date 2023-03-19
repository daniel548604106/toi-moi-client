import React from 'react';

import dayjs from 'dayjs';

import Avatar from '@/components/Global/Avatar';

import BirthdayCardLayout from './BirthdayCardLayout';

interface RecentBirthdaysProps {
  recentBirthdays: any;
}

const RecentBirthdays = ({ recentBirthdays }: RecentBirthdaysProps) => {
  return (
    <BirthdayCardLayout title="Recent Birthdays">
      {recentBirthdays.map((recentBirthday) => (
        <div className="flex items-center border-b p-5 py-5" key={recentBirthday._id}>
          <Avatar
            width={60}
            height={60}
            username={recentBirthday.username}
            profileImage={recentBirthday.profileImage}
            gender={recentBirthday.gender}
          />
          <div className="ml-[20px] flex-1">
            <p className="text-md font-semibold sm:text-lg">{recentBirthday.name}</p>
            <p className="text-xs text-secondary sm:text-sm">
              <span>{+dayjs(recentBirthday.birthday).get('month') + 1}</span>
              <span>/</span>
              <span>{dayjs(recentBirthday.birthday).get('date')}</span>
            </p>
            <input
              className="sm:text-md outline-none w-full rounded-full bg-button p-2 px-5 text-sm text-primary shadow-md"
              type="text"
              placeholder={`Post on ${recentBirthday.gender === 'female' ? 'her' : 'his'} profile`}
            />
          </div>
        </div>
      ))}
    </BirthdayCardLayout>
  );
};

export default RecentBirthdays;
