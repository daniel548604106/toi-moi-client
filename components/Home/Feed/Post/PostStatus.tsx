import React from 'react';
import { useDispatch } from 'react-redux';

import { ThumbUpIcon as SolidThumbUpIcon } from '@heroicons/react/solid';
import useTranslation from 'next-translate/useTranslation';

import { apiGetLikesList, setLikesListOpen } from '@/redux/slices/postSlice';
import { getFriendList } from '@/redux/slices/userSlice';

interface PostStatusProps {
  likes: any;
  comments: any;
  post: any;
  setCommentShow: (boolean) => void;
  isCommentShow: boolean;
}

const PostStatus = (props: PostStatusProps) => {
  const { likes, comments, post, setCommentShow, isCommentShow } = props;
  const { t } = useTranslation('common');
  const dispatch = useDispatch();
  const handleLikesListOpen = (postId) => {
    dispatch(setLikesListOpen(true));
    dispatch(getFriendList());
    dispatch(apiGetLikesList(postId));
  };
  return (
    <div className="flex items-center justify-between  text-sm my-[10px]">
      <div>
        {likes.length > 0 && (
          <div
            onClick={() => handleLikesListOpen(post._id)}
            className="flex items-center cursor-pointer hover:underline"
          >
            <span className="rounded-full p-1 bg-main text-white">
              <SolidThumbUpIcon className="h-3 " />
            </span>

            <span className="text-gray-600 ml-[3px] ">{likes.length}</span>
          </div>
        )}
      </div>
      <div onClick={() => setCommentShow(!isCommentShow)}>
        {comments.length > 0 && (
          <span className="text-gray-600 lowercase cursor-pointer hover:underline">
            {comments.length}
            {comments.length === 1 ? t('post.commentTotal') : t('post.commentTotal')}
          </span>
        )}
      </div>
    </div>
  );
};

export default PostStatus;
