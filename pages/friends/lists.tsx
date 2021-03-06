import axios from 'axios';
import Cookies from 'js-cookie';
import router from 'next/router';
import React, { useEffect, useState } from 'react';

import EmptyFriendList from '@/Components/Friends/EmptyFriendList';
import Sidebar from '@/Components/Friends/Sidebar';
import Avatar from '@/Components/Global/Avatar';
import LoaderSpinner from '@/Components/Global/LoaderSpinner';
import useAxios from '@/Hooks/useAxios';
import { SearchIcon } from '@heroicons/react/outline';

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
        <div className="lg:ml-[350px] flex-1 flex items-center justify-center">
          <LoaderSpinner />
        </div>
      ) : (
        <div className="lg:ml-[350px] flex-1 p-3 space-y-3">
          <div className="flex mb-3 items-center justify-between">
            <h1 className="text-lg  sm:text-2xl font-semibold">All Friends</h1>
            <div className="flex shadow-lg items-center rounded-lg p-2 bg-secondary text-secondary ">
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
                className="p-3 cursor-pointer text-secondary hover:shadow-lg bg-secondary rounded-lg shadow-md flex items-center"
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
