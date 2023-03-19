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
    <div className="relative w-full max-w-[600px] rounded-lg bg-secondary p-5   text-secondary">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <ThumbUpIcon className="h-6 cursor-pointer text-main" />
          <span className="ml-[5px] text-sm text-gray-600">{likesList.length}</span>
        </div>
        <span
          onClick={() => dispatch(setLikesListOpen(false))}
          className="cursor-pointer rounded-full bg-gray-100 p-2"
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
                  <span className="absolute bottom-[5px] right-0 rounded-full bg-main p-1">
                    <ThumbUpIcon className="h-2 text-white " />
                  </span>
                </span>
                <span className="sm:text-md ml-[15px] cursor-pointer overflow-hidden truncate text-xs hover:underline">
                  {like.user.name}
                </span>
              </div>
              {like.user._id !== userInfo._id &&
                !friendsList.map((user) => user._id).includes(like.user._id) && (
                  <button className="flex items-center rounded-md bg-gray-200 p-2 px-3">
                    <UserAddIcon className="h-6" />
                    <span className="sm:text-md ml-[5px] text-xs">Add friend</span>
                  </button>
                )}
              {friendsList.map((user) => user._id).includes(like.user._id) && (
                <button className="flex items-center rounded-md bg-main p-2 px-3 text-white">
                  <UserIcon className="h-6" />
                  <span className="sm:text-md ml-[5px] text-xs">Friend</span>
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
