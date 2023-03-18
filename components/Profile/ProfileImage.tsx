import React, { useRef } from 'react';

import { CameraIcon } from '@heroicons/react/outline';
import Image from 'next/image';
import router from 'next/router';

import { useAppDispatch, useAppSelector } from '@/Hooks/useAppRedux';
import { UserInfo } from '@/Interfaces/I_common';

import { apiGetCurrentPost, setViewPostModalOpen } from '@/Redux/slices/postSlice';
import { setEditProfileImageOpen, setProfileImageToUpdate } from '@/Redux/slices/userSlice';

import genderAvatar from '@/Utils/genderAvatar';

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
      className="relative  border h-[100px] w-[100px] sm:w-[160px] sm:h-[160px] rounded-full border-white "
    >
      <Image
        onClick={(e) => handleViewCurrentProfile(e)}
        className={`${profileImage ? 'cursor-pointer' : 'cursor-default'} 
       object-cover   sm:w-[100px] sm:h-[100px]   rounded-full`}
        src={profileImage || genderAvatar(user.gender)}
        layout="fill"
        alt="profile-image"
      />
      {router.query.id === userInfo.username && (
        <span
          onClick={(e) => handleNewProfileImagePreview(e)}
          className="cursor-pointer absolute bottom-0 border-2 right-0 p-2 rounded-full bg-secondary text-secondary shadow-md hover:shadow-xl"
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
