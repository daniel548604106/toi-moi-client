import React from 'react';

import { SearchIcon, XIcon } from '@heroicons/react/outline';
import Image from 'next/image';
import { useRouter } from 'next/router';

import { deleteHistoryAPI } from '@/axios/searchRequest';

import genderAvatar from '@/utils/genderAvatar';

interface SearchHistoryItemProps {
  setSearchResultShow: (boolean) => void;
  history: any;
  searchHistory: any;
  setSearchHistory: (any) => void;
}

const SearchHistoryItem = (props: SearchHistoryItemProps) => {
  const { setSearchResultShow, history, searchHistory, setSearchHistory } = props;
  const router = useRouter();
  const handleDirectToHistory = () => {
    if (history.type === 'keyword') {
      router.push(`/search/top?q=${history.keyword}`);
    } else {
      router.push(`/${history.user.username}`);
    }
    setSearchResultShow(false);
  };

  const handleDelete = async (e) => {
    e.stopPropagation();

    try {
      const updatedHistory = searchHistory.filter((search) => search._id !== history._id);
      setSearchHistory(updatedHistory);
      console.log(history._id);
      const res = await deleteHistoryAPI(history._id);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div
      onClick={() => handleDirectToHistory()}
      className="flex cursor-pointer items-center justify-between rounded-md p-2 py-1 hover:bg-gray-100"
    >
      <div className="flex items-center">
        {history.type === 'user' ? (
          <Image
            className="cursor-pointer rounded-full object-cover"
            width={40}
            height={40}
            src={history.user.profileImage || genderAvatar(history.user.gender)}
            alt="profile-image"
          />
        ) : (
          <span className="flex h-[40px] w-[40px] items-center justify-center rounded-full bg-gray-100">
            {history.type === 'keyword' && <SearchIcon className="h-6" />}
          </span>
        )}

        <span className="ml-[15px]">
          {history.type === 'user' ? history.user.name : history.keyword}
        </span>
      </div>
      <span onClick={(e) => handleDelete(e)} className="rounded-full p-2 hover:bg-gray-200">
        <XIcon className="h-6" />
      </span>
    </div>
  );
};

export default SearchHistoryItem;
