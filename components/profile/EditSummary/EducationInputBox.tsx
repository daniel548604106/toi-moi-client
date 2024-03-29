import React, { useEffect, useState } from 'react';

import { useAppSelector } from '@/hooks/useAppRedux';

import { postEducationSummaryAPI } from '@/axios/profileRequest';

import PeriodSelector from './PreriodSelector';

interface EducationInputBoxProps {
  setActiveBox: (boolean) => void;
}

const EducationInputBox = ({ setActiveBox }: EducationInputBoxProps) => {
  const { username } = useAppSelector((state) => state.user.userInfo);
  const [available, setAvailable] = useState(false);
  const [newExperience, setNewExperience] = useState({
    school_name: '',
    degree: 'bachelor',
    major: '',
    minor: '',
    still_studying: true,
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
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewExperience((newExperience) => ({ ...newExperience, [name]: value }));
  };
  const handleSubmit = async () => {
    if (!available) return;
    try {
      const { data } = await postEducationSummaryAPI(username, newExperience);
      console.log(data);
      setActiveBox(0);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const {
      school_name,
      major,
      still_studying,
      period: { start_year, start_month, end_month, end_year },
      ...rest
    } = newExperience;
    if (!school_name || !major) return setAvailable(false);
    if (still_studying && (!start_year || !start_month)) return setAvailable(false);
    if (!still_studying && (!start_year || !start_month || !end_year || !end_month))
      return setAvailable(false);
    setAvailable(true);
  }, [{ ...newExperience }]);
  return (
    <div className="my-2 space-y-2">
      <input
        className="w-full rounded-lg border p-3"
        type="text"
        placeholder="*School"
        name="school_name"
        value={newExperience.school_name}
        onChange={(e) => handleInputChange(e)}
      />
      <input
        className="w-full rounded-lg border p-3"
        type="text"
        placeholder="*Major"
        name="major"
        value={newExperience.major}
        onChange={(e) => handleInputChange(e)}
      />
      <input
        className="w-full rounded-lg border p-3"
        type="text"
        placeholder="Minor"
        name="minor"
        value={newExperience.minor}
        onChange={(e) => handleInputChange(e)}
      />
      <PeriodSelector
        status="studying"
        newExperience={newExperience}
        setNewExperience={setNewExperience}
      />
      <div className="flex items-center justify-end space-x-2">
        <button
          onClick={() => handleSubmit()}
          className={`w-full rounded-lg p-2 px-3 ${
            available
              ? 'bg-main text-white'
              : 'cursor-not-allowed border bg-secondary text-secondary'
          }`}
        >
          Save
        </button>
        <button onClick={() => setActiveBox(0)} className="rounded-lg border p-2 px-3 ">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default EducationInputBox;
