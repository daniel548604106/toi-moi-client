import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { getSearchedChatsAPI } from '@/Axios/chatRequest';
import Avatar from '@/Components/Global/Avatar';
import LoaderSpinner from '@/Components/Global/LoaderSpinner';
import { addToChatBoxList } from '@/Redux/slices/messageSlice';
import { SearchIcon, XIcon } from '@heroicons/react/outline';

interface SearchBoxProps {
  setSearchOpen: (boolean) => void;
}

const SearchBox = ({ setSearchOpen }: SearchBoxProps) => {
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState('');
  const [searchResult, setSearchResult] = useState([]);

  const handleAddToChatBox = (user) => {
    dispatch(addToChatBoxList(user));
    setSearchOpen(false);
  };

  useEffect(() => {
    const getSearchedContact = async () => {
      try {
        const { data } = await getSearchedChatsAPI(searchText);
        setSearchResult(data);
      } catch (error) {
        console.log(error);
      }
    };
    getSearchedContact();
  }, [searchText]);
  return (
    <div className=" py-3 border rounded-lg relative p-2 bg-secondary mb-3">
      <span
        onClick={() => setSearchOpen(false)}
        className=" absolute top-0 right-0 p-1 transform -translate-y-1/2 translate-x-1/2 cursor-pointer rounded-full bg-black text-white"
      >
        <XIcon className="h-3 " />
      </span>
      <div className="flex  p-2 bg-secondary items-center border rounded-lg">
        <SearchIcon className="h-5 mr-2" />
        <input
          onChange={(e) => setSearchText(e.target.value)}
          type="text"
          placeholder="Search Name"
          className="text-xs w-full sm:text-sm bg-secondary"
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
                    className="flex cursor-pointer p-2 items-center space-x-2"
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
                <div className="flex p-3 items-center justify-center">
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
