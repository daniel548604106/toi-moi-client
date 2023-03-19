import router from 'next/router';
import React from 'react';

const NoPost = () => {
  return (
    <div className="rounded-lg bg-secondary p-5 text-center text-secondary shadow-lg">
      <h2 className="text-lg font-semibold sm:text-2xl">No more posts</h2>
      <p className="text-xs sm:text-sm">Add more friends to see more posts in your News Feed.</p>
      <button
        onClick={() => router.push('/friends')}
        className="sm:text-md mt-3 rounded-lg bg-main p-2 px-4 text-sm text-white"
      >
        Find friends
      </button>
    </div>
  );
};

export default NoPost;
