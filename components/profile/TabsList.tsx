import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import { postFriendRequestAPI, removeFriendRequestAPI } from '@/axios/friendRequest';
import { useAppSelector } from '@/hooks/useAppRedux';
import {
  ChatAlt2Icon,
  DotsHorizontalIcon,
  PencilAltIcon,
  UserAddIcon,
  UsersIcon,
} from '@heroicons/react/outline';
import { CheckIcon, ChevronDownIcon, PlusCircleIcon } from '@heroicons/react/solid';

const tabs = [
  {
    title: 'posts',
    link: '/',
  },
  {
    title: 'friends',
    link: 'friends',
  },
  {
    title: 'photos',
    link: 'photos',
  },
  {
    title: 'about',
    link: 'about',
  },
  {
    title: 'stories',
    link: 'stories',
  },
];

const hiddenTabs = [
  {
    title: 'saved',
    link: 'saved',
  },
];

const TabsList = ({ user, friends_total, friend_status }) => {
  const router = useRouter();

  const userInfo = useAppSelector((state) => state.user.userInfo);

  const [activeTab, setActiveTab] = useState(router.query.tab);
  const [visibleTabs, setVisibleTabs] = useState(tabs);
  const [moreTabs, setMoreTabs] = useState(hiddenTabs);
  const [friendStatus, setFriendStatus] = useState(friend_status);
  const isLoggedInUser = router.query.id === userInfo.username;

  const handleSendFriendRequest = async () => {
    try {
      setFriendStatus('friendRequested');
      const { data } = await postFriendRequestAPI(router.query.id);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleRemoveRequest = async () => {
    try {
      setFriendStatus('unfriend');
      const { data } = await removeFriendRequestAPI(router.query.id);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAcceptInvitation = async () => {
    try {
      setFriendStatus('friend');
      const { data } = await postFriendRequestAPI(router.query.id);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    setActiveTab(router.query.tab);
  }, [router.query.tab]);

  return (
    <div className="flex  items-center justify-between border-t  bg-secondary p-3 text-secondary">
      <div className="flex items-center font-semibold capitalize text-gray-600">
        {visibleTabs.slice(0, 0).map((tab) => (
          <span
            key={tab.title}
            className={`cursor-pointer rounded-lg p-3   text-xs  hover:bg-gray-100 sm:text-sm ${
              (activeTab === tab.title || (tab.title === 'posts' && !router.query.tab)) &&
              'rounded-none border-b border-main text-main hover:bg-opacity-0'
            }`}
            onClick={() => router.push(`/${router.query.id}/${tab.link}`)}
          >
            {tab.title} {tab.title === 'friends' && friends_total}
          </span>
        ))}
        <span className="relative hidden cursor-pointer items-center rounded-lg p-3 text-xs hover:bg-gray-100  sm:flex sm:text-sm">
          More
          <ChevronDownIcon className="h-4" />
          <div className="absolute bottom-0 left-0 hidden w-[300px] translate-y-full transform rounded-lg border bg-secondary p-2 text-secondary shadow-xl">
            {moreTabs.map((tab) => (
              <div key={tab.title}>{tab.title}</div>
            ))}
          </div>
        </span>
      </div>
      {isLoggedInUser ? (
        <div className="flex items-center  space-x-3">
          <button
            onClick={() => router.push('/stories/create')}
            className="flex items-center  rounded-md bg-main px-3 py-2 text-white"
          >
            <PlusCircleIcon className="mr-2 h-6" />
            <span className="text-xs sm:text-sm"> Add New Stories</span>
          </button>
          <button className="flex items-center  rounded-md  bg-button py-2 px-3">
            <PencilAltIcon className="mr-2 h-6" />
            <span className="text-xs sm:text-sm"> Edit Profile</span>
          </button>
          <button className="rounded-md bg-button  py-2  px-3">
            <DotsHorizontalIcon className="h-6" />
          </button>
        </div>
      ) : (
        <div className="flex items-center  space-x-3">
          {friendStatus === 'unfriend' && (
            <button
              onClick={() => handleSendFriendRequest()}
              className="flex items-center rounded-md bg-gray-100 py-2  px-3 text-xs text-black sm:text-sm"
            >
              <UserAddIcon className="mr-2 h-6" />
              Add Friend
            </button>
          )}
          {friendStatus === 'friendRequested' && (
            <button
              onClick={() => handleRemoveRequest()}
              className="flex items-center rounded-md bg-gray-100  py-2 px-3 text-xs sm:text-sm"
            >
              <CheckIcon className="mr-2 h-6" />
              Request Sent
            </button>
          )}
          {friendStatus === 'friendInvited' && (
            <button
              onClick={() => handleAcceptInvitation()}
              className="flex items-center rounded-md border  border-main py-2 px-3  text-xs text-main sm:text-sm"
            >
              <CheckIcon className="mr-2 h-6" />
              Accept Invitation
            </button>
          )}
          {friendStatus === 'friend' && (
            <button
              onClick={() => handleRemoveRequest()}
              className="flex items-center rounded-md border  border-main py-2 px-3  text-xs text-main sm:text-sm"
            >
              <UsersIcon className="mr-2 h-6" />
              Friend
            </button>
          )}
          <button
            onClick={() => router.push(`/messages?messageWith=${user._id}`)}
            className="flex items-center rounded-md bg-main  px-3 py-2 text-xs text-white sm:text-sm"
          >
            <ChatAlt2Icon className="mr-2 h-6" />
            Message
          </button>
          <button className="rounded-md bg-gray-100 py-2  px-3 text-black">
            <DotsHorizontalIcon className="h-6" />
          </button>
        </div>
      )}
    </div>
  );
};

export default TabsList;
