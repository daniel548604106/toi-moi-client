import React, { useState } from 'react';

import { PlusIcon } from '@heroicons/react/outline';
import axios from 'axios';
import Image from 'next/image';
import router from 'next/router';

import { useAppSelector } from '@/hooks/useAppRedux';

import genderAvatar from '@/utils/genderAvatar';

import StoryCard from './StoryCard';

const Stories = ({ stories }) => {
  const [videoFile, setVideoFile] = useState('');

  const userInfo = useAppSelector((state) => state.user.userInfo);
  // const uploadStory = async () => {
  //   try {
  //     const formData = new FormData();
  //     formData.append('video', videoFile);
  //     const res = await axios.post(
  //       'https://api.vimeo.com/me/videos',
  //       {
  //         upload: {
  //           approach: 'tus',
  //           size: videoFile.size,
  //         },
  //       },
  //       {
  //         headers: {
  //           authorization: `bearer ${process.env.VIMEO_ACCESS_TOKEN}`,
  //           'content-type': 'application/json',
  //           accept: 'application/vnd.vimeo.*+json;version=3.4',
  //         },
  //       },
  //     );
  //     console.log(res);
  //     // await apiUploadStory(formData);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <div className="mt-2 flex w-full space-x-1   overflow-hidden ">
      <div
        onClick={() => router.push('/stories/create')}
        className="relative  w-1/3 flex-shrink-0   cursor-pointer rounded-md bg-secondary  transition duration-75 hover:opacity-80 sm:w-1/4 2xl:w-1/5 "
      >
        <img
          className="h-30 relative w-full rounded-3xl rounded-b-none bg-secondary object-cover sm:h-44"
          src={userInfo.profileImage || genderAvatar(userInfo.gender)}
        />
        <div className="sm:text-md relative rounded-b-3xl bg-secondary px-1 py-5 text-center text-sm text-secondary">
          Create Story
          <span className="absolute top-0 left-1/2 z-10 -translate-y-1/2 -translate-x-1/2 transform rounded-full border-4 border-white bg-main p-1 text-white ">
            <PlusIcon className="h-6 " />
          </span>
        </div>
      </div>

      {/* {videoFile ? (
        <div>
          <video width="400" controls>
            <source src={window.URL.createObjectURL(videoFile)} />
          </video>
          <button
            onClick={() => uploadStory()}
            className="rounded-lg p-2 bg-main text-white"
          >
            Upload
          </button>
          <button
            className="rounded-lg p-2 bg-blue-600 text-white"
            onClick={() => setVideoFile('')}
          >
            Clear
          </button>
        </div>
      ) : (
        <form>
          <input
            onChange={(e) => setVideoFile(e.target.files[0])}
            type="file"
            accept="video/*"
          />
        </form>
      )} */}

      {/* {stories.map((story) => (
        <StoryCard
          key={story.name}
          name={story.name}
          src={story.image}
          // profile={story.profile}
        />
      ))} */}
    </div>
  );
};

export default Stories;
