import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';

import { apiPostNewPost } from '@/Axios/index';
import Avatar from '@/Components/Global/Avatar';
import Loader from '@/Components/Global/Loader';
import { useAppDispatch, useAppSelector } from '@/Hooks/useAppRedux';
import useNotify from '@/Hooks/useNotify';
import { setNotification } from '@/Redux/slices/globalSlice';
import { setImageToPost, setPostInputBoxOpen } from '@/Redux/slices/postSlice';
import { EmojiHappyIcon, PhotographIcon, XIcon } from '@heroicons/react/outline';

const InputBoxModal = () => {
  const dispatch = useAppDispatch();
  const userInfo = useAppSelector((state) => state.user.userInfo);
  const imageToPost = useAppSelector((state) => state.post.imageToPost);

  const [text, setText] = useState('');
  const { isShow } = useNotify('');
  const [isLoading, setLoading] = useState(false);
  const [image, setImage] = useState<string | any>(imageToPost || '');
  const [location, setLocation] = useState('');

  const fileUploadRef = useRef(null);
  const handleUploadImage = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      // Asynchronous function , read the file as an URL
      reader.readAsDataURL(e.target.files[0]);
    }
    // When it comes back , it comes back as a result
    reader.onload = (readerEvent) => {
      setImage(readerEvent?.target?.result);
    };
  };

  const handleRemoveImage = () => {
    dispatch(setImageToPost(''));
  };

  const sendPost = async (e) => {
    try {
      e.preventDefault();
      if (text === '') return;
      setLoading(true);
      await apiPostNewPost({ image, text, location, type: 'post' });
      setText('');
      setLoading(false);
      setImage(null);
      dispatch(setPostInputBoxOpen(false));
      dispatch(setNotification('Post sent!'));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setImage(imageToPost);
    return () => {
      setImage(imageToPost);
    };
  }, [imageToPost]);

  return (
    <div className="h-screen overflow-y-auto sm:h-auto pb-10 sm:pb-4 rounded-md bg-secondary text-secondary w-full max-w-[600px]  relative">
      <div className="p-3 bg-white z-40 sticky top-0  text-center text-lg font-semibold border-b">
        Create Post
        <XIcon
          onClick={() => dispatch(setPostInputBoxOpen(false))}
          className="h-8 cursor-pointer rounded-full p-1  absolute top-[8px] right-[10px]"
        />
      </div>
      <div className="p-3">
        <div className="flex items-center py-2">
          <Avatar
            width={50}
            height={50}
            profileImage={userInfo.profileImage}
            gender={userInfo.gender}
            username={userInfo.username}
          />
          <span className="ml-[10px]">{userInfo.name}</span>
        </div>
        <div>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className={`min-h-[100px] sm:min-h-[200px] bg-secondary rounded-md p-2 text-md sm:text-xl  w-full focus:outline-none`}
            placeholder={`${userInfo.name}, what's on your mind?`}
          />
          {image && (
            <div className="relative h-56 md:h-96 border rounded-md mb-[10px]">
              <Image layout="fill" objectFit="cover" src={URL.createObjectURL(image)} alt="image" />
              <XIcon
                onClick={() => handleRemoveImage()}
                className="h-6 cursor-pointer rounded-full border bg-secondary text-secondary absolute top-[10px] right-[10px]"
              />
            </div>
          )}
          <div className="rounded-lg cursor-pointer border p-3">
            <div className="flex items-center justify-between">
              <span className="text-sm sm:text-md">Add to post</span>
              <div className="flex items-center space-x-1">
                <PhotographIcon
                  onClick={() => fileUploadRef.current.click()}
                  className="text-green-500 cursor-pointer h-6"
                />
                <EmojiHappyIcon className="text-yellow-400 cursor-pointer h-6" />
              </div>
              <input
                onChange={(e) => handleUploadImage(e)}
                ref={fileUploadRef}
                type="file"
                hidden
              />
            </div>
          </div>
        </div>
        <button
          onClick={(e) => sendPost(e)}
          className={`mt-[10px]  mb-10 flex items-center justify-center  text-sm  cursor-default rounded-lg w-full py-3  ${
            text ? 'bg-main text-white  cursor-pointer' : 'bg-gray-100'
          } `}
        >
          {isLoading ? <Loader /> : 'Post'}
        </button>
      </div>
    </div>
  );
};

export default InputBoxModal;
