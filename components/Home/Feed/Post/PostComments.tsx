import React, { useState } from 'react';

import { ThumbUpIcon, TrashIcon } from '@heroicons/react/solid';
import router from 'next/router';

import { useAppSelector } from '@/hooks/useAppRedux';

import { deleteCommentAPI, likeCommentAPI, unlikeCommentAPI } from '@/axios/postRequest';

import ProfilePic from '@/components/ProfilePic';
import { timeDiff } from '@/lib/dayjs';

interface CommentProps {
  setComments: (any) => void;
  comments: any;
  postId: string;
  comment: any;
  t: (string) => string;
}

const Comment = (props: CommentProps) => {
  const { setComments, comments, postId, comment, t } = props;
  const userInfo = useAppSelector((state) => state.user.userInfo);
  const [isCommentLiked, setCommentLiked] = useState(
    comment.likes.length > 0 &&
      comment.likes.filter((like) => like.user === userInfo._id).length > 0,
  );
  const handleLikeComment = async (commentId) => {
    setCommentLiked(true);
    try {
      const { data } = await likeCommentAPI(postId, commentId);
    } catch (error) {
      console.log(error);
    }
  };
  const handleUnlikeComment = async (commentId) => {
    setCommentLiked(false);
    try {
      const { data } = await unlikeCommentAPI(postId, commentId);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      const { data } = await deleteCommentAPI(postId, commentId);
      let remainedComments = comments.filter((comment) => comment._id !== commentId);
      setComments(remainedComments);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex items-center">
      <ProfilePic
        width={24}
        height={24}
        username={comment.user.username}
        profileImage={comment.user.profileImage}
        gender={comment.user.gender}
      />
      <div className=" ml-[10px]">
        <div className="group flex items-center">
          <div className="relative rounded-xl bg-gray-100  py-1 px-3">
            <span
              onClick={() => router.push(`/${comment.user.username}`)}
              className="inline-block cursor-pointer text-sm font-medium hover:underline"
            >
              {comment.user.name}
            </span>
            <p className="text-sm  ">{comment.text}</p>
            {comment.likes.length > 0 && (
              <div className="absolute bottom-2 right-1 flex translate-y-1/2 translate-x-full transform cursor-pointer items-center rounded-full bg-secondary p-1 text-xs text-gray-400 text-secondary shadow-md">
                <span className="rounded-full bg-main p-1">
                  <ThumbUpIcon className="h-2 text-secondary" />
                </span>
                <span className="ml-[5px]">{comment.likes.length}</span>
              </div>
            )}
          </div>
          {comment.user._id === userInfo._id && (
            <span
              onClick={() => handleDeleteComment(comment._id)}
              className="group relative ml-[10px] hidden cursor-pointer rounded-full bg-gray-100 p-2 group-hover:block"
            >
              <TrashIcon className="h-3" />
            </span>
          )}
        </div>
        <div className="flex items-center py-1 text-xs text-gray-700">
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
          <span className="ml-[5px] cursor-pointer">{t('post.reply')}</span>
          <span className="ml-[5px] text-xs text-gray-600">{timeDiff(comment.date)}</span>
        </div>
      </div>
    </div>
  );
};

export default Comment;
