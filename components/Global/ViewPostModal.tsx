import Image from 'next/image';
import React, { useRef } from 'react';

import { apiDeletePost } from '@/Axios/index';
import { useAppDispatch, useAppSelector } from '@/Hooks/useAppRedux';
import { setNotification } from '@/Redux/slices/globalSlice';
import { setViewPostModalOpen } from '@/Redux/slices/postSlice';
import { XIcon } from '@heroicons/react/outline';

import Post from '../Home/Feed/Post/Post';

const ViewPostModal = () => {
  const dispatch = useAppDispatch();
  const socket = useRef(null);
  const post = useAppSelector((state) => state.post.currentPost);

  const handleDeletePost = async () => {
    try {
      const { data } = await apiDeletePost(post?._id);
      // dispatch(getSavedPosts())
      console.log(data);
      dispatch(setNotification('Post deleted'));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex flex-col lg:flex-row  fixed top-0 left-0 w-screen h-screen z-50">
      <div
        onClick={() => dispatch(setViewPostModalOpen(false))}
        className="absolute z-50 top-3 left-3 p-2 rounded-full bg-gray-200"
      >
        <XIcon className="cursor-pointer h-6" />
      </div>
      <div className="w-full h-[500px] lg:h-auto relative  bg-black">
        <Image className="object-scale-down" src={post?.picUrl} layout="fill" />
      </div>
      <div className="w-full h-full overflow-y-scroll lg:w-[600px] bg-secondary text-secondary">
        {<Post post={post} socket={socket} deletePost={handleDeletePost} />}
      </div>
    </div>
  );
};

export default ViewPostModal;
