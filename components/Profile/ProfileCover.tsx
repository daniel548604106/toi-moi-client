import React, { useEffect, useRef, useState } from 'react';

import { CameraIcon, GlobeIcon } from '@heroicons/react/outline';
import Image from 'next/image';
import { useRouter } from 'next/router';

import { useAppDispatch, useAppSelector } from '@/hooks/useAppRedux';

import { postNewPostAPI } from '@/axios/postRequest';
import { patchProfileAPI } from '@/axios/profileRequest';

import Loader from '@/components/Global/loader/LoaderBounce';
import { UserInfo } from '@/interfaces/I_common';
import { apiGetCurrentPost, setViewPostModalOpen } from '@/redux/slices/postSlice';

import BioInput from './BioInput';
import ProfileImage from './ProfileImage';

interface ProfileCoverProps {
  user: UserInfo;
  profile: any;
}

const ProfileCover = (props: ProfileCoverProps) => {
  const { user, profile } = props;
  const router = useRouter();
  const dispatch = useAppDispatch();

  const userInfo = useAppSelector((state) => state?.user?.userInfo);
  const latestProfileImage = useAppSelector(
    (state) => state.profile?.profileData?.profile?.profileImage,
  );

  const inputRef = useRef(null);
  const [isLoading, setLoading] = useState(false);
  const [isCoverImageEditable, setCoverImageEditable] = useState(false);
  const [coverImage, setCoverImage] = useState(profile?.profileCoverImage);
  const [coverDescription, setCoverDescription] = useState(profile?.profileCoverDescription);
  const [bio, setBio] = useState(profile?.bio);

  const handleCancelImageUpdate = () => {
    setCoverImageEditable(false);
    setCoverImage(profile?.profileCoverImage || '');
  };

  const addImageToPost = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
    console.log('triggered');
    setCoverImageEditable(true);
    reader.onload = (readerEvent) => {
      console.log('reader', readerEvent);
      setCoverImage(readerEvent.target.result);
    };
  };

  const handleSaveImageChanges = () => {
    setCoverImageEditable(false);
    sendUpdates(bio, coverDescription, coverImage);
  };

  const handleViewCoverPost = async () => {
    if (!profile.profileCoverPostId) return;
    await dispatch(apiGetCurrentPost(profile.profileCoverPostId));
    dispatch(setViewPostModalOpen(true));
  };

  const isEditable = userInfo.username === router.query.id;

  const sendUpdates = async (bio, profileCoverDescription, profileCoverImage) => {
    setLoading(true);
    try {
      const { data } = await postNewPostAPI({
        images: [profileCoverImage],
        text: profileCoverDescription,
        location: '',
        type: 'profileCover',
      });
      const res = await patchProfileAPI({
        username: router.query.id,
        bio,
        profileCoverPostId: data,
        profileCoverDescription,
        profileCoverImage,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditCover = (e) => {
    e.stopPropagation();
    inputRef.current.click();
  };

  useEffect(() => {
    setCoverDescription(profile.profileCoverDescription);
    setCoverImage(profile.profileCoverImage);
    setBio(profile.bio);
  }, [profile]);

  return (
    <div className=" bg-secondary text-secondary ">
      <div className="relative mx-auto max-w-7xl">
        {isCoverImageEditable && (
          <div className="absolute top-0 left-0 z-30 flex w-full items-center justify-between bg-black bg-opacity-10 p-3">
            <div className="flex items-center text-secondary">
              <GlobeIcon className="h-6" />
              <p className="ml-[5px] text-sm">Your Cover Photo Will Be Visible To Everyone</p>
            </div>
            <div>
              <button
                onClick={() => handleCancelImageUpdate()}
                className=" rounded-md bg-gray-100 bg-opacity-20 py-2 px-4 text-gray-600 hover:opacity-80"
              >
                Cancel
              </button>
              <button
                onClick={() => handleSaveImageChanges()}
                className="ml-[10px] rounded-md bg-main  py-2 px-4 text-white"
              >
                {isLoading ? <Loader /> : 'Save Changes'}
              </button>
            </div>
          </div>
        )}
        <div
          onClick={() => handleViewCoverPost()}
          className={`${profile.profileCoverPostId && 'cursor-pointer'} ${
            isCoverImageEditable && 'cursor-move'
          } relative  w-full rounded-xl  bg-gray-100`}
        >
          <Image
            width={1000}
            height={350}
            className="rounded-b-2xl object-cover"
            src={coverImage || `/images/profileCoverDefault.png`}
            alt="cover-image"
          />
          {isEditable && (
            <span
              onClick={(e) => handleEditCover(e)}
              className="absolute bottom-5 right-5 cursor-pointer rounded-md bg-secondary px-4 py-2 text-secondary hover:shadow-xl"
            >
              <CameraIcon className="h-6 " />
              <input onChange={(e) => addImageToPost(e)} ref={inputRef} type="file" hidden />
            </span>
          )}
          <div className="absolute bottom-0 left-1/2 translate-y-[10px] -translate-x-1/2 transform">
            <ProfileImage
              user={profile.user}
              postId={latestProfileImage?.postId || profile.profileImage.postId || ''}
              profileImage={latestProfileImage?.picUrl || user.profileImage}
            />
          </div>
        </div>

        <div className=" flex flex-col  items-center justify-center space-x-2 p-5">
          <h2 className="text-xl font-semibold sm:text-2xl">{user.name}</h2>
          <BioInput isEditable={isEditable} originalBio={profile.bio} bio={bio} setBio={setBio} />
          <hr className="my-2" />
        </div>
      </div>
    </div>
  );
};

export default ProfileCover;
