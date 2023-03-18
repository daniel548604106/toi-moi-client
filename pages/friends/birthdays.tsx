import React, { useEffect, useState } from 'react';

import axios from 'axios';
import dayjs from 'dayjs';

import EmptyBirthday from '@/components/Friends/Birthdays/EmptyBirthday';
import MonthlyBirthdays from '@/components/Friends/Birthdays/MonthlyBirthdays';
import RecentBirthdays from '@/components/Friends/Birthdays/RecentBirthdays';
import Sidebar from '@/components/Friends/Sidebar';

const Birthdays = ({ friends }) => {
  const now = dayjs();

  const [recentBirthdays, setRecentBirthdays] = useState([]);
  const [monthlyBirthdays, setMonthlyBirthdays] = useState([]);

  const getRecentBirthdays = () => {
    const recent = friends.filter(
      (friend) => dayjs(friend.birthday).get('month') === now.get('month'),
    );
    setRecentBirthdays(recent);
    console.log(recent);
  };

  const getMonthlyBirthdays = () => {
    const nextMonth = +now.get('month') + 2;
    let deadline = 13;
    let list = [];
    for (let i = nextMonth; i < deadline; i++) {
      list.push({
        month: i + 1,
        birthdays: friends.filter((friend) => dayjs(friend.birthday).get('month') === i),
      });
      // reset to 0
      if (i === 12) {
        i = 0;
        deadline = nextMonth;
      }
    }
    setMonthlyBirthdays(list);
  };
  useEffect(() => {
    // Recent birthdays
    getRecentBirthdays();
    getMonthlyBirthdays();
  }, [friends]);
  return (
    <div className="flex flex-col  lg:flex-row">
      <div>
        <Sidebar />
      </div>
      <div className="lg:ml-[350px] flex-1 bg-primary p-5 ">
        {friends.length > 0 ? (
          <div className="mx-auto w-full max-w-[600px] space-y-4">
            {recentBirthdays.length > 0 && <RecentBirthdays recentBirthdays={recentBirthdays} />}
            {monthlyBirthdays.map(
              (month) =>
                month.birthdays.length > 0 && (
                  <MonthlyBirthdays
                    key={month.month}
                    month={month.month}
                    birthdays={month.birthdays}
                  />
                ),
            )}
          </div>
        ) : (
          <div className="mt-20">
            <EmptyBirthday />
          </div>
        )}
      </div>
    </div>
  );
};

export default Birthdays;

export async function getServerSideProps({ req }) {
  try {
    const token = req.cookies.token;
    const res = await axios.get(`${process.env.API_BASE_URL}/api/friends/birthdays`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return {
      props: {
        friends: res.data,
      },
    };
  } catch (error) {
    console.log(error);
  }
}
