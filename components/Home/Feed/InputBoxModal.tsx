import dynamic from 'next/dynamic';
import Image from 'next/image';
import React, { ChangeEvent, useEffect, useRef, useState } from 'react';

import { postNewPostAPI } from '@/Axios/postRequest';
import Avatar from '@/Components/Global/Avatar';
import Loader from '@/Components/Global/Loader';
import LoaderSpinner from '@/Components/Global/LoaderSpinner';
import { useAppDispatch, useAppSelector } from '@/Hooks/useAppRedux';
import useClickOutside from '@/Hooks/useClickOutside';
import useNotify from '@/Hooks/useNotify';
import { setNotification } from '@/Redux/slices/globalSlice';
import { setImagesToPost, setPostInputBoxOpen } from '@/Redux/slices/postSlice';
import { EmojiHappyIcon, PhotographIcon, XIcon } from '@heroicons/react/outline';

const Picker = dynamic(import('emoji-picker-react'), {
  ssr: false,
  loading: () => <LoaderSpinner />,
});

const InputBoxModal = () => {
  const dispatch = useAppDispatch();
  const userInfo = useAppSelector((state) => state.user.userInfo);
  const imageToPost = useAppSelector((state) => state.post.imageToPost);

  const fileUploadRef = useRef(null);
  const emojiPickerRef = useRef(null);

  const [text, setText] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [images, setImages] = useState<string | any>(imageToPost || []);
  const [location, setLocation] = useState('');
  const [isEmojiPickerVisible, setIsEmojiPickerVisible] = useState(false);

  useClickOutside(emojiPickerRef, () => isEmojiPickerVisible && setIsEmojiPickerVisible(false));
  const { isShow } = useNotify('');

  const onEmojiClick = (event, emojiObject) => {
    setText((prev) => `${prev}${emojiObject.emoji}`);
  };

  const handleRemoveImage = (currentFile) => {
    setImages((prev) => prev.filter(({ file }) => file !== currentFile));
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages(
        [
          ...images,
          ...Array.from(e.target.files as FileList).map((file) => ({
            file,
          })),
        ].splice(0, 10),
      );
    }
  };

  console.log(images);

  const sendPost = async (e) => {
    try {
      e.preventDefault();
      if (text === '') return;
      setLoading(true);
      // await postNewPostAPI({ image, text, location, type: 'post' });
      setText('');
      setLoading(false);
      setImages(null);
      dispatch(setPostInputBoxOpen(false));
      dispatch(setImagesToPost([]));
      dispatch(setNotification('Post sent!'));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    dispatch(setImagesToPost(images));
  }, [images]);

  return (
    <div className="h-screen overflow-y-auto sm:h-[70vh] pb-10 sm:pb-4 rounded-md bg-secondary text-secondary w-full max-w-[600px]  relative">
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
          {images && (
            <div className="flex flex-nowrap whitespace-nowrap gap-3 overflow-x-auto w-full">
              {images.map(({ file }) => (
                <div className="relative min-w-full h-56 md:h-96 border rounded-md mb-[10px]">
                  <Image
                    layout="fill"
                    unoptimized
                    objectFit="cover"
                    src={URL.createObjectURL(file)}
                    alt="image"
                  />
                  <XIcon
                    onClick={() => handleRemoveImage(file)}
                    className="h-6 cursor-pointer rounded-full border bg-secondary text-secondary absolute top-[10px] right-[10px]"
                  />
                </div>
              ))}
            </div>
          )}
          <div className="rounded-lg relative cursor-pointer border p-3">
            <div className="flex items-center justify-between">
              <span className="text-sm sm:text-md">Add to post</span>
              <div className="flex items-center space-x-1">
                <PhotographIcon
                  onClick={() => fileUploadRef.current.click()}
                  className="text-green-500 cursor-pointer h-6"
                />
                <EmojiHappyIcon
                  onClick={() => setIsEmojiPickerVisible(!isEmojiPickerVisible)}
                  className="text-yellow-400 cursor-pointer h-6"
                />
              </div>
              <input
                onChange={(e) => handleChange(e)}
                ref={fileUploadRef}
                type="file"
                accept="image/png,image/jpg,image/jpeg"
                hidden
              />
              {isEmojiPickerVisible && (
                <div ref={emojiPickerRef} className="absolute right-0 top-0">
                  <Picker onEmojiClick={onEmojiClick} />
                </div>
              )}
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
