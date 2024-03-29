import React, { useState } from 'react';

import { GiftIcon, PhotographIcon, PlusIcon, ThumbUpIcon } from '@heroicons/react/solid';

interface ChatroomMainInputBoxProps {
  sendMsg: (string) => void;
  t: (string) => string;
}

const ChatroomMainInputBox = (props: ChatroomMainInputBoxProps) => {
  const { sendMsg, t } = props;
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmitMessage = (e, msg) => {
    setLoading(true);
    try {
      e.preventDefault();
      sendMsg(msg);
      setInputText('');
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center border-b p-2">
      <div className="flex items-center space-x-2">
        <PlusIcon className="h-5 text-main" />
        <PhotographIcon className="h-5 text-main" />
        <GiftIcon className="h-5 text-main" />
      </div>
      <div className="ml-3  w-full rounded-xl">
        <form onSubmit={(e) => handleSubmitMessage(e, inputText)}>
          <input
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className=" sm:text-md focus:outline-none max-h-[100px] w-full overflow-y-scroll rounded-full bg-gray-100  py-2 px-5 text-sm text-gray-500"
            placeholder={t('sendNewMessage')}
          />
        </form>
      </div>
      <ThumbUpIcon
        onClick={(e) => handleSubmitMessage(e, inputText)}
        className="ml-2 h-6 text-main"
      />
    </div>
  );
};

export default ChatroomMainInputBox;
