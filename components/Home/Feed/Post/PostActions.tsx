import useTranslation from 'next-translate/useTranslation';
import React, { useState } from 'react';

import { apiLikePost, apiUnlikePost } from '@/Axios/index';
import { useAppSelector } from '@/Hooks/useAppRedux';
import {
    AnnotationIcon, ShareIcon, ThumbUpIcon as OutlineThumbUpIcon
} from '@heroicons/react/outline';
import { ThumbUpIcon as SolidThumbUpIcon } from '@heroicons/react/solid';

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
  const { userInfo } = useAppSelector((state) => state.user);
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
        const { data } = await apiLikePost(id);
        setLikes([...likes, { user: id }]);
        setLiked(true);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleSharePost = async () => {
    try {
      const { text, picUrl } = post;
      const data = {
        title: text,
        url: 'https://developer.mozilla.org',
        text,
      };

      // navigator.share will only work on websites with https and not HTTP
      await navigator.share(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUnlikePost = async (id) => {
    if (socket.current) {
      socket.current.emit('unlikePost', { postId: id, userId: userInfo._id });
      socket.current.on('postUnliked', () => {
        console.log('unliked');
        setLikes(likes.filter((like) => like.user !== userInfo._id));
        setLiked(false);
      });
    } else {
      try {
        // Still call the api if socket fails
        const { data } = await apiUnlikePost(id);
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
          className="rounded-md  flex items-center justify-center p-2 hover:bg-gray-100 flex-1  cursor-pointer text-main"
        >
          <SolidThumbUpIcon className="h-4 " />
          <span className="text-sm sm:text-md ml-[10px]">{t('post.like')}</span>
        </div>
      ) : (
        <div
          onClick={() => handleLikePost(post._id)}
          className="rounded-md flex items-center justify-center  p-2 hover:bg-gray-100 flex-1  cursor-pointer text-gray-400"
        >
          <OutlineThumbUpIcon className="h-4  " />
          <span className="text-sm sm:text-md ml-[10px]">{t('post.like')}</span>
        </div>
      )}
      <div
        onClick={() => setCommentShow(true)}
        className="rounded-md  flex items-center justify-center p-2  hover:bg-gray-100 flex-1  cursor-pointer text-gray-400"
      >
        <AnnotationIcon className="h-4  " />
        <span className="text-sm sm:text-md ml-[10px]">{t('post.comment')}</span>
      </div>
      <div
        onClick={() => handleSharePost()}
        className="rounded-md flex items-center justify-center  p-2 hover:bg-gray-100 flex-1  cursor-pointer text-gray-400"
      >
        <ShareIcon className="h-4 " />
        <span className="text-sm sm:text-md ml-[10px]">{t('post.share')}</span>
      </div>
    </div>
  );
};

export default PostActions;
