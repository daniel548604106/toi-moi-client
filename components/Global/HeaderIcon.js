import React from 'react';
import { useRouter } from 'next/router';
const HeaderIcon = ({ Icon, active, title, href }) => {
  const router = useRouter();
  return (
    <div
      onClick={() => router.push(`${href}`)}
      className={`${
        active && 'text-main border-b-[2px]  rounded-none border-main'
      } cursor-pointer w-full text-gray-600  p-[20px]  h-14 flex items-center justify-center active:border-b-2 group   hover:bg-gray-100 rounded-md`}
    >
      <Icon
        className={`h-5 sm:h-7 group-hover:text-main ${active && 'text-main'}`}
      />
    </div>
  );
};

export default HeaderIcon;
