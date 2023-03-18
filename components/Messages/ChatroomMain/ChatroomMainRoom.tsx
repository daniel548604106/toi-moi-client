import { LegacyRef } from 'react';

import Image from 'next/image';

import { UserInfo } from '@/interfaces/I_common';

interface ChatroomMainRoomProps {
  messages: any;
  divRef: LegacyRef<HTMLDivElement>;
  receiverProfileImage: string;
  user: UserInfo;
}
const ChatroomMainRoom = (props: ChatroomMainRoomProps) => {
  const { messages, divRef, receiverProfileImage, user } = props;
  return (
    <div className="h-full overflow-y-auto border-b p-5">
      {messages.map((message) => (
        <div ref={divRef} key={message.date} className="flex items-center mb-3">
          {message.sender !== user._id && receiverProfileImage && (
            <Image
              width="40"
              height="40"
              className="w-[30px] h-[30px] sm:w-[40px] sm:h-[40px] rounded-full cursor-pointer "
              src={receiverProfileImage || ''}
              alt="profile-image"
            />
          )}
          <span
            className={`text-xs sm:text-md max-w-[300px] overflow-auto break-all  p-2 rounded-lg  ml-2 border  ${
              message.sender === user._id ? 'bg-main text-white ml-auto' : ''
            }`}
          >
            {message.msg}
          </span>
        </div>
      ))}
    </div>
  );
};

export default ChatroomMainRoom;
