import React, { useEffect, useRef, useState } from 'react';

import { ChatAlt2Icon } from '@heroicons/react/outline';
import axios from 'axios';
import useTranslation from 'next-translate/useTranslation';
import Head from 'next/head';
import { useRouter } from 'next/router';
import io, { Socket } from 'socket.io-client';

import { useAppDispatch, useAppSelector } from '@/hooks/useAppRedux';

import { getChatUserInfoAPI } from '@/axios/chatRequest';
import { searchRequestAPI } from '@/axios/searchRequest';

import Avatar from '@/components/Global/Avatar';
import ChatroomMainHeader from '@/components/messages/ChatroomMain/ChatroomMainHeader';
import ChatroomMainInputBox from '@/components/messages/ChatroomMain/ChatroomMainInputBox';
import ChatroomMainRoom from '@/components/messages/ChatroomMain/ChatroomMainRoom';
import ChatroomList from '@/components/messages/ChatroomSidebar/ChatroomList';
import ChatroomSidebarHeader from '@/components/messages/ChatroomSidebar/ChatroomSidebarHeader';
import EmptyChat from '@/components/messages/EmptyChat';
import { ClientToServerEvents, ServerToClientEvents } from '@/interfaces/I_socket';
import { toggleListOpen } from '@/redux/slices/messageSlice';

import genderAvatar from '@/utils/genderAvatar';
import messageNotificationSound from '@/utils/messageNotificationSound';

