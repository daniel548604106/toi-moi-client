import React, { useRef, useState } from 'react';

import { DotsHorizontalIcon, TrashIcon } from '@heroicons/react/outline';
import router from 'next/router';

import useClickOutside from '@/hooks/useClickOutside';

import { deleteSavedPostAPI } from '@/axios/savedRequest';

import genderAvatar from '@/utils/genderAvatar';

interface SavedCardProps {
  post: any;
  publisher: any;
  type: string;
  handleRemoveSavedPost: (string) => void;
}
const SavedCard = (props: SavedCardProps) => {
  const { post, publisher, type, handleRemoveSavedPost } = props;
  const [isDropdownShow, setDropdownShow] = useState(false);
  const elRef = useRef();
  useClickOutside(elRef, () => setDropdownShow(false));
  const handleToggleDropdown = (e) => {
    e.stopPropagation();
    setDropdownShow(!isDropdownShow);
  };
  const handleDeletePost = async (id) => {
    handleRemoveSavedPost(id);
    try {
      const { data } = await deleteSavedPostAPI(id);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div
      onClick={() => router.push(`/${publisher.username}/posts/${post._id}`)}
      className="relative flex w-full cursor-pointer items-center justify-between rounded-lg p-2 shadow-lg"
    >
      <div className="flex items-center">
        <img
          className="h-[60px] w-[60px] rounded-lg object-cover sm:h-[100px] sm:w-[100px]"
          src={post.picUrl || publisher.profileImage || genderAvatar(publisher.gender)}
          alt="profile-image"
        />
        <div className="ml-[10px] flex-1 space-y-2 truncate">
          <p className="w-[200px] overflow-hidden truncate text-xs sm:w-[300px] sm:text-sm">
            {post.text}
          </p>
          <span className="inline-block rounded-lg bg-main p-1 text-xs text-white sm:p-2 sm:text-sm">
            {type}
          </span>
        </div>
      </div>
      <span
        ref={elRef}
        onClick={(e) => handleToggleDropdown(e)}
        className="absolute top-1/2 right-2 -translate-y-1/2   transform rounded-full border p-2"
      >
        <DotsHorizontalIcon className="h-4 w-4 sm:w-6" />
        {isDropdownShow && (
          <div
            onClick={() => handleDeletePost(post._id)}
            className="absolute right-0 bottom-0 flex translate-y-full transform items-center justify-center rounded-lg border p-2"
          >
            <TrashIcon className="mr-2 h-4 sm:h-6 " />{' '}
            <span className="text-xs sm:text-sm">Delete</span>
          </div>
        )}
      </span>
    </div>
  );
};

export default SavedCard;
