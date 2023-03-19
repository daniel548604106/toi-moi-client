import React, { useState } from 'react';

import { BookmarkIcon, PencilAltIcon, TrashIcon } from '@heroicons/react/outline';
import { BookmarkIcon as SolidBookmarkIcon } from '@heroicons/react/solid';

import { UserInfo } from '@/interfaces/I_common';

import { deletePostAPI } from '@/axios/postRequest';
import { deleteSavedPostAPI, postNewSavedPostAPI } from '@/axios/savedRequest';

import { useAppDispatch, useAppSelector } from '@/hooks/useAppRedux';
import { setNotification } from '@/redux/slices/globalSlice';
import { getSavedPosts } from '@/redux/slices/postSlice';

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
        await deleteSavedPostAPI(postId);
        dispatch(setNotification('Remove saved post'));
      } else {
        await postNewSavedPostAPI({
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
    <ul className="rounded-md bg-secondary p-2 text-xs  text-secondary  shadow-lg sm:text-sm">
      {user.username === userInfo.username && (
        <>
          <li
            onClick={() => handleEditPost()}
            className="flex cursor-pointer items-center rounded-md py-2 px-3 hover:bg-gray-100"
          >
            <PencilAltIcon className="h-5" />
            <span className="ml-[10px] whitespace-nowrap text-sm">Edit Post</span>
          </li>
          <li
            onClick={() => handleDeletePost()}
            className="flex cursor-pointer items-center rounded-md py-2 px-3 hover:bg-gray-100"
          >
            <TrashIcon className="h-5" />
            <span className="ml-[10px] whitespace-nowrap text-sm">Move to trash can</span>
          </li>
        </>
      )}
      <li
        onClick={() => handleSavePost()}
        className={`flex cursor-pointer items-center rounded-md py-2 px-3 hover:bg-gray-100  ${
          isSaved && 'text-main'
        }`}
      >
        {isSaved ? <SolidBookmarkIcon className="h-5" /> : <BookmarkIcon className="h-5" />}
        <span className={`ml-[10px] whitespace-nowrap text-sm`}>
          {isSaved ? 'Saved' : 'Save post'}
        </span>
      </li>
    </ul>
  );
};

export default Popup;
