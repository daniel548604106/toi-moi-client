import React, { useEffect, useState } from 'react';

import { SearchIcon } from '@heroicons/react/outline';
import axios from 'axios';
import Cookies from 'js-cookie';
import router from 'next/router';

import useAxios from '@/hooks/useAxios';

import EmptyFriendList from '@/components/friends/EmptyFriendList';
import Sidebar from '@/components/friends/Sidebar';
import Avatar from '@/components/global/Avatar';
import LoaderSpinner from '@/components/global/loader/LoaderSpinner';

const Lists = () => {
  const [friendsList, setFriendsList] = useState(null);
  const [searchedName, setSearchedName] = useState('');

  const {
    response: friends,
    isLoading: isFriendListLoading,
    error: friendListError,
  } = useAxios({
    method: 'get',
    url: '/friends',
  });
  const getSearchedName = async () => {
    const token = Cookies.get('token');
    try {
      const { data } = await axios.get(
        `${process.env.API_BASE_URL}/api/friends/search/${searchedName}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSearchedName();
  }, [searchedName]);

  useEffect(() => {
    if (friends !== null) {
      setFriendsList(friends);
    }
  }, [friends]);
  return (
    <div className="flex flex-col lg:flex-row">
      <div>
        <Sidebar />
      </div>
      {isFriendListLoading ? (
        <div className="flex flex-1 items-center justify-center lg:ml-[350px]">
          <LoaderSpinner />
        </div>
      ) : (
        <div className="flex-1 space-y-3 p-3 lg:ml-[350px]">
          <div className="mb-3 flex items-center justify-between">
            <h1 className="text-lg  font-semibold sm:text-2xl">All Friends</h1>
            <div className="flex items-center rounded-lg bg-secondary p-2 text-secondary shadow-lg ">
              <SearchIcon className="h-6" />
              <input
                onChange={(e) => setSearchedName(e.target.value)}
                className="outline-none ml-[10px] bg-none"
                type="text"
                placeholder="Search"
              />
            </div>
          </div>
          {friendsList && friendsList.length > 0 ? (
            friendsList.map(({ user }) => (
              <span
                onClick={() => router.push(`/${user.username}`)}
                key={user._id}
                className="flex cursor-pointer items-center rounded-lg bg-secondary p-3 text-secondary shadow-md hover:shadow-lg"
              >
                <Avatar
                  width={50}
                  height={50}
                  username={user.username}
                  profileImage={user.profileImage}
                  gender={user.gender}
                />
                <p className="ml-[10px]">{user.name}</p>
              </span>
            ))
          ) : (
            <EmptyFriendList />
          )}
        </div>
      )}
    </div>
  );
};

export default Lists;
