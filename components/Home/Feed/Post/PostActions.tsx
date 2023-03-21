import React, { useState } from 'react';

import {
  AnnotationIcon,
  ShareIcon,
  ThumbUpIcon as OutlineThumbUpIcon
} from '@heroicons/react/outline';
import { ThumbUpIcon as SolidThumbUpIcon } from '@heroicons/react/solid';
import useTranslation from 'next-translate/useTranslation';

import { useAppDispatch, useAppSelector } from '@/hooks/useAppRedux';
import useShare from '@/hooks/useShare';

import { likePostAPI, unlikePostAPI } from '@/axios/postRequest';

import { setNotification } from '@/redux/slices/globalSlice';

interface PostActionsProps {
  socket: any;
  likes: any;
  setCommentShow: (boolean) => void;
  post: any;
  setLikes: (any) => void;
}

const PostActions = (props: PostActionsProps) => {
  const { socket, likes, setCommentShow, post, setLikes } = props;
  const { t } = useTranslation('common');
  const dispatch = useAppDispatch();
  const { userInfo } = useAppSelector((state) => state.user);

  const handleShare = useShare();

  const [isLiked, setLiked] = useState(
    likes.length > 0 && likes.filter((like) => like.user === userInfo._id).length > 0,
  );
  const handleLikePost = async (id: string) => {
    if (socket.current) {
      socket.current.emit('likePost', { postId: id, userId: userInfo._id });
      socket.current.on('postLiked', () => {
        console.log('success');
        setLikes([...likes, { _id: id, user: userInfo._id }]);
        setLiked(true);
      });
    } else {
      try {
        // Still call the api if socket fails
        const { data } = await likePostAPI(id);
        setLikes([...likes, { user: id }]);
        setLiked(true);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleSharePost = async () => {
    const { text, _id, user } = post;
    const { username } = user;
    const url = new URL(`/${username}/posts/${_id}`, window.location.href).toString();
    handleShare(text, url, () => dispatch(setNotification('URL Copied')));
  };

  const handleUnlikePost = async (id) => {
    if (socket.current) {
      socket.current.emit('unlikePost', { postId: id, userId: userInfo._id });
      socket.current.on('postUnliked', () => {
        setLikes(likes.filter((like) => like.user !== userInfo._id));
        setLiked(false);
      });
    } else {
      try {
        // Still call the api if socket fails
        await unlikePostAPI(id);
        setLikes(likes.filter((like) => like.user !== id));
        setLiked(false);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="flex items-center  border-t p-1 sm:p-3">
      {isLiked ? (
        <div
          onClick={() => handleUnlikePost(post._id)}
          className="flex  flex-1 cursor-pointer items-center justify-center rounded-md p-2  text-main hover:bg-gray-100"
        >
          <SolidThumbUpIcon className="h-4 " />
          <span className="sm:text-md ml-[10px] text-sm">{t('post.like')}</span>
        </div>
      ) : (
        <div
          onClick={() => handleLikePost(post._id)}
          className="flex flex-1 cursor-pointer items-center  justify-center rounded-md p-2  text-gray-400 hover:bg-gray-100 hover:font-bold"
        >
          <OutlineThumbUpIcon className="h-4  " />
          <span className="sm:text-md ml-[10px] text-sm">{t('post.like')}</span>
        </div>
      )}
      <div
        onClick={() => setCommentShow(true)}
        className="flex  flex-1 cursor-pointer items-center justify-center  rounded-md p-2  text-gray-400 hover:bg-gray-100 hover:font-bold"
      >
        <AnnotationIcon className="h-4  " />
        <span className="sm:text-md ml-[10px] text-sm">{t('post.comment')}</span>
      </div>
      <div
        onClick={() => handleSharePost()}
        className="flex flex-1 cursor-pointer items-center  justify-center rounded-md p-2  text-gray-400 hover:bg-gray-100 hover:font-bold"
      >
        <ShareIcon className="h-4 " />
        <span className="sm:text-md ml-[10px] text-sm">{t('post.share')}</span>
      </div>
    </div>
  );
};

export default PostActions;
