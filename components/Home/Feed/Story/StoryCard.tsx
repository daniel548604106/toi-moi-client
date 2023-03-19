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
    <div className="group relative flex h-44 w-1/4 flex-shrink-0 cursor-pointer flex-col overflow-hidden rounded-xl transition duration-75 hover:opacity-80 sm:w-1/5  ">
      <Image
        className="h-full object-cover filter transition-all duration-150  group-hover:scale-110 group-hover:transform"
        layout="fill"
        src={src}
        alt="story"
      />
      <div className="absolute top-2 left-[8px] top-[20px] z-10  rounded-full border-4 border-white">
        <Image
          className=" rounded-full object-cover"
          src={profile}
          width={40}
          height={40}
          layout="fixed"
          alt="profile-image"
        />
      </div>
      <span className="absolute bottom-3 left-3 max-w-[50px] truncate text-secondary">{name}</span>
    </div>
  );
};

export default StoryCard;
