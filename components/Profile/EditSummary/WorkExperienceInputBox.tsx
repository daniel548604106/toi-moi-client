import router from 'next/router';
import React, { useEffect, useState } from 'react';

import { postWorkExperienceSummaryAPI } from '@/Axios/profileRequest';
import Loader from '@/Components/Global/Loader';

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
  }, [{ ...newExperience }]);

  return (
    <div className="">
      <form className="space-y-2 ">
        <input
          className="border p-3 w-full rounded-md "
          type="text"
          name="company_name"
          onChange={(e) => handleInputChange(e)}
          placeholder="* Company"
        />
        <input
          className="border p-3 w-full rounded-md "
          type="text"
          name="job_title"
          onChange={(e) => handleInputChange(e)}
          placeholder="Job Title"
        />
        <input
          className="border p-3 w-full rounded-md "
          type="text"
          name="location"
          onChange={(e) => handleInputChange(e)}
          placeholder="City"
        />
        <input
          className="border min-h-[100px] p-3 w-full rounded-md "
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
          className={`rounded-md   p-2 w-full flex items-center justify-center ${
            available
              ? 'bg-main text-white cursor-pointer'
              : 'bg-gray-100 text-secondary cursor-not-allowed'
          }`}
        >
          {isLoading ? <Loader /> : 'Save'}
        </button>
        <button
          onClick={() => handleCancel()}
          className="rounded-md w-[200px] p-2 ml-[10px] border flex items-center justify-center"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default WorkExperienceInputBox;
