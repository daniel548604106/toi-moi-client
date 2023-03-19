import React, { useEffect, useState } from 'react';

import router from 'next/router';

import { postWorkExperienceSummaryAPI } from '@/axios/profileRequest';

import Loader from '@/components/Global/Loader';

import PeriodSelector from './PreriodSelector';

interface WorkExperienceInputBoxProps {
  setActiveBox: (number) => void;
}

const WorkExperienceInputBox = ({ setActiveBox }: WorkExperienceInputBoxProps) => {
  const [available, setAvailable] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [newExperience, setNewExperience] = useState({
    company_name: '',
    job_title: '',
    still_working: true,
    location: '',
    description: '',
    period: {
      start_year: '',
      start_month: '',
      end_year: '',
      end_month: '',
    },
    set_public: true,
  });

  const handleCancel = () => {
    setActiveBox(0);
  };

  const handleInputChange = (e) => {
    setNewExperience({ ...newExperience, [e.target.name]: e.target.value });
    console.log(newExperience);
  };

  const handleSave = async () => {
    if (!available) return;
    try {
      setLoading(true);
      const res = await postWorkExperienceSummaryAPI(router.query.id, newExperience);
      setLoading(false);
      setActiveBox(0);
      console.log('send', res);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    const {
      period: { start_year, start_month, end_year, end_month },
      still_working,
      company_name,
    } = newExperience;

    if (!company_name) return setAvailable(false);
    if (!start_year || !start_month) return setAvailable(false);
    if (!still_working && (!end_year || !end_month)) return setAvailable(false);
    setAvailable(true);
  }, [newExperience]);

  return (
    <div className="">
      <form className="space-y-2 ">
        <input
          className="w-full rounded-md border p-3 "
          type="text"
          name="company_name"
          onChange={(e) => handleInputChange(e)}
          placeholder="* Company"
        />
        <input
          className="w-full rounded-md border p-3 "
          type="text"
          name="job_title"
          onChange={(e) => handleInputChange(e)}
          placeholder="Job Title"
        />
        <input
          className="w-full rounded-md border p-3 "
          type="text"
          name="location"
          onChange={(e) => handleInputChange(e)}
          placeholder="City"
        />
        <input
          className="min-h-[100px] w-full rounded-md border p-3 "
          type="text"
          name="description"
          onChange={(e) => handleInputChange(e)}
          placeholder="Description"
        />
      </form>
      <PeriodSelector
        status="working"
        setNewExperience={setNewExperience}
        newExperience={newExperience}
      />
      <div className="my-5 flex items-center">
        <button
          onClick={() => handleSave()}
          className={`flex   w-full items-center justify-center rounded-md p-2 ${
            available
              ? 'cursor-pointer bg-main text-white'
              : 'cursor-not-allowed bg-gray-100 text-secondary'
          }`}
        >
          {isLoading ? <Loader /> : 'Save'}
        </button>
        <button
          onClick={() => handleCancel()}
          className="ml-[10px] flex w-[200px] items-center justify-center rounded-md border p-2"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default WorkExperienceInputBox;
