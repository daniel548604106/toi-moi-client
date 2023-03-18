import React, { useEffect } from 'react';

import { ThumbUpIcon, UserAddIcon, UserIcon, XIcon } from '@heroicons/react/solid';
import { useRouter } from 'next/router';

import { useAppDispatch, useAppSelector } from '@/hooks/useAppRedux';

import Avatar from '@/components/Global/Avatar';
import LoaderSpinner from '@/components/Global/LoaderSpinner';
import { setLikesListOpen } from '@/redux/slices/postSlice';

const LikesListModal = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const userInfo = useAppSelector((state) => state.user.userInfo);
  const { likesList } = useAppSelector((state) => state.post);
  const friendsList = useAppSelector((state) => state.user.friendsList);

  const handleDirectToProfile = (like) => {
    dispatch(setLikesListOpen(false));
    router.push(`/${like.user.username}`);
  };

  return (
    <div className="rounded-lg relative bg-secondary text-secondary w-full max-w-[600px]   p-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <ThumbUpIcon className="h-6 text-main cursor-pointer" />
          <span className="ml-[5px] text-sm text-gray-600">{likesList.length}</span>
        </div>
        <span
          onClick={() => dispatch(setLikesListOpen(false))}
          className="cursor-pointer p-2 bg-gray-100 rounded-full"
        >
          <XIcon className="h-6" />
        </span>
      </div>
      <hr className="my-[10px]" />
      <div className="h-full max-h-[50vh] overflow-y-auto">
        {likesList.length > 0 ? (
          likesList.map((like) => (
            <div key={like._id} className="flex items-center justify-between p-2">
              <div onClick={() => handleDirectToProfile(like)} className="flex items-center">
                <span className="relative">
                  <Avatar
                    profileImage={like.user.profileImage}
                    gender={like.user.gender}
                    username={like.user.username}
                    width={50}
                    height={50}
                  />
                  <span className="absolute bottom-[5px] right-0 p-1 rounded-full bg-main">
                    <ThumbUpIcon className="h-2 text-white " />
                  </span>
                </span>
                <span className="ml-[15px] cursor-pointer text-xs sm:text-md truncate overflow-hidden hover:underline">
                  {like.user.name}
                </span>
              </div>
              {like.user._id !== userInfo._id &&
                !friendsList.map((user) => user._id).includes(like.user._id) && (
                  <button className="rounded-md p-2 px-3 flex items-center bg-gray-200">
                    <UserAddIcon className="h-6" />
                    <span className="ml-[5px] text-xs sm:text-md">Add friend</span>
                  </button>
                )}
              {friendsList.map((user) => user._id).includes(like.user._id) && (
                <button className="rounded-md p-2 px-3 flex items-center bg-main text-white">
                  <UserIcon className="h-6" />
                  <span className="ml-[5px] text-xs sm:text-md">Friend</span>
                </button>
              )}
            </div>
          ))
        ) : (
          <div>
            <LoaderSpinner />
          </div>
        )}
      </div>
    </div>
  );
};

export default LikesListModal;
