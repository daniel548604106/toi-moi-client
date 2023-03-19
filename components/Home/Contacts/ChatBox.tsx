import React, { useEffect, useRef, useState } from 'react';

import { XIcon } from '@heroicons/react/outline';
import { ThumbUpIcon } from '@heroicons/react/solid';

import { useAppDispatch, useAppSelector } from '@/hooks/useAppRedux';

import { getChatAPI } from '@/axios/chatRequest';

import Avatar from '@/components/Global/Avatar';
import { UserInfo } from '@/interfaces/I_common';
import { Message, User } from '@/interfaces/I_socket';
import { removeFromChatBoxList } from '@/redux/slices/messageSlice';

interface ChatBoxProps {
  handleSubmitMessage: (sender: string, msg: string) => void;
  newMessageReceived: Message;
  connectedUsers: User[];
  user: UserInfo;
}

const ChatBox = (props: ChatBoxProps) => {
  const { handleSubmitMessage, newMessageReceived, connectedUsers, user } = props;
  const dispatch = useAppDispatch();
  const { userInfo } = useAppSelector((state) => state.user);

  const scrollToRef = useRef<HTMLParagraphElement>();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isChatBoxOpen, setChatBoxOpen] = useState(true);

  const scrollToBottom = () => {
    scrollToRef.current !== null && scrollToRef?.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleRemoveChatBox = () => {
    dispatch(removeFromChatBoxList(user));
  };

  const handleSendMsg = (e) => {
    e.preventDefault();
    setMessages((messages) => [
      ...messages,
      {
        date: Date.now(),
        msg: newMessage,
        receiver: user._id,
        sender: userInfo._id,
      },
    ]);
    handleSubmitMessage(user._id, newMessage);
    setNewMessage('');
  };
  const getChat = async () => {
    try {
      const { data } = await getChatAPI(user._id);
      console.log(data);
      setMessages(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    messages.length > 0 && scrollToBottom();
  }, [messages]);

  useEffect(() => {
    getChat();
  }, [isChatBoxOpen]);

  useEffect(() => {
    if (newMessageReceived.sender === user._id) {
      setMessages((messages) => [...messages, newMessageReceived]);
      scrollToBottom();
    }
  }, [newMessageReceived]);

  return (
    <div className="w-[300px] rounded-t-lg border bg-secondary">
      <div
        onClick={() => setChatBoxOpen(!isChatBoxOpen)}
        className="flex cursor-pointer items-center justify-between rounded-t-lg bg-main p-2 text-white"
      >
        <div className="flex items-center space-x-2">
          <span>{user.name}</span>
          {connectedUsers.map((users) => users.userId).includes(user._id) && (
            <div className="h-[5px] w-[5px] rounded-full bg-green-300"></div>
          )}
        </div>
        <XIcon onClick={() => handleRemoveChatBox()} className="h-6" />
      </div>
      {isChatBoxOpen && (
        <div>
          <div className={`h-[350px] overflow-y-auto border p-2`}>
            {messages.length > 0 &&
              messages.map((message) => (
                <div key={message.date}>
                  {userInfo._id !== message.sender ? (
                    <div className="mb-2 flex flex-wrap items-center ">
                      <Avatar profileImage={user.profileImage} width={30} height={30} />
                      <p
                        ref={scrollToRef}
                        className="sm:text-md ml-2 max-w-[200px] rounded-lg border p-2 text-sm"
                      >
                        {message.msg}
                      </p>
                    </div>
                  ) : (
                    <div className="mb-2 flex flex-wrap items-center justify-end ">
                      <p
                        ref={scrollToRef}
                        className="sm:text-md  max-w-[200px] rounded-lg border bg-main p-2 text-sm text-white"
                      >
                        {message.msg}
                      </p>
                    </div>
                  )}
                </div>
              ))}
          </div>
          <div className="flex items-center p-2 ">
            <form
              onSubmit={(e) => handleSendMsg(e)}
              className=" mr-2 flex w-full items-center rounded-full border bg-secondary p-1"
            >
              <input
                className="w-full rounded-lg bg-secondary px-1 text-xs sm:text-sm"
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="write something.."
              />
            </form>
            <ThumbUpIcon className="h-6 text-main " />
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBox;
