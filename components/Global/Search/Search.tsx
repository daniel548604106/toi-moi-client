import React, { useEffect, useRef, useState } from 'react';

import { ChevronLeftIcon, SearchIcon } from '@heroicons/react/outline';
import router from 'next/router';

import useDebounce from '@/hooks/useDebounce';

import { getRecentSearchAPI, postKeywordSearchAPI, searchRequestAPI } from '@/axios/searchRequest';

import * as ga from '@/lib/gtag';

import SearchHistoryItem from './SearchHistoryItem';
import SearchListItem from './SearchListItem';

interface SearchProps {
  t: (text: string) => string;
}

const Search = ({ t }: SearchProps) => {
  const [searchText, setSearchText] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [searchHistory, setSearchHistory] = useState(null);
  const [isSearchResultShow, setSearchResultShow] = useState(false);
  const searchInputRef = useRef(null);

  const debouncedSearchText = useDebounce(searchText);

  const handleInputFocus = () => {
    setSearchResultShow(true);
  };

  const search = async () => {
    try {
      const res = await searchRequestAPI(debouncedSearchText);
      setSearchResult(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getSearchHistory = async () => {
    try {
      const res = await getRecentSearchAPI();
      setSearchHistory(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleKeywordSearch = async (e) => {
    if (e.target.name === 'search' && e.key !== 'Enter') return;
    router.push(`/search/top?q=${searchText}`);
    setSearchText('');
    setSearchResultShow(false);
    ga.event({
      action: 'search',
      category: 'search',
      label: 'keywords',
      value: searchText,
    });
    try {
      const res = await postKeywordSearchAPI(searchText);
      await getSearchHistory();
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSearchHistory();
  }, []);
  useEffect(() => {
    if (isSearchResultShow) {
      searchInputRef.current.focus();
    }
  }, [isSearchResultShow]);

  useEffect(() => {
    if (debouncedSearchText === '') {
      setSearchResult(null);
    } else {
      search();
    }
  }, [debouncedSearchText]);
  return (
    <div className="group ">
      <div className="flex items-center rounded-full bg-button text-primary ">
        <span onClick={() => handleInputFocus()} className="rounded-full  p-2 ">
          <SearchIcon className="h-5" />
        </span>
        <input
          type="text"
          onFocus={() => handleInputFocus()}
          placeholder={t('search')}
          className="outline-none hidden max-w-[160px]  rounded-full bg-button p-3 pl-2 text-sm text-primary lg:block lg:max-w-[200px]"
        />
      </div>
      {isSearchResultShow && (
        <div className="fixed top-0 left-0 z-50 h-full  w-full rounded-md bg-secondary p-3 text-secondary shadow-xl sm:h-auto sm:max-w-[350px]">
          <div className="flex w-full items-center sm:pl-3">
            <span
              onClick={() => setSearchResultShow(false)}
              className="cursor-pointer rounded-full bg-button p-3 text-primary"
            >
              <ChevronLeftIcon className="h-6 " />
            </span>
            <div className="ml-[20px] flex flex-1 items-center rounded-full bg-button pl-2 text-primary">
              <SearchIcon className="ml-[10px] h-5" />
              <input
                type="text"
                value={searchText}
                ref={searchInputRef}
                name="search"
                onKeyDown={(e) => handleKeywordSearch(e)}
                onChange={(e) => setSearchText(e.target.value)}
                placeholder="Search"
                className="outline-none w-full rounded-full bg-button p-3 pl-2 text-sm text-primary"
              />
            </div>
          </div>
          <div className=" max-h-[500px] overflow-y-auto py-[10px]">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Recent Search</h2>
              <span className="cursor-pointer rounded-md p-2 text-sm text-main hover:bg-gray-100">
                Edit History
              </span>
            </div>
            {searchResult
              ? searchResult.map((result) => (
                  <SearchListItem
                    setSearchResultShow={setSearchResultShow}
                    gender={result.gender}
                    key={result.username}
                    username={result.username}
                    name={result.name}
                    profileImage={result.profileImage}
                  />
                ))
              : searchHistory.map((history) => (
                  <SearchHistoryItem
                    setSearchResultShow={setSearchResultShow}
                    searchHistory={searchHistory}
                    setSearchHistory={setSearchHistory}
                    key={history._id}
                    history={history}
                  />
                ))}
          </div>
          {searchText !== '' && (
            <div
              onClick={(e) => handleKeywordSearch(e)}
              className="flex cursor-pointer items-center rounded-md p-2 py-1 hover:bg-gray-100"
            >
              <SearchIcon className=" h-[40px] w-[40px] rounded-full bg-main  p-2 text-white" />
              <p className="ml-[15px] font-medium text-main">
                {t('search')} {searchText}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Search;
