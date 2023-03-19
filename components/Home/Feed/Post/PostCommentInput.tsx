import React, { useState } from 'react';

import useTranslation from 'next-translate/useTranslation';

import { useAppDispatch, useAppSelector } from '@/hooks/useAppRedux';

import { commentPostAPI } from '@/axios/postRequest';
import Avatar from '@/components/Global/Avatar';
import { setNotification } from '@/redux/slices/globalSlice';

interface PostCommentInputProps {
  post: any;
  setComments: (any) => void;
}

const PostCommentInput = (props: PostCommentInputProps) => {
  const { post, setComments } = props;
  const { t } = useTranslation('common');
  const dispatch = useAppDispatch();
  const { userInfo } = useAppSelector((state) => state.user);
  const [text, setText] = useState('');

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    if (text === '') return;
    try {
      const { data } = await commentPostAPI(post?._id, text);
      const newComment = data;
      setComments((comments) => [newComment, ...comments]);
      setText('');
      dispatch(setNotification('Comment posted!'));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex items-center p-1">
      <Avatar
        width={30}
        height={30}
        username={userInfo.username}
        profileImage={userInfo.profileImage}
        gender={userInfo.gender}
      />
      <form className="w-full" onSubmit={(e) => handleSubmitComment(e)}>
        <input
          onChange={(e) => setText(e.target.value)}
          value={text}
          type="text"
          placeholder={t('post.addComment')}
          className="focus:outline-none ml-[10px]   w-full rounded-full border px-[10px] py-[10px] text-sm"
        />
      </form>
    </div>
  );
};

export default PostCommentInput;
