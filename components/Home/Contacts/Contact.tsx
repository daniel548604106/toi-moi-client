import React from 'react';
import { useDispatch } from 'react-redux';

import { UserInfo } from '@/interfaces/I_common';
import { User } from '@/interfaces/I_socket';
import { addToChatBoxList } from '@/redux/slices/messageSlice';

import genderAvatar from '@/utils/genderAvatar';

interface ContactProps {
  user: UserInfo;
  connectedUsers: User[];
}
const Contact = (props: ContactProps) => {
  const { user, connectedUsers } = props;
  const dispatch = useDispatch();
  const handleOpenChatBox = () => {
    dispatch(addToChatBoxList(user));
  };
  return (
    <div
      onClick={() => handleOpenChatBox()}
      className="mb-2 flex cursor-pointer items-center space-x-3 rounded-md py-1  px-3 hover:bg-gray-200"
    >
      <span className="relative flex items-center">
        <img
          className="h-[40px] w-[40px] rounded-full object-cover"
          src={user?.profileImage || genderAvatar(user?.gender)}
        />
        {connectedUsers.map((connectedUser) => connectedUser.userId).includes(user._id) && (
          <div className="absolute bottom-[5px] right-0 z-40 h-2 w-2 rounded-full bg-green-400"></div>
        )}
      </span>
      <p>{user?.name}</p>
    </div>
  );
};

export default Contact;