const Index = (props) => {
  const { t } = useTranslation('messages');
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isListOpen } = useAppSelector((state) => state.message);
  const { userInfo } = useAppSelector((state) => state.user);
  const socket = useRef<Socket<ServerToClientEvents, ClientToServerEvents>>();
  const divRef = useRef<HTMLDivElement>(null);
  const openChatId = useRef();

  const [chats, setChats] = useState(props.chats || []);
  const [searchText, setSearchText] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [messages, setMessages] = useState([]);
  const [connectedUsers, setConnectedUsers] = useState([]);
  const [openChatUser, setOpenChatUser] = useState({
    name: '',
    profileImage: '',
  });

  const scrollToBottom = (divRef) => {
    divRef.current !== null && divRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  // This ref is for persisting the state of query string in url through re-renders because on each re-render of component , the querystring will automatically reset
  // useRef 可以在不 re-render 的狀態下更新值

  const searchChat = async () => {
    try {
      const { data } = await searchRequestAPI(searchText);
      setSearchResult(data);
    } catch (error) {
      console.log(error);
    }
  };

  const sendMsg = (msg) => {
    if (socket.current) {
      socket.current.emit('sendMessage', {
        userId: userInfo._id,
        messageSentTo: openChatId.current,
        msg,
      });
    }
  };

  const addChat = (e, result) => {
    e.stopPropagation();
    const alreadyInChat =
      chats.length > 0 && chats.filter((chat) => chat.messagesWith === result._id).length > 0;

    console.log(alreadyInChat, '?');
    if (alreadyInChat) {
      router.push(`/messages?message=${result._id}`);
    } else {
      const newChat = {
        messagesWith: result._id,
        name: result.name,
        profileImage: result.profileImage || genderAvatar(result.gender),
        lastMessage: '',
        date: Date.now(),
      };

      console.log(openChatId);
      openChatId.current = result._id;
      setSearchText('');
      setSearchResult([]);
      setChats((chats) => [newChat, ...chats]);
      router.push(`/messages?message=${result._id}`, undefined, {
        shallow: true,
      });
    }
    // Clean search result
    setSearchResult([]);
    setSearchText('');
    // Open current chat
    setOpenChatUser({
      name: result.name,
      profileImage: result.profileImage || genderAvatar(result.gender),
    });
  };

  useEffect(() => {
    if (!searchText) return;
    searchChat();
  }, [searchText]);

  // Connection
  useEffect(() => {
    if (!socket?.current) {
      socket.current = io(process.env.API_BASE_URL, { transports: ['websocket'] });
    }

    if (socket.current) {
      socket.current.emit('join', { userId: userInfo._id });
      socket.current.on('connectedUsers', ({ users }) => {
        console.log('connected', users);
        users.length > 0 && setConnectedUsers(users);
      });
    }

    return () => {
      if (socket.current) {
        socket.current.emit('disconnected');
        socket.current.off();
      }
    };
  }, []);

  useEffect(() => {
    messages.length > 0 && scrollToBottom(divRef);
  }, [messages]);

  useEffect(() => {
    console.log('open');
    if (chats.length > 0 && !router.query.message) {
      router.push(`/messages?message=${chats[0].messagesWith}`, undefined, {
        shallow: true,
      });
    }
  }, []);

  // Load Messages

  useEffect(() => {
    const loadMessages = () => {
      socket.current.emit('loadMessages', {
        userId: userInfo._id,
        messagesWith: router.query.message,
      });

      socket.current.on('noChatFound', async () => {
        setMessages([]);
      });

      socket.current.on('messagesLoaded', ({ chat }) => {
        setMessages(chat.messages);
        setOpenChatUser({
          name: chat.messagesWith.name,
          profileImage: chat.messagesWith.profileImage,
        });
        // tracking the query string in the url
        openChatId.current = chat.messagesWith._id;
        divRef.current && scrollToBottom(divRef);
      });
    };

    if (socket.current) {
      loadMessages();
    }
  }, [router.query.message]);

  // Confirming message has been sent and receiving messages
  useEffect(() => {
    if (socket.current) {
      socket.current.on('messageSent', ({ newMessage }) => {
        // We're doing this so that only the opened chat will push new messages so we don't air unopened chat
        if (newMessage.receiver === openChatId.current) {
          setMessages((messages) => [...messages, newMessage]);
          setChats((chats) => {
            const previousChat = chats.find((chat) => {
              return chat.messagesWith === newMessage.receiver;
            });
            previousChat.lastMessage = newMessage.msg;
            previousChat.date = newMessage.date;
            return [...chats];
          });
        }
      });

      socket.current.on('newMsgReceived', async ({ newMessage }) => {
        let senderName;
        // When chat is open inside the browser
        if (newMessage.sender === openChatId.current) {
          setMessages((prev) => [...prev, newMessage]);
          setChats((prev) => {
            const previousChat = prev.find((chat) => chat.messagesWith === newMessage.sender);
            previousChat.lastMessage = newMessage.msg;
            previousChat.data = newMessage.date;
            senderName = previousChat.name;
            return [...prev];
          });
        } else {
          const ifPreviouslyMessaged =
            chats.filter((chat) => chat.messagesWith === newMessage.sender).length > 0;

          if (ifPreviouslyMessaged) {
            setChats((prev) => {
              const previousChat = prev.find((chat) => chat.messagesWith === newMessage.sender);
              previousChat.lastMessage = newMessage.msg;
              previousChat.date = newMessage.date;
              senderName = previousChat.name;
              return [...prev];
            });
          } else {
            const {
              data: { name, profileImage, gender },
            } = await getChatUserInfoAPI(newMessage.sender);
            senderName = name;
            console.log(',hi', name, profileImage);
            const newChat = {
              messagesWith: newMessage.sender,
              name,
              profileImage: profileImage || genderAvatar(gender),
              lastMessage: newMessage.msg,
            };
            setChats((prev) => [newChat, ...prev]);
          }
        }

        messageNotificationSound(senderName);
      });
    }
  }, []);
  return (
    <div className="relative flex bg-primary   text-primary">
      <Head>
        <title>{`${userInfo.name}`} | Messages</title>
      </Head>
      <span
        onClick={() => dispatch(toggleListOpen())}
        className="fixed top-[110px] left-0 z-40   rounded-r-full bg-main p-2 text-white sm:hidden"
      >
        <ChatAlt2Icon className="h-6" />
      </span>
      <div
        className={`${
          isListOpen ? 'translate-x-0 ' : ' -translate-x-full transform sm:transform-none'
        } fixed z-40 h-screen w-full transform flex-col overflow-y-scroll border-r-2 bg-secondary transition-transform duration-100  ease-in-out sm:flex sm:max-w-[300px]  lg:max-w-[500px] `}
      >
        <ChatroomSidebarHeader t={t} setSearchText={setSearchText} searchText={searchText} />
        <div className="flex-1 overflow-y-auto ">
          {searchResult.length > 0
            ? searchResult.map((result) => (
                <div
                  key={result._id}
                  onClick={(e) => addChat(e, result)}
                  className="flex cursor-pointer items-center rounded-lg p-2 hover:bg-gray-100"
                >
                  <Avatar
                    width={30}
                    height={30}
                    profileImage={result.profileImage}
                    gender={result.gender}
                  />

                  <span className="ml-[10px]">{result.name}</span>
                </div>
              ))
            : chats.length > 0 &&
              chats.map((chat) => (
                <ChatroomList
                  setOpenChatUser={setOpenChatUser}
                  connectedUsers={connectedUsers}
                  key={chat.messagesWith}
                  chat={chat}
                />
              ))}
        </div>
      </div>
      {chats.length > 0 ? (
        <div className="fixed top-0 right-0 left-0 bottom-0 flex flex-1 flex-col pt-[53px] sm:top-[60px] sm:ml-[300px] sm:pt-[0px] lg:ml-[500px]  ">
          <ChatroomMainHeader connectedUsers={connectedUsers} openChatUser={openChatUser} />
          <ChatroomMainRoom
            divRef={divRef}
            user={userInfo}
            receiverProfileImage={openChatUser.profileImage}
            messages={messages}
          />
          <ChatroomMainInputBox t={t} sendMsg={sendMsg} />
        </div>
      ) : (
        <EmptyChat />
      )}
    </div>
  );
};

export default Index;

export async function getServerSideProps({ req, res }) {
  try {
    // get server side cookies
    const token = req.cookies.token;
    let chats = await axios.get(`${process.env.API_BASE_URL}/api/chats`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!chats.data) {
      return {
        notFound: true,
      };
    }
    return {
      props: {
        chats: chats.data,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      props: {
        ok: false,
        reason: 'some error description for your own consumption, not for client side',
      },
    };
  }
}
