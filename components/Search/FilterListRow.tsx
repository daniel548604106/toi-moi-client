import router from 'next/router';
import React from 'react';

interface FilterListRowProps {
  filterList: any;
}

const FilterListRow = ({ filterList }: FilterListRowProps) => {
  return (
    <div className="flex items-center overflow-x-auto bg-secondary text-secondary border px-3">
      {filterList.map((list) => (
        <span
          key={list}
          onClick={() => router.push(`/search/${list.param}?q=${router.query.q}`)}
          className={`p-2 px-4 text-sm ${
            router.query.type === list.param && 'border-b border-main text-main cursor-pointer'
          }`}
        >
          {list.title}
        </span>
      ))}
    </div>
  );
};

export default FilterListRow;
