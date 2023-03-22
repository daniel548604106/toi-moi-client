import React from 'react';

import { AcademicCapIcon, BriefcaseIcon } from '@heroicons/react/outline';
import router from 'next/router';

import { useAppDispatch, useAppSelector } from '@/hooks/useAppRedux';

import { setSummaryModalShow } from '@/redux/slices/profileSlice';

import CardLayout from './CardLayout';

const Summary = ({ summary }) => {
  const dispatch = useAppDispatch();
  const { userInfo } = useAppSelector((state) => state.user);

  return (
    <CardLayout title="Summary">
      <div className="space-y-2">
        {summary?.work_experience?.map((experience) => (
          <p key={experience._id} className="flex items-center space-x-2">
            <BriefcaseIcon className="mr-2 h-6" />在{' '}
            <span className="sm:text-md text-sm font-semibold">{experience.company_name}</span>
            <span>擔任</span>
            <span className="sm:text-md text-sm font-semibold">{experience.job_title}</span>
          </p>
        ))}
        {summary?.education?.map((experience) => (
          <p key={experience._id} className="flex flex-wrap items-center space-x-2">
            <AcademicCapIcon className="mr-2 h-6" />在{' '}
            <span className="sm:text-md text-sm font-semibold">{experience.school_name}</span>
            <span>主修</span>
            <span className="sm:text-md text-sm font-semibold">{experience.major}</span>
          </p>
        ))}
        {router.query.id === userInfo.username && (
          <button
            onClick={() => dispatch(setSummaryModalShow(true))}
            className="w-full rounded-md bg-button p-2 hover:bg-opacity-50"
          >
            編輯詳細資料
          </button>
        )}
      </div>
    </CardLayout>
  );
};

export default Summary;
