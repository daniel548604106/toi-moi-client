import React from 'react';

import Image from 'next/dist/client/image';

const EmptyBirthday = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <Image src="/images/empty-birthday.svg" width={100} height={100} alt="birthday" />
      <div className="mt-3 text-lg font-semibold sm:text-2xl">No Birthday Found From Friends</div>
    </div>
  );
};

export default EmptyBirthday;
