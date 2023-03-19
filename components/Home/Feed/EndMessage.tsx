import React from 'react';

import { CheckCircleIcon } from '@heroicons/react/outline';

const EndMessage = () => {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg bg-secondary p-5 text-center text-secondary shadow-lg">
      <CheckCircleIcon className="mb-3 h-10 text-main" />
      <h2 className="text-lg font-semibold sm:text-2xl">You've completely caught up for now</h2>
    </div>
  );
};

export default EndMessage;
