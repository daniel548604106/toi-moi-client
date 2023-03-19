import React, { useEffect, useState } from 'react';

import useTranslation from 'next-translate/useTranslation';
import Image from 'next/image';

import { useAppDispatch, useAppSelector } from '@/hooks/useAppRedux';

import { updatePostAPI } from '@/axios/postRequest';

import Loader from '@/components/Global/Loader';
import * as ga from '@/lib/gtag';
import { setNotification } from '@/redux/slices/globalSlice';
import {
  apiGetCurrentPost,
  setActiveViewPostIndex,
  setViewPostModalOpen,
} from '@/redux/slices/postSlice';

const renderImageLayout = (length, index) => {
  switch (length) {
    case 2:
      return 'col-span-6 pb-[50%]';
      break;
    case 3:
      if (index === 2) {
        return 'col-span-6 pb-[50%]';
      }
      return 'pb-[100%] col-span-3';
      break;
    case 4:
      return 'pb-[100%] col-span-3';
      break;
    default:
      return 'pb-[50%] col-span-2';
  }
};

const PostContent = ({ post, isEditable, setEditable }) => {
  const { t } = useTranslation('common');
  const dispatch = useAppDispatch();
  const isViewPostModalOpen = useAppSelector((state) => state.post.isViewPostModalOpen);

  const { images, text } = post;
  const [showMore, setShowMore] = useState(text?.length > 150);
  const [latestText, setLatestText] = useState(text || '');
  const [editedText, setEditedText] = useState(text || '');
  const [isLoading, setLoading] = useState(false);
  const [isEdited, setEdited] = useState(false);

  const handleViewPost = async (postId, index = 0) => {
    ga.event({
      action: 'click',
      category: 'post',
      label: 'post',
      value: postId,
    });
    await dispatch(apiGetCurrentPost(postId));
    dispatch(setActiveViewPostIndex(index));
    dispatch(setViewPostModalOpen(true));
  };

  const handleCancelEdit = () => {
    setEditable(false);
    setEditedText(post.text);
  };

  const handleUpdateEditedPost = async () => {
    if (!isEdited) return;
    setLoading(true);
    try {
      const { data } = await updatePostAPI(post._id, editedText);
      console.log(data);
      setLatestText(editedText);
      setLoading(false);
      setEditable(false);
      dispatch(setNotification('Post updated!'));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    editedText === post.text ? setEdited(false) : setEdited(true);
  }, [editedText, post.text]);
  return (
    <div className="space-y-2">
      {isEditable ? (
        <div>
          <textarea
            className="focus:outline-none sm:text-md min-h-[100px] w-full rounded-lg border p-2 text-sm  sm:min-h-[200px]"
            placeholder="Write something about the post"
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
          />
          <div className="flex items-center justify-end space-x-2">
            <button
              onClick={() => handleCancelEdit()}
              className="rounded-lg border p-2  text-xs sm:text-sm"
            >
              Cancel
            </button>
            <button
              onClick={() => handleUpdateEditedPost()}
              className={`${
                isEdited ? 'bg-main text-white' : 'cursor-not-allowed bg-button'
              } rounded-lg p-2 text-xs  sm:text-sm  `}
            >
              {isLoading ? <Loader /> : 'Update'}
            </button>
          </div>
        </div>
      ) : (
        <div>
          <p className={`${showMore && 'line-clamp-3'} mb-2 text-sm`}>{latestText}</p>
          {showMore && (
            <span
              onClick={() => setShowMore(false)}
              className="flex cursor-pointer items-center justify-end text-xs text-main"
            >
              {t('post.readMore')}
            </span>
          )}
        </div>
      )}
      {images?.length > 1
        ? !isViewPostModalOpen && (
            <div className="grid grid-cols-6 gap-2">
              {images.map((image, index) => (
                <div
                  key={image}
                  onClick={() => handleViewPost(post._id, index)}
                  className={`${renderImageLayout(images?.length, index)} relative cursor-pointer`}
                >
                  <Image
                    src={image}
                    layout="fill"
                    objectFit="cover"
                    className="image rounded-lg "
                    alt="image"
                  />
                </div>
              ))}
            </div>
          )
        : !isViewPostModalOpen &&
          post?.picUrl && (
            <div onClick={() => handleViewPost(post._id)} className="imageContainer cursor-pointer">
              <Image src={post.picUrl} layout="fill" className="image rounded-lg " alt="post" />
            </div>
          )}
    </div>
  );
};

export default PostContent;
