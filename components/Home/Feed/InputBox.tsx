import React, { ChangeEvent, useRef } from 'react';

import { EmojiHappyIcon } from '@heroicons/react/outline';
import { CameraIcon, VideoCameraIcon } from '@heroicons/react/solid';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';

import { useAppDispatch, useAppSelector } from '@/hooks/useAppRedux';

import { setImagesToPost, setPostInputBoxOpen } from '@/redux/slices/postSlice';

import genderAvatar from '@/utils/genderAvatar';

const InputBox = () => {
  const { t } = useTranslation('common');
  const dispatch = useAppDispatch();
  const router = useRouter();
  const userInfo = useAppSelector((state) => state.user.userInfo);
  const filePickerRef = useRef(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const images = Array.from(e.target.files as FileList).map((file) => ({
        file,
      }));
      dispatch(setImagesToPost(images));
      dispatch(setPostInputBoxOpen(true));
    }
  };

  return (
    <div className="w-full p-3 shadow-md font-medium rounded-xl bg-secondary text-secondary">
      <div className="flex items-center w-full space-x-2 mb-3">
        <img
          onClick={() => router.push(`/${userInfo.username}`)}
          className="w-[40px] h-[40px] sm:w-[50px] sm:h-[50px] rounded-full object-cover cursor-pointer"
          src={userInfo.profileImage || genderAvatar(userInfo.gender)}
        />
        <div
          onClick={() => dispatch(setPostInputBoxOpen(true))}
          className="bg-button text-primary cursor-pointer flex-1 text-left  rounded-full p-2 pl-4 hover:bg-gray-200 text-sm sm:text-md"
        >
          {`${userInfo.name} ,`} {t('post.whatAreYouThinking')}
        </div>
      </div>
      <hr className="my-2 " />
      <div className="flex justify-evenly p-1 ">
        <div className="inputIcon">
          <VideoCameraIcon className="h-5 mb-2 sm:mb-0  sm:h-6 text-red-500" />
          <p className="text-xs sm:text-sm xl:text-md whitespace-nowrap">{t('post.liveStream')}</p>
        </div>
        <div onClick={() => filePickerRef.current.click()} className="inputIcon">
          <CameraIcon className="h-5 mb-2 sm:mb-0 sm:h-6 text-green-300 " />
          <p className="text-xs sm:text-sm xl:text-md">{t('post.photo/video')}</p>
          <input
            ref={filePickerRef}
            multiple
            accept="image/png,image/jpg,image/jpeg,image/avif"
            hidden
            type="file"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="inputIcon">
          <EmojiHappyIcon className="h-5 mb-2 sm:mb-0 sm:h-6 text-yellow-300" />
          <p className="text-xs sm:text-sm xl:text-md">{t('post.feeling/activity')}</p>
        </div>
      </div>
    </div>
  );
};

export default InputBox;
