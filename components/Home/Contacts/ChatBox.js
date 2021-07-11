import React, { useState, useEffect } from 'react';
import { XIcon } from '@heroicons/react/outline';
import { ThumbUpIcon } from '@heroicons/react/solid';
import { apiGetChat } from '../../../api/index';
import { useSelector, useDispatch } from 'react-redux';
import Avatar from '../../Global/Avatar';
import { removeFromChatBoxList } from '../../../redux/slices/messageSlice';
const ChatBox = ({ handleSubmitMessage, scrollToBottom, user, divRef }) => {
  const dispatch = useDispatch();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isChatBoxOpen, setChatBoxOpen] = useState(true);
  const { userInfo } = useSelector((state) => state.user);

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
        sender: userInfo._id
      }
    ]);
    handleSubmitMessage(user._id, newMessage);
    setNewMessage('');
  };
  const getChat = async () => {
    try {
      const { data } = await apiGetChat(user._id);
      console.log(data);
      setMessages(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    messages.length > 0 && scrollToBottom(divRef);
  }, [messages]);

  useEffect(() => {
    getChat();
  }, [isChatBoxOpen]);

  return (
    <div className="w-[300px] border rounded-t-lg bg-secondary">
      <div
        onClick={() => setChatBoxOpen(!isChatBoxOpen)}
        className="flex items-center cursor-pointer justify-between p-2 rounded-t-lg bg-main text-white"
      >
        <span>{user.name}</span>
        <XIcon onClick={() => handleRemoveChatBox()} className="h-6" />
      </div>
      {isChatBoxOpen && (
        <div>
          <div className={`h-[350px] overflow-y-auto border p-2`}>
            {messages.length > 0 &&
              messages.map((message) => (
                <div key={message.sender._id}>
                  {userInfo._id !== message.sender ? (
                    <div className="flex items-center flex-wrap mb-2 ">
                      <Avatar
                        profileImage={user.profileImage}
                        width={30}
                        height={30}
                      />
                      <p
                        ref={divRef}
                        className="ml-2 max-w-[200px] text-sm sm:text-md p-2 border rounded-lg"
                      >
                        {message.msg}
                      </p>
                    </div>
                  ) : (
                    <div className="flex items-center flex-wrap mb-2 justify-end ">
                      <p className="max-w-[200px]  bg-main text-white text-sm sm:text-md p-2 border rounded-lg">
                        {message.msg}
                      </p>
                    </div>
                  )}
                </div>
              ))}
          </div>
          <div className="p-2 flex items-center ">
            <form
              onSubmit={(e) => handleSendMsg(e)}
              className=" w-full mr-2 flex items-center rounded-full border p-1 bg-secondary"
            >
              <input
                className="text-xs sm:text-sm rounded-lg w-full bg-secondary"
                type="text"
                className="px-1"
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
