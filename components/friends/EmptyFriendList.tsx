import React from 'react';

import Image from 'next/image';
import router from 'next/router';

const EmptyFriendList = () => {
  return (
    <div className="flex h-full flex-col items-center justify-center">
      <Image width={100} height={100} src="/images/empty-request.svg" alt="empty-request" />
      <p className="mt-3 text-lg font-semibold sm:text-xl">No Friend</p>
      <button
        onClick={() => router.push(`/friends/suggestions`)}
        className="rounded-lg bg-main p-3 text-white"
      >
        Find new friends
      </button>
    </div>
  );
};

export default EmptyFriendList;
