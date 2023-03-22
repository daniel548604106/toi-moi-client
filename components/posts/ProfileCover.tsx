import React from 'react';

import { DotsHorizontalIcon, PlusIcon, UserIcon } from '@heroicons/react/outline';
import Image from 'next/image';
import router from 'next/router';

import { useAppSelector } from '@/hooks/useAppRedux';

import { UserInfo } from '@/interfaces/I_common';

interface ProfileCoverProps {
  user: UserInfo;
  profile: any;
}

const ProfileCover = (props: ProfileCoverProps) => {
  const { user, profile } = props;
  const userInfo = useAppSelector((state) => state.user.userInfo);
  const isLoggedInUser = router.query.id === userInfo.username;

  if (!profile) return <div>Loading</div>;
  return (
    <div>
      <div className="relative ">
        <Image
          src={profile?.profileCoverImage}
          layout="responsive"
          width={1000}
          height={450}
          alt="profile-cover-image"
          className="relative  h-[100px] w-full cursor-pointer rounded-b-lg object-cover"
        />
        <div className="border-b bg-secondary px-10 py-16 text-secondary sm:py-20">
          <div className="absolute bottom-[50px] left-[30px] flex items-end ">
            <Image
              src={user?.profileImage}
              width={130}
              height={130}
              alt="profile-image"
              className="outline-white cursor-pointer rounded-full border-2 border-gray-700 object-cover"
            />
            <div className="ml-[20px]">
              <h2 className="text-2xl font-semibold sm:text-4xl">{user.name}</h2>
              <span className="text-md text-gray-500">@{user?.username}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="item-center  flex justify-between border-t bg-secondary p-3 text-secondary">
        <ul className="sm:text-md hidden items-center space-x-1 text-sm text-gray-600 sm:flex md:space-x-3">
          <li className="cursor-pointer rounded-lg p-2 px-2 hover:bg-gray-100 md:px-4">Homepage</li>
          <li className="cursor-pointer rounded-lg p-2 px-2 hover:bg-gray-100 md:px-4">Photo</li>
          <li className="cursor-pointer rounded-lg p-2 px-2 hover:bg-gray-100 md:px-4 ">About</li>
        </ul>
        <button className="cursor-pointer rounded-lg bg-gray-100 p-2 px-4 text-sm sm:hidden ">
          More
        </button>
        <div className="flex items-center">
          {isLoggedInUser ? (
            <button className="flex items-center whitespace-nowrap rounded-md bg-main px-4 py-2 text-white">
              <PlusIcon className=" mr-[10px] h-6 text-sm" />
              Add Stories
            </button>
          ) : (
            <button className="flex items-center whitespace-nowrap rounded-md bg-main px-4 py-2 text-white">
              <UserIcon className=" mr-[10px] h-6 text-sm" />
              Add Friend
            </button>
          )}
          <button className="ml-[10px] rounded-md bg-gray-100 px-4 py-2">
            <DotsHorizontalIcon className=" h-6 text-sm" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileCover;
