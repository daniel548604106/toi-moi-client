import React, { Dispatch, SetStateAction, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';

import { DotsHorizontalIcon } from '@heroicons/react/solid';
import useTranslation from 'next-translate/useTranslation';
import router from 'next/router';

import useClickOutside from '@/hooks/useClickOutside';

import Avatar from '@/components/global/Avatar';
import { timeDiff } from '@/lib/dayjs';
import { getSavedPosts } from '@/redux/slices/postSlice';

import Popup from './Popup';

interface PostHeaderProps {
  post: any;
  setEditable: Dispatch<SetStateAction<boolean>>;
  deletePost: (string) => void;
}

const PostHeader = (props: PostHeaderProps) => {
  const { post, setEditable, deletePost } = props;
  const { t } = useTranslation('common');
  const dispatch = useDispatch();
  const elementRef = useRef();
  const [isPopupShow, setPopupShow] = useState(false);
  useClickOutside(elementRef, () => setPopupShow(false));

  const handleTogglePopup = () => {
    dispatch(getSavedPosts());
    setPopupShow(!isPopupShow);
  };

  return (
    <div className="sm:p-3">
      <div className="mb-[10px] flex justify-between items-start">
        <div className="flex items-center">
          <span>
            <Avatar
              width={40}
              height={40}
              username={post.user.username}
              profileImage={post.user.profileImage}
              gender={post.user.gender}
            />
          </span>
          <div className="ml-[10px]">
            <p onClick={() => router.push(`/${post.user.username}`)} className="flex items-center ">
              <span className="cursor-pointer font-semibold hover:underline">{post.user.name}</span>
              {post.type === 'profileCover' && (
                <span className=" ml-[5px] text-xs text-gray-600">
                  {t('post.changedProfileCover')}
                </span>
              )}
            </p>
            <p className="cursor-pointer text-xs text-gray-600 hover:underline">
              {timeDiff(post.createdAt)?.split(' ')[0]}
              <span className={router.locale === 'zh-TW' ? 'mx-0' : 'mx-1'}>
                {t(timeDiff(post.createdAt)?.split(' ')[1])}
              </span>
              {t('ago')}
            </p>
          </div>
        </div>
        <div
          ref={elementRef}
          className="focus:outline-none relative rounded-[50%] p-2 hover:bg-gray-100"
        >
          <DotsHorizontalIcon
            onClick={() => handleTogglePopup()}
            className="h-5 cursor-pointer text-gray-700 "
          />
          {isPopupShow ? (
            <div className="absolute  bottom-0 right-0 z-20 translate-y-full transform ">
              <Popup
                setPopupShow={setPopupShow}
                setEditable={setEditable}
                deletePost={deletePost}
                user={post.user}
                postId={post._id}
              />
            </div>
          ): null}
        </div>
      </div>
    </div>
  );
};

export default PostHeader;
