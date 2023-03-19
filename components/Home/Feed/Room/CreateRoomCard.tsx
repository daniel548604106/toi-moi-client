import React from 'react';

import { useAppDispatch, useAppSelector } from '@/hooks/useAppRedux';
import { toggleCreateRoomOpen } from '@/redux/slices/globalSlice';
import { VideoCameraIcon } from '@heroicons/react/outline';

const CreateRoomCard = () => {
  const dispatch = useAppDispatch();
  const { userInfo } = useAppSelector((state) => state.user);
  return (
    <div className="flex  w-[100px]  flex-shrink-0 flex-col items-center justify-center space-y-1 rounded-lg border bg-secondary p-2 sm:w-[150px] sm:space-y-3">
      <span className="flex h-[60px] w-[60px] items-center justify-center rounded-full border border-main text-main">
        <VideoCameraIcon className="h-6 sm:h-9" />
      </span>
      <div className="text-center">
        <p className="sm:text-md text-sm font-semibold">{userInfo.name}</p>
        <p className="text-xs sm:text-sm">Get started</p>
      </div>
      <button
        onClick={() => dispatch(toggleCreateRoomOpen())}
        className="focus:outline-none w-full rounded-lg border p-2 text-xs sm:text-sm"
      >
        Create
      </button>
    </div>
  );
};

export default CreateRoomCard;
