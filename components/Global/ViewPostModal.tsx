import React, { useEffect, useRef, useState } from 'react';

import { XIcon } from '@heroicons/react/outline';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';

import { deletePostAPI } from '@/axios/postRequest';

import { useAppDispatch, useAppSelector } from '@/hooks/useAppRedux';
import { setNotification } from '@/redux/slices/globalSlice';
import { setViewPostModalOpen } from '@/redux/slices/postSlice';

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
    <div className="fixed top-0 left-0  z-50 flex h-screen w-screen flex-col lg:flex-row">
      <div
        onClick={() => dispatch(setViewPostModalOpen(false))}
        className="absolute top-3 left-3 z-50 rounded-full bg-gray-200 p-2"
      >
        <XIcon className="h-6 cursor-pointer" />
      </div>
      <Swiper
        className="relative h-[500px] w-full bg-black  lg:h-auto"
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
      <div className="h-full w-full overflow-y-scroll bg-secondary text-secondary lg:w-[600px]">
        {<Post post={post} socket={socket} deletePost={handleDeletePost} />}
      </div>
    </div>
  );
};

export default ViewPostModal;
