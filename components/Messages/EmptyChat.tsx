import React from 'react';

import Image from 'next/image';

const EmptyChat = () => {
  return (
    <div className="flex w-full flex-col  items-center justify-center">
      <Image src="/images/empty-message.svg" width={100} height={100} alt="empty-message" />
      <div className="mt-3 text-lg font-semibold sm:text-xl">No Message</div>
    </div>
  );
};

export default EmptyChat;
