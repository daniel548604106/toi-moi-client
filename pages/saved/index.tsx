import React, { useEffect, useState } from 'react';

import Image from 'next/image';

import { useAppSelector } from '@/hooks/useAppRedux';

import { getSavedPostsAPI } from '@/axios/savedRequest';

import { LoaderSpinner } from '@/components/global/loader';
import SavedCard from '@/components/saved/SavedCard';

const Saved = () => {
  const { isLoading } = useAppSelector((state) => state.global);
  const [savedPosts, setSavedPosts] = useState(null);

  const handleGetSavedPosts = async () => {
    try {
      const { data } = await getSavedPostsAPI();
      setSavedPosts(data.posts);
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemoveSavedPost = (id: string) => {
    console.log(id, savedPosts);
    setSavedPosts(savedPosts.filter((post) => post.post._id !== id));
  };

  useEffect(() => {
    handleGetSavedPosts();
  }, []);

  return (
    <div className="mx-auto w-full max-w-[600px] p-2 py-3 sm:py-10 ">
      {savedPosts?.length > 0 ? (
        <div>
          <h2 className="text-lg font-semibold sm:text-2xl">Saved Posts</h2>
          <div>
            {savedPosts?.map((post) => (
              <SavedCard
                key={post._id}
                post={post.post}
                type={post.type}
                handleRemoveSavedPost={handleRemoveSavedPost}
                publisher={post.publisher}
              />
            ))}
          </div>
        </div>
      ) : isLoading ? (
        <LoaderSpinner />
      ) : (
        <div className="mt-[60px] flex w-full  flex-col items-center justify-center">
          <Image src="/images/empty-bookmark.svg" width="100" height="100" alt="empty-bookmark" />
          <h2 className="mt-5 text-lg font-semibold sm:text-2xl"> No Saved Post</h2>
        </div>
      )}
    </div>
  );
};

export default Saved;
