import React, { useState, useEffect } from 'react';
import { TrashIcon, BookmarkIcon, PencilAltIcon } from '@heroicons/react/outline';
import { BookmarkIcon as SolidBookmarkIcon } from '@heroicons/react/solid';
import { apiDeletePost } from '@/Axios/index';
import { useSelector, useDispatch } from 'react-redux';
import { apiPostNewSavedPost, apiDeleteSavedPost } from '@/Axios/index';
import { setNotification } from '@/Redux/slices/globalSlice';
import { getSavedPosts } from '@/Redux/slices/postSlice';
const Popup = ({ setPopupShow, setEditable, postId, user, deletePost }) => {
  const dispatch = useDispatch();
  const { savedPosts } = useSelector((state) => state.post);
  const userInfo = useSelector((state) => state.user.userInfo);
  const [isSaved, setSaved] = useState(savedPosts.map((saved) => saved.post._id).includes(postId));

  const handleDeletePost = async () => {
    try {
      const { data } = await apiDeletePost(postId);
      // dispatch(getSavedPosts())
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
        const { data } = await apiPostNewSavedPost({
          type: 'post',
          postId,
          publisherId: user._id,
        });
        dispatch(setNotification('Post saved'));
        console.log(data);
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
