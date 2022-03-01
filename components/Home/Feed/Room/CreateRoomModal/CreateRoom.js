import React, { useState } from 'react';
import {
  VideoCameraIcon,
  ChevronRightIcon,
  HandIcon,
  ClockIcon,
  UsersIcon,
} from '@heroicons/react/outline';
import CreateRoomListItem from './CreateRoomListItem';
import CreateRoomName from './CreateRoomName';
import Loader from '../../../../Global/Loader';
import { useSelector } from 'react-redux';
import { apiPostNewRoom } from '@/Axios/index';
const CreateRoom = ({ setRoomCreated, setRoomCode }) => {
  const { userInfo } = useSelector((state) => state.user);
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
      const { data } = await apiPostNewRoom(roomInfo);
      setRoomCode(data.room_code);
      setLoading(false);
      setRoomCreated(true);
    } catch (error) {
      console.log(error);
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
            <span className="border w-[60px] h-[60px] sm:w-[100px] sm:h-[100px] rounded-full flex items-center justify-center">
              <VideoCameraIcon className="h-6 sm:h-10" />
            </span>
            <h2 className="text-lg sm:text-xl font-semibold">建立你的包廂</h2>
          </div>
          <div onClick={() => setCreateNameOpen(true)}>
            <CreateRoomListItem
              icon={roomInfo.icon}
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
            className="flex outline-none items-center justify-center text-sm sm:text-md rounded-lg p-3 w-full bg-main text-white"
          >
            {isLoading ? <Loader /> : 'Create Room'}
          </button>
        </div>
      )}
    </div>
  );
};

export default CreateRoom;
