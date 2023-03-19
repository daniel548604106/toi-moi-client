import useTranslation from 'next-translate/useTranslation';
import React, { useState } from 'react';

import PostActions from './PostActions';
import PostCommentInput from './PostCommentInput';
import PostComments from './PostComments';
import PostContent from './PostContent';
import PostHeader from './PostHeader';
import PostStatus from './PostStatus';

interface PostsProps {
  post: any;
  socket: any;
  deletePost: (string) => void;
}

const Post = (props: PostsProps) => {
  const { post, socket, deletePost } = props;
  const { t } = useTranslation('common');
  const [isEditable, setEditable] = useState(false);
  const [isCommentShow, setCommentShow] = useState(post.comments.length > 0);
  const [likes, setLikes] = useState(post.likes);
  const [comments, setComments] = useState(post.comments);
  const [commentLength, setCommentLength] = useState(2);

  return (
    <div className="rounded-xl bg-secondary p-3 text-primary shadow-md">
      <PostHeader setEditable={setEditable} post={post} deletePost={deletePost} />
      <PostContent setEditable={setEditable} isEditable={isEditable} post={post} />
      <PostStatus
        setCommentShow={setCommentShow}
        isCommentShow={isCommentShow}
        likes={likes}
        comments={comments}
        post={post}
      />
      <PostActions
        setCommentShow={setCommentShow}
        socket={socket}
        likes={likes}
        setLikes={setLikes}
        post={post}
      />

      {isCommentShow && (
        <div>
          <PostCommentInput post={post} setComments={setComments} />
          {comments.length > 0 &&
            comments.slice(0, commentLength).map((comment) => (
              <div key={comment._id} className=" w-full p-1">
                <PostComments
                  t={t}
                  comments={comments}
                  setComments={setComments}
                  postId={post._id}
                  comment={comment}
                />
              </div>
            ))}
          {comments.length > 2 && commentLength < comments.length && (
            <span
              onClick={() => setCommentLength(commentLength + 5)}
              className="inline-block cursor-pointer text-xs"
            >
              {t('seeMore')}
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default Post;
