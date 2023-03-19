import React, { useRef } from 'react';

import { CameraIcon } from '@heroicons/react/outline';
import Image from 'next/image';
import router from 'next/router';

import { UserInfo } from '@/interfaces/I_common';

import { useAppDispatch, useAppSelector } from '@/hooks/useAppRedux';
import { apiGetCurrentPost, setViewPostModalOpen } from '@/redux/slices/postSlice';
import { setEditProfileImageOpen, setProfileImageToUpdate } from '@/redux/slices/userSlice';

import genderAvatar from '@/utils/genderAvatar';

interface ProfileImageProps {
  postId: string;
  user: UserInfo;
  profileImage: string;
}
const ProfileImage = (props: ProfileImageProps) => {
  const { postId, user, profileImage } = props;
  const dispatch = useAppDispatch();
  const userInfo = useAppSelector((state) => state.user.userInfo);
  const profileImageRef = useRef(null);

  const handleNewProfileImagePreview = (e) => {
    e.stopPropagation();
    profileImageRef.current.click();
  };

  const handleViewCurrentProfile = async (e) => {
    if (!postId || !profileImage) return;
    e.stopPropagation();
    await dispatch(apiGetCurrentPost(postId));
    dispatch(setViewPostModalOpen(true));
  };
  const addProfileImageToPost = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
    console.log('triggered');

    reader.onload = (readerEvent) => {
      console.log('reader', readerEvent);
      dispatch(setProfileImageToUpdate(readerEvent.target.result));
    };
    dispatch(setEditProfileImageOpen(true));
  };

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="relative  h-[100px] w-[100px] rounded-full border border-white sm:h-[160px] sm:w-[160px] "
    >
      <Image
        onClick={(e) => handleViewCurrentProfile(e)}
        className={`${profileImage ? 'cursor-pointer' : 'cursor-default'} 
       rounded-full   object-cover sm:h-[100px]   sm:w-[100px]`}
        src={profileImage || genderAvatar(user.gender)}
        layout="fill"
        alt="profile-image"
      />
      {router.query.id === userInfo.username && (
        <span
          onClick={(e) => handleNewProfileImagePreview(e)}
          className="absolute bottom-0 right-0 cursor-pointer rounded-full border-2 bg-secondary p-2 text-secondary shadow-md hover:shadow-xl"
        >
          <CameraIcon className="h-6 " />
          <input
            onChange={(e) => addProfileImageToPost(e)}
            ref={profileImageRef}
            type="file"
            hidden
          />
        </span>
      )}
    </div>
  );
};

export default ProfileImage;
