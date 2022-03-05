import React, { useState } from 'react';

import { useAppDispatch } from '@/Hooks/useAppRedux';
import { toggleCreateRoomOpen } from '@/Redux/slices/globalSlice';
import { XIcon } from '@heroicons/react/outline';

import CreateRoom from './CreateRoom';
import InviteRoom from './InviteRoom';

const CreateRoomModal = () => {
  const dispatch = useAppDispatch();
  const [roomCode, setRoomCode] = useState('');
  const [roomCreated, setRoomCreated] = useState(false);
  return (
    <div className="h-screen sm:max-h-[70vh] sm:h-auto overflow-y-auto relative w-full sm:max-w-[600px] rounded-lg p-3 sm:p-5 bg-secondary text-secondary">
      <span
        onClick={() => dispatch(toggleCreateRoomOpen())}
        className="z-50 absolute cursor-pointer top-4 right-2 rounded-full p-2 bg-button text-secondary"
      >
        <XIcon className="h-6" />
      </span>
      {roomCreated ? (
        <InviteRoom roomCode={roomCode} />
      ) : (
        <CreateRoom setRoomCode={setRoomCode} setRoomCreated={setRoomCreated} />
      )}
    </div>
  );
};

export default CreateRoomModal;
