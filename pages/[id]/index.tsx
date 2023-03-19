import React, { useCallback, useEffect, useRef, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import axios from 'axios';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import io, { Socket } from 'socket.io-client';

import { useAppDispatch, useAppSelector } from '@/hooks/useAppRedux';

import {
  getProfileFriendsAPI,
  getProfilePostsAPI,
  getProfileSummaryAPI,
} from '@/axios/profileRequest';

import LoaderSpinner from '@/components/Global/LoaderSpinner';
import ProfileCover from '@/components/Profile/ProfileCover';
import TabsList from '@/components/Profile/TabsList';
import { ClientToServerEvents, ServerToClientEvents } from '@/interfaces/I_socket';
import { setProfileData, setSummaryData } from '@/redux/slices/profileSlice';

// Dynamic Imports
const Friends = dynamic(() => import('@/components/Profile/Friends'), {
  loading: () => <LoaderSpinner />,
});
const Summary = dynamic(() => import('@/components/Profile/Summary'), {
  loading: () => <LoaderSpinner />,
});
const Post = dynamic(() => import('@/components/Home/Feed/Post/Post'), {
  loading: () => <LoaderSpinner />,
});
const Photos = dynamic(() => import('@/components/Profile/Photos'), {
  loading: () => <LoaderSpinner />,
});
const InputBox = dynamic(() => import('@/components/Home/Feed/InputBox'), {
  loading: () => <LoaderSpinner />,
});
const EndMessage = dynamic(() => import('@/components/Home/Feed/EndMessage'), {
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

  const handleGetInitialPosts = useCallback(async () => {
    try {
      const { data } = await getProfilePostsAPI(profile?.user?.username, 2);
      setPosts(data);
      if (data.length === 0) setHasMore(false);
      setCurrentPage((currentPage) => currentPage + 1);
    } catch (error) {
      console.log(error);
    }
  }, [profile?.user?.username]);

  const handleDeletePost = (postId: string) => {
    setPosts(posts.filter((post) => post._id !== postId));
  };

  const getProfileFriends = useCallback(async () => {
    try {
      const { data } = await getProfileFriendsAPI(router?.query?.id);
      setFriends(data);
    } catch (error) {
      console.log(error);
    }
  }, [router?.query?.id]);

  const getProfileSummary = useCallback(async () => {
    try {
      const { data } = await getProfileSummaryAPI(router?.query?.id);
      dispatch(setSummaryData(data));
    } catch (error) {
      console.log(error);
    }
  }, [dispatch, router?.query?.id]);

  useEffect(() => {
    if (!socket.current) {
      // connect to socket
      socket.current = io(process.env.API_BASE_URL, { transports: ['websocket'] });
    }
    getProfileSummary();
    getProfileFriends();
    handleGetInitialPosts();
  }, [getProfileFriends, getProfileSummary, handleGetInitialPosts, router.query.id]);

  useEffect(() => {
    if (profileData) {
      dispatch(setProfileData(profileData));
    }
  }, [dispatch, profileData]);

  useEffect(() => {
    setSummary(summaryData);
  }, [summaryData]);

  return (
    <div className=" bg-primary text-primary">
      <div className="bg-gradient-to-b from-gray-400 via-white to-white">
        <ProfileCover profile={profile} user={user} />
      </div>
      {friends && (
        <div className="z-30 border-b bg-secondary text-secondary sm:sticky sm:top-[56px]">
          <div className=" mx-auto max-w-7xl self-start bg-secondary text-secondary ">
            <TabsList
              friend_status={friends?.friend_status}
              friends_total={friends?.friends_total}
              user={user}
            />
          </div>
        </div>
      )}
      <main className="mx-auto flex max-w-7xl  flex-col justify-center  p-4 lg:flex-row">
        <div className="sticky bottom-0 z-20 w-full self-end  md:mr-[10px]">
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
