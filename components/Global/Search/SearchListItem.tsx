import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';

import { apiPostUserSearch } from '@/Axios/index';
import genderAvatar from '@/Utils/genderAvatar';

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
      const res = await apiPostUserSearch(username);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div
      className="flex items-center p-[10px] cursor-pointer rounded-md hover:bg-gray-200 "
      onClick={() => handleDirectToProfile()}
    >
      {name &&
        (profileImage ? (
          <div className="flex items-center justify-between flex-1">
            <div className="flex items-center">
              <Image
                className="rounded-full object-cover"
                layout="fixed"
                src={profileImage || genderAvatar(gender)}
                width={40}
                height={40}
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
            />
            <p className="ml-[10px] font-medium">{name}</p>
          </>
        ))}
    </div>
  );
};

export default SearchListItem;
