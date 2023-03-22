import React, { ChangeEvent, useEffect, useRef, useState } from 'react';

import { EmojiHappyIcon, PhotographIcon, XIcon } from '@heroicons/react/outline';
import dynamic from 'next/dynamic';
import Image from 'next/image';

import { useAppDispatch, useAppSelector } from '@/hooks/useAppRedux';
import useClickOutside from '@/hooks/useClickOutside';
import useNotify from '@/hooks/useNotify';

import { postNewPostAPI } from '@/axios/postRequest';

import Loader from '@/components/global/loader/LoaderBounce';
import LoaderSpinner from '@/components/global/loader/LoaderSpinner';
import ProfilePic from '@/components/global/ProfilePic';
import { setNotification } from '@/redux/slices/globalSlice';
import { setImagesToPost, setPostInputBoxOpen } from '@/redux/slices/postSlice';

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

  const isPostAvailable = text || images?.length;

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
            preview: URL.createObjectURL(file),
            file,
          })),
        ].splice(0, 10),
      );
    }
  };

  const sendPost = async (e) => {
    try {
      e.preventDefault();
      if (!isPostAvailable) return;
      setLoading(true);
      await postNewPostAPI({ images, text, location, type: 'post' });
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
  }, [images, dispatch]);

  return (
    <div className="relative h-screen w-full max-w-[600px] overflow-y-auto rounded-md bg-secondary pb-10 text-secondary sm:h-auto sm:max-h-[70vh]  sm:pb-4">
      <div className="sticky top-0 z-40 border-b bg-white  p-3 text-center text-lg font-semibold">
        Create Post
        <XIcon
          onClick={() => dispatch(setPostInputBoxOpen(false))}
          className="absolute top-[8px] right-[10px] h-8  cursor-pointer rounded-full p-1"
        />
      </div>
      <div className="p-3">
        <div className="flex items-center py-2">
          <ProfilePic
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
            className={`text-md focus:outline-none min-h-[100px] w-full rounded-md bg-secondary p-2  sm:min-h-[200px] sm:text-xl`}
            placeholder={`${userInfo.name}, what's on your mind?`}
          />
          {images && (
            <div className="flex w-full flex-nowrap gap-3 overflow-x-auto whitespace-nowrap">
              {images.map(({ preview, file }) => (
                <div
                  key={preview}
                  className="relative mb-[10px] h-56 min-w-full rounded-md border md:h-96"
                >
                  <Image layout="fill" unoptimized objectFit="cover" src={preview} alt="image" />
                  <XIcon
                    onClick={() => handleRemoveImage(file)}
                    className="absolute top-[10px] right-[10px] h-6 cursor-pointer rounded-full border bg-secondary text-secondary"
                  />
                </div>
              ))}
            </div>
          )}
          <div className="relative cursor-pointer rounded-lg border p-3">
            <div className="flex items-center justify-between">
              <span className="sm:text-md text-sm">Add to post</span>
              <div className="flex items-center space-x-1">
                <PhotographIcon
                  onClick={() => fileUploadRef.current.click()}
                  className="h-6 cursor-pointer text-green-500"
                />
                <EmojiHappyIcon
                  onClick={() => setIsEmojiPickerVisible(!isEmojiPickerVisible)}
                  className="h-6 cursor-pointer text-yellow-400"
                />
              </div>
              <input
                onChange={(e) => handleChange(e)}
                ref={fileUploadRef}
                type="file"
                accept="image/png,image/jpg,image/jpeg,image/avif"
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
          className={`mt-[10px]  mb-10 flex w-full cursor-default items-center  justify-center  rounded-lg py-3 text-sm sm:mb-0  ${
            isPostAvailable ? 'cursor-pointer bg-main  text-white' : 'bg-gray-100'
          } `}
        >
          {isLoading ? <Loader /> : 'Post'}
        </button>
      </div>
    </div>
  );
};

export default InputBoxModal;
