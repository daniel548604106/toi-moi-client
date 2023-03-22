import React, { useState } from 'react';

import { XIcon } from '@heroicons/react/outline';
import Image from 'next/dist/client/image';
import { useRouter } from 'next/router';

import { useAppDispatch, useAppSelector } from '@/hooks/useAppRedux';

import { postNewPostAPI } from '@/axios/postRequest';
import { patchProfileImageAPI } from '@/axios/profileRequest';

import Loader from '@/components/global/loader/LoaderBounce';
import { getProfileData } from '@/redux/slices/profileSlice';
import { getMyInfo, setEditProfileImageOpen } from '@/redux/slices/userSlice';

const EditProfileImageModal = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const profileImageToUpdate = useAppSelector((state) => state.user.profileImageToUpdate);
  const userInfo = useAppSelector((state) => state.user.userInfo);

  const [text, setText] = useState('');
  const [isLoading, setLoading] = useState(false);

  const sendUpdates = async (profileImageToUpdate) => {
    try {
      const { data } = await postNewPostAPI({
        images: [profileImageToUpdate],
        text,
        location: '',
        type: 'profileImage',
      });
      const res = await patchProfileImageAPI({
        username: router.query.id,
        profileImageDescription: text,
        profileImagePostId: data,
        profileImage: profileImageToUpdate,
      });

      console.log('profile cover changed', res);
    } catch (error) {
      console.log(error);
    }
  };
  const handleSubmitUpdate = async () => {
    try {
      setLoading(true);
      await sendUpdates(profileImageToUpdate);
      // Get updated user info
      await dispatch(getMyInfo());
      // Get updated user profile
      await dispatch(getProfileData(userInfo?.username));
      setLoading(false);
      dispatch(setEditProfileImageOpen(false));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="relative w-full max-w-[600px] rounded-lg bg-secondary text-secondary shadow-xl">
      <span
        onClick={() => dispatch(setEditProfileImageOpen(false))}
        className="absolute top-[8px] right-[8px] cursor-pointer rounded-full bg-gray-100 p-2"
      >
        <XIcon className="h-6" />
      </span>
      <div className="flex items-center justify-center border-b py-3 text-lg font-semibold">
        Update Profile Image
      </div>
      <div className="p-3">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="focus:outline-none w-full rounded-md border p-2 focus:border-main"
          placeholder="Description"
        ></textarea>
        <div className="relative mx-auto   min-h-[300px] w-[300px] p-3 sm:h-[500px] sm:w-[500px] ">
          {profileImageToUpdate && (
            <Image
              className=" rounded-md object-cover"
              src={profileImageToUpdate}
              alt="profile-image"
            />
          )}
        </div>
      </div>
      <div className="flex items-center justify-end border-t p-3">
        <button
          onClick={() => dispatch(setEditProfileImageOpen(false))}
          className="rounded-md p-2 px-4 text-sm hover:shadow-lg"
        >
          Cancel
        </button>
        <button
          onClick={() => handleSubmitUpdate()}
          className="ml-[10px] flex items-center justify-center rounded-md bg-main p-2 px-4 text-sm text-white"
        >
          {isLoading ? <Loader /> : 'Save'}
        </button>
      </div>
    </div>
  );
};

export default EditProfileImageModal;
