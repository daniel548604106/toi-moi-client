import React from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';

const HeaderIcon = ({ Icon, href, activeTab, setActiveTab }) => {
  const router = useRouter();
  const active = activeTab === href;

  const handleClick = () => {
    setActiveTab(href);
    router.push(`${href}`);
  };
  return (
    <div
      onClick={() => handleClick()}
      className={`relative cursor-pointer w-full text-gray-600  p-[10px]  h-14 flex items-center justify-center active:border-b-2 group  hover:bg-gray-100 rounded-md`}
    >
      <Icon className={`h-5 md:h-7 group-hover:text-main ${active && 'text-main'}`} />
      {active ? (
        <motion.div
          className="text-main absolute h-[1px] bg-main bottom-0 left-0 right-0 rounded-none border-main"
          layoutId="underline"
        />
      ) : null}
    </div>
  );
};

export default HeaderIcon;
