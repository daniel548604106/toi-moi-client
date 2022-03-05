import router from 'next/router';
import React from 'react';

import { useAppDispatch, useAppSelector } from '@/Hooks/useAppRedux';
import { setSummaryModalShow } from '@/Redux/slices/profileSlice';
import { AcademicCapIcon, BriefcaseIcon } from '@heroicons/react/outline';

import CardLayout from './CardLayout';

const Summary = ({ summary }) => {
  const dispatch = useAppDispatch();
  const { userInfo } = useAppSelector((state) => state.user);

  return (
    <CardLayout title="Summary">
      <div className="space-y-2">
        {summary?.work_experience?.map((experience) => (
          <p key={experience._id} className="flex items-center space-x-2">
            <BriefcaseIcon className="h-6 mr-2" />在{' '}
            <span className="font-semibold text-sm sm:text-md">{experience.company_name}</span>
            <span>擔任</span>
            <span className="font-semibold text-sm sm:text-md">{experience.job_title}</span>
          </p>
        ))}
        {summary?.education?.map((experience) => (
          <p key={experience._id} className="flex flex-wrap items-center space-x-2">
            <AcademicCapIcon className="h-6 mr-2" />在{' '}
            <span className="font-semibold text-sm sm:text-md">{experience.school_name}</span>
            <span>主修</span>
            <span className="font-semibold text-sm sm:text-md">{experience.major}</span>
          </p>
        ))}
        {router.query.id === userInfo.username && (
          <button
            onClick={() => dispatch(setSummaryModalShow(true))}
            className="hover:bg-opacity-50 p-2 rounded-md bg-button w-full"
          >
            編輯詳細資料
          </button>
        )}
      </div>
    </CardLayout>
  );
};

export default Summary;
