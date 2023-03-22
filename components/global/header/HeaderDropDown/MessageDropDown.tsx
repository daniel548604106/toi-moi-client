import React, { ReactNode, useEffect, useState } from 'react';

import {
  DotsHorizontalIcon,
  PencilAltIcon,
  SearchIcon,
  VideoCameraIcon
} from '@heroicons/react/solid';
import { useRouter } from 'next/router';

import { getAllChatsAPI } from '@/axios/chatRequest';

import EmptyChat from '../../../messages/EmptyChat';
import ToolTips from '../../ToolTips';
import MessageDropDownList from './MesseageDropDownList';

interface MessageDropDownProps {
  t: (text: string) => string;
}

const MessageDropDown = ({ t }: MessageDropDownProps) => {
  const [messages, setMessages] = useState([]);
  const router = useRouter();
  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await getAllChatsAPI();
        setMessages(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getMessages();
  }, []);
  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Messenger</h2>
        <div className="flex items-center">
          <span className="group relative">
            <PencilAltIcon className="h-6" />
            <ToolTips>編輯</ToolTips>
          </span>
          <span className="group relative">
            <VideoCameraIcon className="h-6" />
            <ToolTips>建立新的包廂</ToolTips>
          </span>
          <span className="group relative">
            <DotsHorizontalIcon className="h-6" />
            <ToolTips>更多選項</ToolTips>
          </span>
        </div>
      </div>
      <div className="m-2 flex w-full  items-center rounded-full  bg-gray-100 p-1 pl-3">
        <SearchIcon className="mr-[10px] h-5 text-gray-400" />
        <input
          className="focus:outline-none bg-gray-100"
          type="text"
          placeholder={t('searchMessenger')}
        />
      </div>
      {messages.length > 0 ? (
        messages.map((message) => (
          <MessageDropDownList key={message.messagesWith} message={message} />
        ))
      ) : (
        <div className="my-3">
          <EmptyChat />
        </div>
      )}

      <div
        onClick={() => router.push('/messages')}
        className="cursor-pointer border-t pt-2 text-center text-main hover:underline"
      >
        {t('viewAllInMessenger')}
      </div>
    </div>
  );
};

export default MessageDropDown;
