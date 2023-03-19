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
    <div className="my-[10px] flex items-center  justify-between text-sm">
      <div>
        {likes.length > 0 && (
          <div
            onClick={() => handleLikesListOpen(post._id)}
            className="flex cursor-pointer items-center hover:underline"
          >
            <span className="rounded-full bg-main p-1 text-white">
              <SolidThumbUpIcon className="h-3 " />
            </span>

            <span className="ml-[3px] text-gray-600 ">{likes.length}</span>
          </div>
        )}
      </div>
      <div onClick={() => setCommentShow(!isCommentShow)}>
        {comments.length > 0 && (
          <span className="cursor-pointer lowercase text-gray-600 hover:underline">
            {comments.length}
            {comments.length === 1 ? t('post.commentTotal') : t('post.commentTotal')}
          </span>
        )}
      </div>
    </div>
  );
};

export default PostStatus;
