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
        <div ref={divRef} key={message.date} className="mb-3 flex items-center">
          {message.sender !== user._id && receiverProfileImage && (
            <Image
              width="40"
              height="40"
              className="h-[30px] w-[30px] cursor-pointer rounded-full sm:h-[40px] sm:w-[40px] "
              src={receiverProfileImage || ''}
              alt="profile-image"
            />
          )}
          <span
            className={`sm:text-md ml-2 max-w-[300px] overflow-auto break-all  rounded-lg border  p-2 text-xs  ${
              message.sender === user._id ? 'ml-auto bg-main text-white' : ''
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
