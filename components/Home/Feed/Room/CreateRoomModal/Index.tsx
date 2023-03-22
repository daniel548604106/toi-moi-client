import React, { useState } from 'react';

import { XIcon } from '@heroicons/react/outline';

import { useAppDispatch } from '@/hooks/useAppRedux';

import { toggleCreateRoomOpen } from '@/redux/slices/globalSlice';

import CreateRoom from './CreateRoom';
import InviteRoom from './InviteRoom';

const CreateRoomModal = () => {
  const dispatch = useAppDispatch();
  const [roomCode, setRoomCode] = useState('');
  const [roomCreated, setRoomCreated] = useState(false);
  return (
    <div className="relative h-screen w-full overflow-y-auto rounded-lg bg-secondary p-3 text-secondary sm:h-auto sm:max-h-[70vh] sm:max-w-[600px] sm:p-5">
      <span
        onClick={() => dispatch(toggleCreateRoomOpen())}
        className="absolute top-4 right-2 z-50 cursor-pointer rounded-full bg-button p-2 text-secondary"
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
