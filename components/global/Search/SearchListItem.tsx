import React from 'react';

import Image from 'next/image';
import { useRouter } from 'next/router';

import { postUserSearchAPI } from '@/axios/searchRequest';

import genderAvatar from '@/utils/genderAvatar';

interface SearchListItemProps {
  username: string;
  name: string;
  profileImage: string;
  gender: 'male' | 'female' | 'other';
  setSearchResultShow: (boolean) => void;
}

const SearchListItem = (props: SearchListItemProps) => {
  const { username, name, profileImage, gender, setSearchResultShow } = props;
  const router = useRouter();
  const handleDirectToProfile = async () => {
    router.push(`/${username}`);
    try {
      setSearchResultShow(false);
      const res = await postUserSearchAPI(username);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div
      className="flex cursor-pointer items-center rounded-md p-[10px] hover:bg-gray-200 "
      onClick={() => handleDirectToProfile()}
    >
      {name &&
        (profileImage ? (
          <div className="flex flex-1 items-center justify-between">
            <div className="flex items-center">
              <Image
                className="rounded-full object-cover"
                layout="fixed"
                src={profileImage || genderAvatar(gender)}
                width={40}
                height={40}
                alt="profile-image"
              />
              <p className="ml-[10px] font-medium">{name}</p>
            </div>
          </div>
        ) : (
          <>
            <Image
              className="rounded-full object-cover"
              layout="fixed"
              src={genderAvatar(gender)}
              width={40}
              height={40}
              alt="gender-avatar"
            />
            <p className="ml-[10px] font-medium">{name}</p>
          </>
        ))}
    </div>
  );
};

export default SearchListItem;
