import React, { useState } from 'react';

import { ChevronRightIcon, ClockIcon, UsersIcon, VideoCameraIcon } from '@heroicons/react/outline';

import { useAppSelector } from '@/hooks/useAppRedux';

import { postNewRoomAPI } from '@/axios/roomRequest';

import Loader from '@/components/Global/Loader';

import CreateRoomListItem from './CreateRoomListItem';
import CreateRoomName from './CreateRoomName';

const CreateRoom = ({ setRoomCreated, setRoomCode }) => {
  const { userInfo } = useAppSelector((state) => state.user);
  const [createNameOpen, setCreateNameOpen] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [roomInfo, setRoomInfo] = useState({
    name: `${userInfo.name}'s room`,
    icon: '😊',
    starting_time: undefined,
    public: false,
  });

  const handleCreateRoom = async () => {
    setLoading(true);
    try {
      const { data } = await postNewRoomAPI(roomInfo);
      setRoomCode(data.room_code);
      setLoading(false);
      setRoomCreated(true);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" space-y-2">
      {createNameOpen ? (
        <CreateRoomName
          roomInfo={roomInfo}
          setRoomInfo={setRoomInfo}
          setCreateNameOpen={setCreateNameOpen}
        />
      ) : (
        <div>
          <div className="flex flex-col items-center justify-center space-y-2">
            <span className="flex h-[60px] w-[60px] items-center justify-center rounded-full border sm:h-[100px] sm:w-[100px]">
              <VideoCameraIcon className="h-6 sm:h-10" />
            </span>
            <h2 className="text-lg font-semibold sm:text-xl">建立你的包廂</h2>
          </div>
          <div onClick={() => setCreateNameOpen(true)}>
            <CreateRoomListItem
              Icon={roomInfo.icon}
              RightIcon={ChevronRightIcon}
              title="包廂名稱"
              subtitle={roomInfo.name}
            />
          </div>
          <CreateRoomListItem
            Icon={ClockIcon}
            RightIcon={ChevronRightIcon}
            title="時間"
            subtitle={roomInfo.starting_time ? roomInfo.starting_time : 'Now'}
          />
          <CreateRoomListItem
            Icon={UsersIcon}
            RightIcon={ChevronRightIcon}
            title="向所有朋友顯示"
            subtitle="現在"
          />

          <button
            onClick={() => handleCreateRoom()}
            className="outline-none sm:text-md flex w-full items-center justify-center rounded-lg bg-main p-3 text-sm text-white"
          >
            {isLoading ? <Loader /> : 'Create Room'}
          </button>
        </div>
      )}
    </div>
  );
};

export default CreateRoom;
