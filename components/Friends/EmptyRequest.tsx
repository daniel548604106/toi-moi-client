import React from 'react';

import Image from 'next/image';

const EmptyRequest = () => {
  return (
    <div className="flex h-full flex-col items-center justify-center">
      <Image width={100} height={100} src="/images/empty-request.svg" alt="empty-request" />
      <p className="mt-3 text-lg font-semibold sm:text-xl">No Requests Found</p>
    </div>
  );
};

export default EmptyRequest;
