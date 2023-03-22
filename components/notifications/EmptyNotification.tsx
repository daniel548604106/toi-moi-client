import React from 'react';

import Image from 'next/image';

const EmptyNotification = () => {
  return (
    <div className="flex min-h-[300px] w-full flex-col items-center justify-center">
      <Image src="/images/empty-box.svg" width={100} height={100} alt="empty-box" />
      <span className="mt-3 text-lg font-semibold sm:text-xl">No notifications</span>
    </div>
  );
};

export default EmptyNotification;
