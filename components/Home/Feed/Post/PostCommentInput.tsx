import useTranslation from 'next-translate/useTranslation';
import React, { useState } from 'react';

import { commentPostAPI } from '@/Axios/postRequest';
import Avatar from '@/Components/Global/Avatar';
import { useAppDispatch, useAppSelector } from '@/Hooks/useAppRedux';
import { setNotification } from '@/Redux/slices/globalSlice';

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
    <div className="p-1 flex items-center">
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
          className="border focus:outline-none   text-sm ml-[10px] rounded-full w-full px-[10px] py-[10px]"
        />
      </form>
    </div>
  );
};

export default PostCommentInput;
