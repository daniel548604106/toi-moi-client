import React from 'react';

import { DotsHorizontalIcon } from '@heroicons/react/solid';
import Image from 'next/image';
import { useRouter } from 'next/router';

interface MessageDropDownListProps {
  message: any;
}
const MessageDropDownList = ({ message }: MessageDropDownListProps) => {
  const router = useRouter();
  return (
    <div
      onClick={() => router.push(`/messages?message=${message?.messagesWith}`)}
      className="group relative mb-3  flex cursor-pointer items-center rounded-lg p-2 hover:bg-gray-100"
    >
      <Image
        className="cursor-pointer rounded-full"
        src={message?.profileImage}
        width={60}
        layout="fixed"
        height={60}
        alt="profile-image"
      />
      <div className="ml-[10px]">
        <p>{message.name}</p>
        <p className="overflow-hidden truncate text-gray-500">{message.lastMessage}</p>
      </div>
      <span className="absolute top-1/2  right-4 hidden -translate-y-1/2 transform cursor-pointer rounded-full bg-secondary  p-2 text-secondary shadow-lg group-hover:block">
        <DotsHorizontalIcon className="h-6" />
      </span>
    </div>
  );
};

export default MessageDropDownList;
