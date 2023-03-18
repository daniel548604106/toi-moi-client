import React, { Dispatch, SetStateAction, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';

import { DotsHorizontalIcon } from '@heroicons/react/solid';
import useTranslation from 'next-translate/useTranslation';
import router from 'next/router';

import useClickOutside from '@/Hooks/useClickOutside';

import Avatar from '@/Components/Global/Avatar';
import { timeDiff } from '@/Lib/dayjs';
import { getSavedPosts } from '@/Redux/slices/postSlice';

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
  const elRef = useRef();
  const [isPopupShow, setPopupShow] = useState(false);
  useClickOutside(elRef, () => setPopupShow(false));

  const handleTogglePopup = () => {
    dispatch(getSavedPosts());
    setPopupShow(!isPopupShow);
  };

  return (
    <div className=" sm:p-3">
      <div className="flex justify-between  mb-[10px]">
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
              <span className="font-semibold hover:underline cursor-pointer">{post.user.name}</span>
              {post.type === 'profileCover' && (
                <span className=" ml-[5px] text-xs text-gray-600">
                  {t('post.changedProfileCover')}
                </span>
              )}
            </p>
            <p className="text-xs text-gray-600 hover:underline cursor-pointer">
              {timeDiff(post.createdAt)?.split(' ')[0]}
              <span className={router.locale === 'zh-TW' ? 'mx-0' : 'mx-1'}>
                {t(timeDiff(post.createdAt)?.split(' ')[1])}
              </span>
              {t('ago')}
            </p>
          </div>
        </div>
        <div
          ref={elRef}
          className="focus:outline-none p-2 relative rounded-full  hover:bg-gray-100"
        >
          <DotsHorizontalIcon
            onClick={() => handleTogglePopup()}
            className="h-5 cursor-pointer text-gray-700 "
          />
          {isPopupShow && (
            <div className="z-20  absolute bottom-0 transform translate-y-full right-0 ">
              <Popup
                setPopupShow={setPopupShow}
                setEditable={setEditable}
                deletePost={deletePost}
                user={post.user}
                postId={post._id}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostHeader;
