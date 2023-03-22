import router from 'next/router';
import React from 'react';

interface FilterListRowProps {
  filterList: any;
}

const FilterListRow = ({ filterList }: FilterListRowProps) => {
  return (
    <div className="flex items-center overflow-x-auto border bg-secondary px-3 text-secondary">
      {filterList.map((list) => (
        <span
          key={list}
          onClick={() => router.push(`/search/${list.param}?q=${router.query.q}`)}
          className={`p-2 px-4 text-sm ${
            router.query.type === list.param && 'cursor-pointer border-b border-main text-main'
          }`}
        >
          {list.title}
        </span>
      ))}
    </div>
  );
};

export default FilterListRow;
