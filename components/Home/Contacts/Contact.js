import React from 'react';
import genderAvatar from '@/Utils/genderAvatar';
import { useDispatch } from 'react-redux';
import { addToChatBoxList } from '@/Redux/slices/messageSlice';
const Contact = ({ user, connectedUsers }) => {
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
          src={user.profileImage || genderAvatar(user.gender)}
        />
        {connectedUsers.map((users) => users.userId).includes(user._id) && (
          <div className="absolute bottom-[5px] right-0 bg-green-400 w-2 h-2 rounded-full z-40"></div>
        )}
      </span>
      <p>{user.name}</p>
    </div>
  );
};

export default Contact;
