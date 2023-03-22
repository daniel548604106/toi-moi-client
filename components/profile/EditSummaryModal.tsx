import React, { useState } from 'react';

import { AcademicCapIcon, BriefcaseIcon } from '@heroicons/react/outline';
import { XIcon } from '@heroicons/react/solid';

import { useAppDispatch, useAppSelector } from '@/hooks/useAppRedux';

import { setSummaryModalShow } from '@/redux/slices/profileSlice';

import AddNewButton from './EditSummary/AddNewButton';
import CurrentCityInputBox from './EditSummary/CurrentCityInputBox';
import EducationInputBox from './EditSummary/EducationInputBox';
import HomeTownInputBox from './EditSummary/HomeTownInputBox';
import RelationshipStatusInputBox from './EditSummary/RelationshipStatusInputBox';
import SummaryListItem from './EditSummary/SummaryListItem';
import WorkExperienceInputBox from './EditSummary/WorkExperienceInputBox';

const EditSummaryModal = () => {
  const dispatch = useAppDispatch();
  const { summaryData } = useAppSelector((state) => state.profile);

  const [activeBox, setActiveBox] = useState(0);

  const handleSetActive = (idx) => {
    setActiveBox(idx);
  };

  return (
    <div className=" relative flex h-full max-h-screen w-full max-w-[600px]  flex-col rounded-md bg-secondary  text-secondary sm:max-h-[70vh]">
      <div className="flex items-center justify-center border-b p-3">
        <h2 className="text-xl font-semibold">Edit Summary</h2>
      </div>
      <span
        onClick={() => dispatch(setSummaryModalShow(false))}
        className="absolute top-[8px] right-[8px] cursor-pointer rounded-full bg-gray-100 p-2"
      >
        <XIcon className="h-4" />
      </span>
      <div className="flex-1 overflow-y-auto p-5">
        <div>
          <p className="text-sm text-gray-600">
            Your info will be set public, and will not be sent to your feed.
          </p>
        </div>
        <div className="my-2">
          <h2 className="my-1 space-y-2 text-xl font-semibold">Work Experience</h2>

          {activeBox === 1 ? (
            <WorkExperienceInputBox setActiveBox={setActiveBox} />
          ) : (
            <div>
              {summaryData.work_experience.map(({ _id, job_title, company_name }) => (
                <SummaryListItem
                  key={_id}
                  Icon={BriefcaseIcon}
                  job_title={job_title}
                  company_name={company_name}
                />
              ))}
              <div onClick={() => handleSetActive(1)}>
                <AddNewButton title="Add New Work Location" />
              </div>
            </div>
          )}
        </div>
        <div className="my-2">
          <h2 className="my-1 text-xl font-semibold">Education</h2>
          {activeBox === 2 ? (
            <EducationInputBox setActiveBox={setActiveBox} />
          ) : (
            <div>
              {summaryData.education.map(({ _id, school_name, major }) => (
                <SummaryListItem
                  key={_id}
                  Icon={AcademicCapIcon}
                  school_name={school_name}
                  major={major}
                />
              ))}
              <div onClick={() => handleSetActive(2)}>
                <AddNewButton title="Add New Education" />
              </div>
            </div>
          )}
        </div>
        <div className="my-2">
          <h2 className="my-1 text-xl font-semibold">Current City</h2>
          {activeBox === 3 ? (
            <CurrentCityInputBox setActiveBox={setActiveBox} />
          ) : (
            <div onClick={() => handleSetActive(3)}>
              <AddNewButton title="Add Current City" />
            </div>
          )}
        </div>
        <div className="my-2">
          <h2 className="my-1 text-xl font-semibold">Hometown</h2>
          {activeBox === 4 ? (
            <HomeTownInputBox />
          ) : (
            <div onClick={() => handleSetActive(4)}>
              <AddNewButton title="Add Hometown" />
            </div>
          )}
        </div>
        <div className="my-2">
          <h2 className="my-1 text-xl font-semibold">Relationship</h2>
          {activeBox === 5 ? (
            <RelationshipStatusInputBox />
          ) : (
            <div onClick={() => handleSetActive(5)}>
              <AddNewButton title="Add New Relationship status" />
            </div>
          )}
        </div>
      </div>
      <div className="flex items-center justify-end border-t p-3">
        <div>
          <button
            onClick={() => dispatch(setSummaryModalShow(false))}
            className="rounded-md p-2 text-sm"
          >
            Cancel
          </button>
          <button className="ml-[10px] w-[100px] rounded-md bg-main p-2 text-sm text-secondary">
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditSummaryModal;
