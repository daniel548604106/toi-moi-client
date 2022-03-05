import React, { useEffect, useState } from 'react';

import { apiDeleteSavedPost, apiPostNewSavedPost } from '@/Axios/index';
import { deletePostAPI } from '@/Axios/postRequest';
import { useAppDispatch, useAppSelector } from '@/Hooks/useAppRedux';
import { UserInfo } from '@/Interfaces/I_common';
import { setNotification } from '@/Redux/slices/globalSlice';
import { getSavedPosts } from '@/Redux/slices/postSlice';
import { BookmarkIcon, PencilAltIcon, TrashIcon } from '@heroicons/react/outline';
import { BookmarkIcon as SolidBookmarkIcon } from '@heroicons/react/solid';

interface PopupProps {
  setPopupShow: (boolean) => void;
  setEditable: (boolean) => void;
  postId: string;
  user: UserInfo;
  deletePost: (string) => void;
}

const Popup = (props: PopupProps) => {
  const { setPopupShow, setEditable, postId, user, deletePost } = props;
  const dispatch = useAppDispatch();
  const { savedPosts } = useAppSelector((state) => state.post);
  const userInfo = useAppSelector((state) => state.user.userInfo);
  const [isSaved, setSaved] = useState(savedPosts.map((saved) => saved.post._id).includes(postId));

  const handleDeletePost = async () => {
    try {
      const { data } = await deletePostAPI(postId);
      console.log(data);
      deletePost(postId);
      dispatch(setNotification('Post deleted'));
      setPopupShow(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditPost = () => {
    setEditable(true);
    setPopupShow(false);
  };

  const handleSavePost = async () => {
    try {
      if (isSaved) {
        await apiDeleteSavedPost(postId);
        dispatch(setNotification('Remove saved post'));
      } else {
        await apiPostNewSavedPost({
          type: 'post',
          postId,
          publisherId: user._id,
        });
        dispatch(setNotification('Post saved'));
      }
      dispatch(getSavedPosts());
      setPopupShow(false);
      setSaved(!isSaved);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <ul className="shadow-lg p-2 text-xs sm:text-sm  rounded-md  bg-secondary text-secondary">
      {user.username === userInfo.username && (
        <>
          <li
            onClick={() => handleEditPost()}
            className="cursor-pointer rounded-md flex items-center hover:bg-gray-100 py-2 px-3"
          >
            <PencilAltIcon className="h-5" />
            <span className="ml-[10px] text-sm whitespace-nowrap">Edit Post</span>
          </li>
          <li
            onClick={() => handleDeletePost()}
            className="cursor-pointer rounded-md flex items-center hover:bg-gray-100 py-2 px-3"
          >
            <TrashIcon className="h-5" />
            <span className="ml-[10px] text-sm whitespace-nowrap">Move to trash can</span>
          </li>
        </>
      )}
      <li
        onClick={() => handleSavePost()}
        className={`cursor-pointer rounded-md flex items-center hover:bg-gray-100 py-2 px-3  ${
          isSaved && 'text-main'
        }`}
      >
        {isSaved ? <SolidBookmarkIcon className="h-5" /> : <BookmarkIcon className="h-5" />}
        <span className={`ml-[10px] text-sm whitespace-nowrap`}>
          {isSaved ? 'Saved' : 'Save post'}
        </span>
      </li>
    </ul>
  );
};

export default Popup;
