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
      className={`relative cursor-pointer w-full text-gray-600  p-[10px]  h-14 flex items-center justify-center active:border-b-2 group rounded-md`}
    >
      <Icon className={`h-5 md:h-7 group-hover:text-main ${active && 'text-main'}`} />
      {active ? (
        <motion.div
          className="text-main absolute h-[2px] bg-main bottom-0 left-0 right-0 rounded-none border-main"
          layoutId="underline"
        />
      ) : null}
    </div>
  );
};

export default HeaderIcon;
