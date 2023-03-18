import React, { useEffect, useRef, useState } from 'react';

import { XIcon } from '@heroicons/react/outline';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';

import { useAppDispatch, useAppSelector } from '@/Hooks/useAppRedux';

import { deletePostAPI } from '@/Axios/postRequest';

import { setNotification } from '@/Redux/slices/globalSlice';
import { setViewPostModalOpen } from '@/Redux/slices/postSlice';

import Post from '../Home/Feed/Post/Post';

const ViewPostModal = () => {
  const dispatch = useAppDispatch();
  const socket = useRef(null);
  const { currentPost: post, activeViewPostIndex } = useAppSelector((state) => state.post);

  const [activeIndex, setActiveIndex] = useState(activeViewPostIndex);

  const swiper = useRef(null);

  const setSwiper = (newSwiper) => {
    swiper.current = newSwiper;
  };
  const handleDeletePost = async () => {
    try {
      const { data } = await deletePostAPI(post?._id);
      // dispatch(getSavedPosts())
      console.log(data);
      dispatch(setNotification('Post deleted'));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setActiveIndex(activeViewPostIndex);
  }, [activeViewPostIndex]);

  return (
    <div className="flex flex-col lg:flex-row  fixed top-0 left-0 w-screen h-screen z-50">
      <div
        onClick={() => dispatch(setViewPostModalOpen(false))}
        className="absolute z-50 top-3 left-3 p-2 rounded-full bg-gray-200"
      >
        <XIcon className="cursor-pointer h-6" />
      </div>
      <Swiper
        className="w-full h-[500px] lg:h-auto relative  bg-black"
        spaceBetween={50}
        initialSlide={activeIndex}
        onSwiper={setSwiper}
      >
        {post.images.map((image) => (
          <SwiperSlide key={image}>
            <Image className="object-scale-down" src={image} layout="fill" alt="image" />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="w-full h-full overflow-y-scroll lg:w-[600px] bg-secondary text-secondary">
        {<Post post={post} socket={socket} deletePost={handleDeletePost} />}
      </div>
    </div>
  );
};

export default ViewPostModal;
