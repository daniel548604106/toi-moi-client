import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { SearchIcon, XIcon } from '@heroicons/react/outline';

import useDebounce from '@/hooks/useDebounce';

import { getSearchedChatsAPI } from '@/axios/chatRequest';

import Avatar from '@/components/global/Avatar';
import LoaderSpinner from '@/components/global/loader/LoaderSpinner';
import { addToChatBoxList } from '@/redux/slices/messageSlice';

interface SearchBoxProps {
  setSearchOpen: (boolean) => void;
}

const SearchBox = ({ setSearchOpen }: SearchBoxProps) => {
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState('');
  const [searchResult, setSearchResult] = useState([]);

  const debouncedSearchText = useDebounce(searchText);
  const handleAddToChatBox = (user) => {
    dispatch(addToChatBoxList(user));
    setSearchOpen(false);
  };

  useEffect(() => {
    const getSearchedContact = async () => {
      try {
        const { data } = await getSearchedChatsAPI(debouncedSearchText);
        setSearchResult(data);
      } catch (error) {
        console.log(error);
      }
    };
    getSearchedContact();
  }, [debouncedSearchText]);
  return (
    <div className=" relative mb-3 rounded-lg border bg-secondary p-2 py-3">
      <span
        onClick={() => setSearchOpen(false)}
        className=" absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 transform cursor-pointer rounded-full bg-black p-1 text-white"
      >
        <XIcon className="h-3 " />
      </span>
      <div className="flex  items-center rounded-lg border bg-secondary p-2">
        <SearchIcon className="mr-2 h-5" />
        <input
          onChange={(e) => setSearchText(e.target.value)}
          type="text"
          placeholder="Search Name"
          className="w-full bg-secondary text-xs sm:text-sm"
        />
      </div>
      {searchText ? (
        <div>
          {searchResult.length > 0 ? (
            <div>
              {searchResult.length > 0 &&
                searchResult.map(({ user }) => (
                  <div
                    onClick={() => handleAddToChatBox(user)}
                    key={user._id}
                    className="flex cursor-pointer items-center space-x-2 p-2"
                  >
                    <Avatar width={30} height={30} profileImage={user.profileImage} />
                    <span className="ml-3">{user.name}</span>
                  </div>
                ))}
            </div>
          ) : (
            <div>
              {searchResult.length === 0 ? (
                <div>
                  <div className="p-3 text-center">No Search Result</div>
                  <div className="text-center text-xs sm:text-sm">Try Another Name</div>
                </div>
              ) : (
                <div className="flex items-center justify-center p-3">
                  <LoaderSpinner />
                </div>
              )}
            </div>
          )}
        </div>
      ) : (
        <div className="p-3 text-center">Who are you searching for?</div>
      )}
    </div>
  );
};

export default SearchBox;
