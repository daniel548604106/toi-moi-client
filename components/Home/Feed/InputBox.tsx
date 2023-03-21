import React, { ChangeEvent, useRef } from 'react';

import { EmojiHappyIcon } from '@heroicons/react/outline';
import { CameraIcon, VideoCameraIcon } from '@heroicons/react/solid';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';

import { useAppDispatch, useAppSelector } from '@/hooks/useAppRedux';

import Overlay from '@/components/Global/Overlay';
import InputBoxModal from '@/components/Home/Feed/InputBoxModal';
import { setImagesToPost, setPostInputBoxOpen } from '@/redux/slices/postSlice';

import genderAvatar from '@/utils/genderAvatar';

const InputBox = () => {
  const { t } = useTranslation('common');
  const dispatch = useAppDispatch();
  const router = useRouter();
  const userInfo = useAppSelector((state) => state.user.userInfo);
  const filePickerRef = useRef(null);

  const { isPostInputBoxOpen } = useAppSelector((state) => state.post);
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
    <div className="w-full rounded-xl bg-secondary p-3 font-medium text-secondary shadow-md">
      <div className="mb-3 flex w-full items-center space-x-2">
        <img
          onClick={() => router.push(`/${userInfo.username}`)}
          className="h-[40px] w-[40px] cursor-pointer rounded-full object-cover sm:h-[50px] sm:w-[50px]"
          src={userInfo.profileImage || genderAvatar(userInfo.gender)}
          alt="profile-image"
        />
        <div
          onClick={() => dispatch(setPostInputBoxOpen(true))}
          className="sm:text-md flex-1 cursor-pointer rounded-full bg-button  p-2 pl-4 text-left text-sm text-primary hover:bg-gray-200"
        >
          {`${userInfo.name} ,`} {t('post.whatAreYouThinking')}
        </div>
      </div>
      <hr className="my-2 " />
      <div className="flex justify-evenly p-1 ">
        <div className="inputIcon">
          <VideoCameraIcon className="mb-2 h-5 text-red-500  sm:mb-0 sm:h-6" />
          <p className="xl:text-md whitespace-nowrap text-xs sm:text-sm">{t('post.liveStream')}</p>
        </div>
        <div onClick={() => filePickerRef.current.click()} className="inputIcon">
          <CameraIcon className="mb-2 h-5 text-green-300 sm:mb-0 sm:h-6 " />
          <p className="xl:text-md text-xs sm:text-sm">{t('post.photo/video')}</p>
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
          <EmojiHappyIcon className="mb-2 h-5 text-yellow-300 sm:mb-0 sm:h-6" />
          <p className="xl:text-md text-xs sm:text-sm">{t('post.feeling/activity')}</p>
        </div>
        {isPostInputBoxOpen && (
          <Overlay>
            <InputBoxModal />
          </Overlay>
        )}
      </div>
    </div>
  );
};

export default InputBox;
