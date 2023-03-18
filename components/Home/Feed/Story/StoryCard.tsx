import React from 'react';

import Image from 'next/image';

interface StoryCardProps {
  name: string;
  profile: string;
  src: string;
}

const StoryCard = (props: StoryCardProps) => {
  const { name, profile, src } = props;
  return (
    <div className="group flex-shrink-0 w-1/4 sm:w-1/5 relative h-44 overflow-hidden flex flex-col rounded-xl transition duration-75 cursor-pointer hover:opacity-80  ">
      <Image
        className="object-cover h-full filter group-hover:transform group-hover:scale-110  transition-all duration-150"
        layout="fill"
        src={src}
        alt="story"
      />
      <div className="absolute rounded-full top-2 border-white border-4  z-10 left-[8px] top-[20px]">
        <Image
          className=" object-cover rounded-full"
          src={profile}
          width={40}
          height={40}
          layout="fixed"
          alt="profile-image"
        />
      </div>
      <span className="text-secondary bottom-3 left-3 absolute max-w-[50px] truncate">{name}</span>
    </div>
  );
};

export default StoryCard;
