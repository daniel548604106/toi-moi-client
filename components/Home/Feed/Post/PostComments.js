import React, { useState } from 'react';
import router from 'next/router';
import { timeDiff } from '@/Lib/dayjs';
import { apiLikeComment, apiUnlikeComment, apiDeleteComment } from '@/Api/index';
import { useSelector } from 'react-redux';
import { ThumbUpIcon, TrashIcon } from '@heroicons/react/solid';
import Avatar from '../../../Global/Avatar';
const Comment = ({ setComments, comments, postId, comment, t }) => {
  const userInfo = useSelector((state) => state.user.userInfo);
  const [isCommentLiked, setCommentLiked] = useState(
    comment.likes.length > 0 &&
      comment.likes.filter((like) => like.user === userInfo._id).length > 0,
  );
  const handleLikeComment = async (commentId) => {
    setCommentLiked(true);
    try {
      const { data } = await apiLikeComment(postId, commentId);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleUnlikeComment = async (commentId) => {
    setCommentLiked(false);
    try {
      const { data } = await apiUnlikeComment(postId, commentId);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      const { data } = await apiDeleteComment(postId, commentId);
      let remainedComments = comments.filter((comment) => comment._id !== commentId);
      setComments(remainedComments);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex  items-center">
      <Avatar
        width="30"
        height="30"
        username={comment.user.username}
        profileImage={comment.user.profileImage}
        gender={comment.user.gender}
      />
      <div className=" ml-[10px]">
        <div className="flex items-center group">
          <div className="relative py-1 px-3  rounded-xl bg-gray-100">
            <span
              onClick={() => router.push(`/${comment.user.username}`)}
              className="inline-block font-medium text-sm cursor-pointer hover:underline"
            >
              {comment.user.name}
            </span>
            <p className="text-sm  ">{comment.text}</p>
            {comment.likes.length > 0 && (
              <div className="absolute flex items-center text-xs transform cursor-pointer shadow-md translate-y-1/2 text-gray-400 bottom-2 right-1 translate-x-full rounded-full bg-secondary text-secondary p-1">
                <span className="p-1 rounded-full bg-main">
                  <ThumbUpIcon className="h-2 text-secondary" />
                </span>
                <span className="ml-[5px]">{comment.likes.length}</span>
              </div>
            )}
          </div>
          {comment.user._id === userInfo._id && (
            <span
              onClick={() => handleDeleteComment(comment._id)}
              className="hidden relative group ml-[10px] group-hover:block p-2 rounded-full bg-gray-100 cursor-pointer"
            >
              <TrashIcon className="h-3" />
            </span>
          )}
        </div>
        <div className="flex text-xs items-center py-1 text-gray-700">
          {isCommentLiked ? (
            <span
              onClick={() => handleUnlikeComment(comment._id)}
              className="cursor-pointer text-main"
            >
              {t('post.like')}
            </span>
          ) : (
            <span onClick={() => handleLikeComment(comment._id)} className="cursor-pointer">
              {t('post.like')}
            </span>
          )}
          <span className="cursor-pointer ml-[5px]">{t('post.reply')}</span>
          <span className="text-xs text-gray-600 ml-[5px]">{timeDiff(comment.date)}</span>
        </div>
      </div>
    </div>
  );
};

export default Comment;
