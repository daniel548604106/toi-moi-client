import React, { useEffect, useState } from 'react';

import { ChevronDownIcon } from '@heroicons/react/solid';
import range from 'lodash/range';

const yearRange = range(2021, 1960);
const monthRange = range(1, 12);

interface PeriodSelectorProps {
  newExperience: any;
  setNewExperience: (any) => void;
  status: string;
}
const PeriodSelector = (props: PeriodSelectorProps) => {
  const { newExperience, setNewExperience, status } = props;
  const [checked, setChecked] = useState(true);

  // Start
  const [startYear, setStartYear] = useState(0);
  const [endYear, setEndYear] = useState(0);

  // End
  const [startMonth, setStartMonth] = useState(0);
  const [endMonth, setEndMonth] = useState(0);

  useEffect(() => {
    setNewExperience({ ...newExperience, [`still_${status}`]: checked });
  }, [checked]);

  useEffect(() => {
    setNewExperience({
      ...newExperience,
      period: {
        start_year: startYear,
        end_year: endYear,
        start_month: startMonth,
        end_month: endMonth,
      },
    });
  }, [startYear, endYear, startMonth, endMonth, newExperience, setNewExperience]);

  return (
    <div>
      <div className="my-2 flex items-center justify-between">
        <p className="text-lg font-semibold ">Period</p>
        <div className="flex items-center">
          <input
            type="checkbox"
            onChange={() => setChecked(!checked)}
            checked={checked}
            className="h-[20px] w-[20px]"
          />
          <p className="ml-[10px] text-sm font-semibold">Currently {status} here</p>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <span>From</span>
        <div className="flex items-center">
          <button className="group relative flex w-[100px] items-center justify-center rounded-md border p-2 px-4 text-sm text-gray-600 ">
            {startYear ? startYear : 'Year'}
            <ChevronDownIcon className="h-6" />
            <div className="absolute right-0 bottom-0  hidden h-[150px] w-[100px] translate-y-full transform overflow-y-auto rounded-md border bg-secondary text-secondary focus:hidden group-focus:block">
              {yearRange.map((year) => (
                <p
                  onClick={() => setStartYear(year)}
                  className="text-md py-1 hover:bg-gray-100"
                  key={year}
                >
                  {year}
                </p>
              ))}
            </div>
          </button>
          <button className="group relative ml-[10px]  flex w-[100px] items-center justify-center rounded-md border p-2 px-4 text-sm text-gray-600 ">
            {startMonth ? startMonth : 'Month'}
            <ChevronDownIcon className="h-6" />
            <div className="absolute right-0 bottom-0 hidden h-[150px] w-[100px] translate-y-full transform overflow-y-auto rounded-md border bg-secondary text-secondary group-focus:block">
              {monthRange.map((month) => (
                <p
                  onClick={() => setStartMonth(month)}
                  className="text-md py-1 hover:bg-gray-100"
                  key={month}
                >
                  {month}
                </p>
              ))}
            </div>
          </button>
        </div>
        {!checked && (
          <>
            <span>Until</span>
            <div className="flex items-center">
              <button className="focus:outline-none  group relative flex w-[100px] items-center justify-center rounded-md border p-2 px-4 text-sm text-gray-600 ">
                {endYear ? endYear : 'Year'}
                <ChevronDownIcon className="h-6" />
                <div className="absolute  right-0 bottom-0 hidden h-[150px] w-[100px] translate-y-full transform overflow-y-auto rounded-md border bg-secondary text-secondary group-focus:block">
                  {yearRange.map((year) => (
                    <p
                      onClick={() => setEndYear(year)}
                      className="text-md py-1 hover:bg-gray-100"
                      key={year}
                    >
                      {year}
                    </p>
                  ))}
                </div>
              </button>
              <button className="focus:outline-none group relative ml-[10px]  flex w-[100px] items-center justify-center rounded-md border p-2 px-4 text-sm text-gray-600 ">
                {endMonth ? endMonth : 'Month'}
                <ChevronDownIcon className="h-6" />
                <div className="absolute right-0 bottom-0 hidden h-[150px] w-[100px] translate-y-full transform overflow-y-auto rounded-md border bg-secondary text-secondary group-focus:block">
                  {monthRange.map((month) => (
                    <p
                      onClick={() => setEndMonth(month)}
                      className="text-md py-1 hover:bg-gray-100"
                      key={month}
                    >
                      {month}
                    </p>
                  ))}
                </div>
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PeriodSelector;
