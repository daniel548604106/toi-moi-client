import { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import axios from 'axios';
import io from 'socket.io-client';
import Head from 'next/head';
import messageNotificationSound from '@/Utils/messageNotificationSound';
import Sidebar from '@/Components/Home/Sidebar/Sidebar';
import Contacts from '@/Components/Home/Contacts/Index';
import InfiniteScroll from 'react-infinite-scroll-component';
import InputBox from '@/Components/Home/Feed/InputBox';
import Post from '@/Components/Home/Feed/Post/Post';
import LoaderSpinner from '@/Components/Global/LoaderSpinner';
import Room from '@/Components/Home/Feed/Room/Index';
import Stories from '@/Components/Home/Feed/Story/Stories';
import { setUnreadNotification } from '@/Redux/slices/userSlice';
import { apiGetChatUserInfo, apiGetAllPosts } from '@/Axios/index';
import { useSelector, useDispatch } from 'react-redux';
import { addToChatBoxList } from '@/Redux/slices/messageSlice';

// Dynamic Import
const EndMessage = dynamic(() => import('@/Components/Home/Feed/EndMessage'), {
  loading: () => <LoaderSpinner />,
});

const NoPost = dynamic(() => import('@/Components/Home/Feed/NoPost'), {
  loading: () => <LoaderSpinner />,
});

const ChatBox = dynamic(() => import('@/Components/Home/Contacts/ChatBox'));
const PostNotification = dynamic(() => import('@/Components/Home/PostNotification'));
export default function Home({ posts, friends, stories, notFound }) {
  const dispatch = useDispatch();
  const [hasMore, setHasMore] = useState(true);
  const { userInfo } = useSelector((state) => state.user);
  const socket = useRef();

  const { openChatBoxList } = useSelector((state) => state.message);
  // const [currentStories, setCurrentStories] = useState(null);
  const [newNotification, setNewNotification] = useState(null);
  const [connectedUsers, setConnectedUsers] = useState([]);
  const [currentPosts, setCurrentPosts] = useState(posts || []);
  const [currentPage, setCurrentPage] = useState(2);
  const [newMessageReceived, setNewMessageReceived] = useState({});
  const [roomList, setRoomList] = useState(friends);

  const getMorePosts = async () => {
    try {
      const posts = await apiGetAllPosts(currentPage);
      setCurrentPosts((prev) => [...prev, ...posts.data]);
      if (posts.data.length === 0) setHasMore(false);
      setCurrentPage((currentPage) => currentPage + 1);
    } catch (error) {
      console.log(error);
    }
  };

  const deletePost = (postId) => {
    setCurrentPosts(currentPosts.filter((post) => post._id !== postId));
  };

  // useEffect(() => {
  //   setCurrentStories(stories);
  // }, [stories]);
  useEffect(() => {
    setCurrentPosts(posts);
    // Stop loading for more if there's no data at first
    if (posts && posts.length < 1) {
      setHasMore(false);
    }
  }, [posts]);

  useEffect(() => {
    console.log(posts, friends, stories);
  }, [posts, friends, stories]);

  useEffect(() => {
    console.log(newMessageReceived);
  }, [newMessageReceived]);
  useEffect(() => {
    setRoomList(friends);
  }, [friends]);

  const handleSubmitMessage = (sender, msg) => {
    if (socket.current) {
      socket.current.emit('sendMessage', {
        userId: userInfo._id,
        messageSentTo: sender,
        msg,
      });
    }
  };

  useEffect(() => {
    if (!socket.current) {
      // connect to socket
      socket.current = io(process.env.BASE_URL);
      if (socket.current) {
        // keep track of users online
        socket.current.emit('join', { userId: userInfo._id });
        socket.current.on('connectedUsers', ({ users }) => {
          setConnectedUsers(users);
        });
        socket.current.on('newMsgReceived', async ({ newMessage }) => {
          console.log('received new message', newMessage);
          const { data } = await apiGetChatUserInfo(newMessage.sender);
          console.log(data, 'data');
          // Add To ChatBox
          dispatch(addToChatBoxList(data));

          if (userInfo.newMessagePopup) {
            setNewMessageReceived(newMessage);
            messageNotificationSound(data.name);
          }
        });

        socket.current.on('newNotificationReceived', ({ profileImage, postId, username, name }) => {
          // update notification
          dispatch(setUnreadNotification(true));
          setNewNotification({ profileImage, postId, username, name });
          setTimeout(() => {
            setNewNotification(null);
          }, 5000);
        });
      }
    }
    return () => {
      if (socket.current) {
        socket.current.emit('disconnected');
        socket.current.off();
      }
    };
  }, []);

  return (
    <div className="bg-primary text-primary">
      <Head>
        <title> Toi & Moi | {userInfo.name}</title>
        <meta
          name="description"
          content="Toi&Moi is a fullstack social platform designated to connect people from distances away, users are able to build their own profile and connect with people from around the world with realtime messaging and friend system. "
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className=" w-full relative flex justify-between p-3">
        {newNotification && (
          <div className="fixed z-50 bottom-4 right-4">
            <PostNotification
              setNewNotification={setNewNotification}
              newNotification={newNotification}
            />
          </div>
        )}
        <div className="w-1/2 hidden lg:block">
          <Sidebar />
        </div>
        <div className="space-y-5 max-w-[750px] w-full sm:px-5 sm:mx-0  xl:mx-20">
          <Stories stories={stories} />
          <InputBox />
          <Room roomList={roomList} />
          {!notFound && (
            <div>
              {currentPosts?.length && (
                <InfiniteScroll
                  dataLength={currentPosts.length} //This is important field to render the next data, only when the length is changed then will trigger next function
                  next={getMorePosts}
                  hasMore={hasMore}
                  loader={<LoaderSpinner />}
                  endMessage={<EndMessage />}
                  className="scrollbar-hide"
                >
                  {currentPosts?.map((post) => (
                    <div key={post._id} className="mb-[15px] ">
                      <Post deletePost={deletePost} post={post} socket={socket} />
                    </div>
                  ))}
                </InfiniteScroll>
              )}
              {currentPosts && currentPosts.length < 10 && (
                <div className="mt-5">
                  <NoPost />
                </div>
              )}
            </div>
          )}
        </div>
        <div className=" w-1/2 hidden md:block ">
          <Contacts connectedUsers={connectedUsers} friends={friends} />
        </div>
        <div className="fixed bottom-0 right-0  flex  w-full flex-row-reverse items-end">
          {openChatBoxList.length > 0 &&
            openChatBoxList.map((user, idx) => (
              <div className="mr-3">
                <ChatBox
                  connectedUsers={connectedUsers}
                  user={user}
                  newMessageReceived={newMessageReceived}
                  handleSubmitMessage={handleSubmitMessage}
                  idx={idx}
                />
              </div>
            ))}
        </div>
      </main>
    </div>
  );
}

export async function getServerSideProps({ req, res }) {
  try {
    // get server side cookies
    const token = req.cookies.token;
    let posts, chats, friends, stories;
    if (token) {
      friends = await axios.get(`${process.env.API_BASE_URL}/api/friends`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      posts = await axios.get(`${process.env.API_BASE_URL}/api/posts?page=1`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      stories = await axios.get(`${process.env.API_BASE_URL}/api/stories`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    }

    if (!posts.data) {
      return {
        notFound: true,
      };
    }
    return {
      props: {
        posts: posts.data,
        friends: friends.data,
        stories: stories.data,
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
