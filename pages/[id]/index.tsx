import axios from 'axios';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import io, { Socket } from 'socket.io-client';

import {
    getProfileFriendsAPI, getProfilePostsAPI, getProfileSummaryAPI
} from '@/Axios/profileRequest';
import LoaderSpinner from '@/Components/Global/LoaderSpinner';
import ProfileCover from '@/Components/Profile/ProfileCover';
import TabsList from '@/Components/Profile/TabsList';
import { useAppDispatch, useAppSelector } from '@/Hooks/useAppRedux';
import { ClientToServerEvents, ServerToClientEvents } from '@/Interfaces/I_socket';
import { setProfileData, setSummaryData } from '@/Redux/slices/profileSlice';

// Dynamic Imports
const Friends = dynamic(() => import('@/Components/Profile/Friends'), {
  loading: () => <LoaderSpinner />,
});
const Summary = dynamic(() => import('@/Components/Profile/Summary'), {
  loading: () => <LoaderSpinner />,
});
const Post = dynamic(() => import('@/Components/Home/Feed/Post/Post'), {
  loading: () => <LoaderSpinner />,
});
const Photos = dynamic(() => import('@/Components/Profile/Photos'), {
  loading: () => <LoaderSpinner />,
});
const InputBox = dynamic(() => import('@/Components/Home/Feed/InputBox'), {
  loading: () => <LoaderSpinner />,
});
const EndMessage = dynamic(() => import('@/Components/Home/Feed/EndMessage'), {
  loading: () => <LoaderSpinner />,
});

const Index = ({ profileData }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const summaryData = useAppSelector((state) => state?.profile?.summaryData);
  const socket = useRef<Socket<ServerToClientEvents, ClientToServerEvents>>();

  const { profile } = profileData;
  const { user } = profile;

  const [friends, setFriends] = useState(null);
  const [summary, setSummary] = useState(summaryData);
  const [posts, setPosts] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(2);

  const handleGetMorePosts = async () => {
    try {
      const { data } = await getProfilePostsAPI(profile?.user?.username, currentPage);
      setPosts((prev) => [...prev, ...data]);
      if (data.length === 0) setHasMore(false);
      setCurrentPage((currentPage) => currentPage + 1);
    } catch (error) {
      console.log(error);
    }
  };

  const handleGetInitialPosts = async () => {
    try {
      const { data } = await getProfilePostsAPI(profile?.user?.username, 2);
      setPosts(data);
      if (data.length === 0) setHasMore(false);
      setCurrentPage((currentPage) => currentPage + 1);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeletePost = (postId: string) => {
    setPosts(posts.filter((post) => post._id !== postId));
  };

  const getProfileFriends = async () => {
    try {
      const { data } = await getProfileFriendsAPI(router?.query?.id);
      setFriends(data);
    } catch (error) {
      console.log(error);
    }
  };
  const getProfileSummary = async () => {
    try {
      const { data } = await getProfileSummaryAPI(router?.query?.id);
      dispatch(setSummaryData(data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!socket.current) {
      // connect to socket
      socket.current = io(process.env.API_BASE_URL, { transports: ['websocket'] });
    }
    getProfileSummary();
    getProfileFriends();
    handleGetInitialPosts();
  }, [router.query.id]);

  useEffect(() => {
    if (profileData) {
      dispatch(setProfileData(profileData));
    }
  }, [profileData]);

  useEffect(() => {
    setSummary(summaryData);
  }, [summaryData]);

  return (
    <div className=" bg-primary text-primary">
      <div className="bg-gradient-to-b from-gray-400 via-white to-white">
        <ProfileCover profile={profile} user={user} />
      </div>
      {friends && (
        <div className="bg-secondary text-secondary sm:sticky sm:top-[56px] border-b z-30">
          <div className=" max-w-7xl mx-auto bg-secondary text-secondary self-start ">
            <TabsList
              friend_status={friends?.friend_status}
              friends_total={friends?.friends_total}
              user={user}
            />
          </div>
        </div>
      )}
      <main className="max-w-7xl mx-auto p-4  flex-col lg:flex-row  flex justify-center">
        <div className="w-full md:mr-[10px] sticky z-20 bottom-0  self-end">
          <Summary summary={summary} />
          <Photos />
          {friends && <Friends friends={friends} />}
        </div>
        <div className="w-full lg:w-[150%]">
          <div className="mb-[30px]">
            <InputBox />
          </div>
          <InfiniteScroll
            dataLength={posts.length} //This is important field to render the next data, only when the length is changed then will trigger next function
            next={handleGetMorePosts}
            hasMore={hasMore}
            loader={<LoaderSpinner />}
            endMessage={<EndMessage />}
            className="scrollbar-hide"
          >
            {posts.map((post) => (
              <div key={post._id} className="mb-[15px]">
                <Post socket={socket} deletePost={handleDeletePost} post={post} />
              </div>
            ))}
          </InfiniteScroll>
        </div>
      </main>
    </div>
  );
};

export default Index;

export async function getServerSideProps({ req, params, res }) {
  try {
    const username = params.id;
    const token = req.cookies.token;
    const profile = await axios.get(`${process.env.API_BASE_URL}/api/profile/${username}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return {
      props: {
        profileData: profile?.data,
      },
    };
  } catch (error) {
    console.log(error, 'server errors');
    return {
      props: {
        error: 'Error',
      },
    };
  }
}
