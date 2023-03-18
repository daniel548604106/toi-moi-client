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
      className="mb-2 flex items-center space-x-3 py-1 px-3 rounded-md  hover:bg-gray-200 cursor-pointer"
    >
      <span className="relative flex items-center">
        <img
          className="w-[40px] object-cover h-[40px] rounded-full"
          src={user?.profileImage || genderAvatar(user?.gender)}
        />
        {connectedUsers.map((connectedUser) => connectedUser.userId).includes(user._id) && (
          <div className="absolute bottom-[5px] right-0 bg-green-400 w-2 h-2 rounded-full z-40"></div>
        )}
      </span>
      <p>{user?.name}</p>
    </div>
  );
};

export default Contact;
