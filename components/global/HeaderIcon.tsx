import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import React from 'react';

interface HeaderIconProps {
  Icon: any;
  href: string;
  activeTab: string;
  setActiveTab: (string) => void;
}

const HeaderIcon = (props: HeaderIconProps) => {
  const { Icon, href, activeTab, setActiveTab } = props;
  const router = useRouter();
  const active = activeTab === href;

  const handleClick = () => {
    setActiveTab(href);
    router.push(`${href}`);
  };

  return (
    <div
      onClick={() => handleClick()}
      className={`group relative flex h-14  w-full  cursor-pointer items-center justify-center rounded-md p-[10px] text-gray-600 active:border-b-2`}
    >
      <Icon className={`h-5 group-hover:text-main md:h-7 ${active && 'text-main'}`} />
      {active ? (
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-[2px] rounded-none border-main bg-main text-main"
          layoutId="underline"
        />
      ) : null}
    </div>
  );
};

export default HeaderIcon;
