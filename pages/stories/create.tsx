import React, { useRef, useState } from 'react';

import { PhotographIcon, TranslateIcon, XIcon } from '@heroicons/react/outline';
import Image from 'next/dist/client/image';
import dynamic from 'next/dynamic';
import router from 'next/router';

import { useAppSelector } from '@/hooks/useAppRedux';

import { uploadStoryImageAPI } from '@/axios/storyRequest';

import ProfilePic from '@/components/ProfilePic';

import { backgroundSelections } from '@/utils/storyOptions';

const Create = () => {
  const stageRef = useRef(null);
  const inputRef = useRef(null);
  const [isLoading, setLoading] = useState(false);
  const { userInfo } = useAppSelector((state) => state.user);
  const [text, setText] = useState('');

  const [storyInfo, setStoryInfo] = useState({
    type: '',
    image: '',
  });
  const [selectedBg, setSelectedBg] = useState(1);
  const [selectedIdx, setSelectedIdx] = useState(0);

  const handleImageSelected = (file) => {
    const reader = new FileReader();
    if (file) {
      // Asynchronous function , read the file as an URL
      reader.readAsDataURL(file);
    }
    // When it comes back , it comes back as a result
    // reader.onload = (readerEvent) => {
    //   setStoryInfo((storyInfo) => ({
    //     ...storyInfo,
    //     type: 'image',
    //     image: readerEvent.target.result,
    //   }));
    // };
  };

  const handleReset = () => {
    setStoryInfo({
      type: '',
      image: '',
    });
  };

  // const handleUploadStory = () => {
  //   const uri = stageRef.current.toDataURL();
  //   console.log(uri);
  // };
  const handleUploadStory = async () => {
    const canvasImage = stageRef.current.toDataURL();
    setLoading(true);
    try {
      const { data } = await uploadStoryImageAPI({
        image: canvasImage,
        type: storyInfo.type,
        taggedUsers: [],
      });
      setLoading(false);
      router.push('/');
      console.log(data);
    } catch (error) {
      console.log(error);
    }
    // we also can save uri as file
    // downloadURI(uri, 'stage.png');
  };

  return (
    <div className="fixed top-0 left-0 flex h-screen w-full">
      <div className="relative w-[400px] space-y-3 bg-secondary p-2 shadow-lg sm:p-3">
        <div onClick={() => router.push('/')} className="flex items-center">
          <span className="mr-[10px] cursor-pointer rounded-full bg-button p-2">
            <XIcon className="h-6" />
          </span>
        </div>
        <hr />
        <div>
          <h2 className="text-lg font-semibold sm:text-2xl">你的限時動態</h2>
        </div>
        <div className="flex items-center space-x-3">
          <ProfilePic
            width={60}
            height={60}
            profileImage={userInfo.profileImage}
            gender={userInfo.gender}
            username={userInfo.username}
          />
          <p className="font-semibold">{userInfo.name}</p>
        </div>
        <hr />
        <div className="flex cursor-pointer items-center space-x-3">
          <span className="rounded-full border p-2">
            <TranslateIcon className="h-6" />
          </span>
          <p>新增文字</p>
        </div>
        <div>
          <textarea
            placeholder="type"
            onChange={(e) => setText(e.target.value)}
            className="min-h-[200px] w-full rounded-lg border p-2"
          />
          <button className="focus:outline-none group relative  mb-3 w-full cursor-pointer rounded-lg border p-2 text-left">
            <p className="p-2">{backgroundSelections[selectedIdx].title}</p>
            <div className="absolute left-0 bottom-0 z-40  hidden  w-full translate-y-full transform rounded-lg border bg-secondary p-2 text-left group-focus:block">
              {backgroundSelections.map((selection, idx) => (
                <p onClick={() => setSelectedIdx(idx)} className="p-2" key={selection.id}>
                  {selection.title}
                </p>
              ))}
            </div>
          </button>
          <div className="cursor-pointer rounded-lg border p-2">
            <h2>背景</h2>
            <div className="flex items-center space-x-3">
              {backgroundSelections[selectedIdx]?.selections?.map(({ src }) => (
                <Image
                  key={src}
                  className="mr-2 rounded-full"
                  src={src}
                  width={30}
                  height={30}
                  alt="selection"
                />
              ))}
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 flex w-full items-center border p-3">
          <button
            onClick={() => handleReset()}
            className="sm:text-md mr-[10px] rounded-lg p-3 px-5 text-sm shadow-lg"
          >
            捨棄
          </button>
          <button
            onClick={() => handleUploadStory()}
            className="sm:text-md flex-1 rounded-lg bg-main p-3 text-sm text-white shadow-lg"
          >
            分享到限時動態
          </button>
        </div>
      </div>
      {/* <div className="flex-1 bg-gray-100 flex items-center justify-center">
        {storyInfo.type ? (
          <Preview
            text={text}
            stageRef={stageRef}
            storyInfo={storyInfo}
            selectedIdx={selectedIdx}
          />
        ) : (
          <div className="flex items-center">
            <div
              onClick={() => inputRef.current.click()}
              className="flex items-center justify-center flex-col space-y-3 cursor-pointer   mr-[10px] w-[220px] h-[330px] bg-gradient-to-br from-main to-main-yellow text-white rounded-lg border"
            >
              <div className="border rounded-full p-2">
                <PhotographIcon className="h-6" />
              </div>{' '}
              <p>新增圖片限時動態</p>
            </div>
            <div
              onClick={() =>
                setStoryInfo((storyInfo) => ({ ...storyInfo, type: 'text' }))
              }
              className="flex items-center flex-col space-y-3 justify-center cursor-pointer w-[220px] h-[330px]  bg-gradient-to-br from-blue-500 to-pink-600 rounded-lg text-white   border  "
            >
              <div className="border rounded-full p-2">
                <TranslateIcon className="h-6" />
              </div>
              <p>新增文字</p>
            </div>
          </div>
        )}

        <input
          accept="image/png, image/gif, image/jpeg"
          ref={inputRef}
          type="file"
          onChange={(e) => handleImageSelected(e.target.files[0])}
          hidden
        />
      </div> */}
    </div>
  );
};

export default Create;
