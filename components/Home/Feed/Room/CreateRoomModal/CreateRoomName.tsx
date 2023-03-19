import React, { useState } from 'react';

import { ChevronLeftIcon, PlusIcon, UserIcon, XIcon } from '@heroicons/react/outline';

import { newIcons, roomNames } from '@/utils/roomEmoji';

interface CreateRoomNameProps {
  setRoomInfo: (any) => void;
  roomInfo: any;
  setCreateNameOpen: (boolean) => void;
}

const CreateRoomName = (props: CreateRoomNameProps) => {
  const { setRoomInfo, roomInfo, setCreateNameOpen } = props;
  const [newNameOpen, setNewNameOpen] = useState(false);
  const [currentRoomInfo, setCurrentRoomInfo] = useState({
    name: roomInfo.name,
    icon: roomInfo.icon,
  });
  const handleSelectName = (room) => {
    setRoomInfo({ ...roomInfo, name: room.name, icon: room.icon });
    setCreateNameOpen(false);
  };
  const handleChangeNewName = (value) => {
    setCurrentRoomInfo({ ...currentRoomInfo, name: value });
  };
  const handleSelectNewIcon = (icon) => {
    setCurrentRoomInfo({ ...currentRoomInfo, icon });
  };
  const handleSaveRoomInfo = () => {
    setRoomInfo({
      ...roomInfo,
      name: currentRoomInfo.name,
      icon: currentRoomInfo.icon,
    });
    setCreateNameOpen(false);
  };
  return (
    <div>
      {newNameOpen ? (
        <div>
          <div className="relative flex items-center bg-secondary text-secondary">
            <span
              onClick={() => setNewNameOpen(false)}
              className="cursor-pointer rounded-full bg-secondary p-2 text-secondary shadow-lg"
            >
              <ChevronLeftIcon className="h-6" />
            </span>
            <h2 className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform text-lg font-semibold sm:text-xl">
              New Room Name
            </h2>
          </div>
          <hr className="my-4" />
          <div>
            <div className="flex w-full items-center rounded-lg border p-3">
              <span className="mr-4 flex h-[50px] w-[50px] items-center justify-center rounded-full bg-secondary">
                <span className="text-lg sm:text-2xl">{currentRoomInfo.icon}</span>
              </span>
              <div>
                <p className="text-xs text-main">Room Name</p>
                <input
                  className="focus:outline-none "
                  value={currentRoomInfo.name}
                  onChange={(e) => handleChangeNewName(e.target.value)}
                  type="text"
                  placeholder="New Name"
                />
              </div>
            </div>
            <div className="mt-4 space-y-3">
              <h2 className="text-lg font-semibold text-secondary sm:text-xl">Choose Emoji</h2>
              <div className="grid grid-cols-8">
                {newIcons.map((icon) => (
                  <div
                    key={icon}
                    onClick={() => handleSelectNewIcon(icon)}
                    className=" cursor-pointer rounded-full p-3"
                  >
                    <span className="text-lg sm:text-2xl">{icon}</span>
                  </div>
                ))}
              </div>
              <button
                onClick={() => handleSaveRoomInfo()}
                className="w-full rounded-lg bg-main p-2 text-white hover:opacity-80"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div className="relative flex items-center bg-secondary text-secondary">
            <span
              onClick={() => setCreateNameOpen(false)}
              className="cursor-pointer rounded-full bg-secondary p-2 text-secondary shadow-lg"
            >
              <ChevronLeftIcon className="h-6" />
            </span>
            <h2 className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform text-lg font-semibold sm:text-xl">
              Room Name
            </h2>
          </div>
          <hr className="my-4" />
          <div className="flex max-h-[60vh] flex-shrink-0 flex-wrap items-center overflow-y-auto whitespace-nowrap sm:max-h-[40vh]">
            <div
              onClick={() => setNewNameOpen(true)}
              className="flex  min-w-[50%] cursor-pointer items-center rounded-lg p-3"
            >
              <span className="mr-2 rounded-full p-2 shadow-lg">
                <PlusIcon className="h-6" />
              </span>
              <span>New Event</span>
            </div>
            {roomNames.map((room) => (
              <div
                key={room.name}
                onClick={() => handleSelectName(room)}
                className="hover:scale-120 min-w-[50%] cursor-pointer rounded-lg p-3 transition-all hover:brightness-110"
              >
                <span className="mr-2 rounded-full p-2 shadow-lg">
                  <span className="text-lg sm:text-2xl">{room.icon}</span>
                </span>
                <span>{room.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateRoomName;
