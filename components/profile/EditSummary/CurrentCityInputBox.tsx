import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';

interface CurrentCityInputBoxProps {
  setActiveBox: Dispatch<SetStateAction<number>>;
}

const CurrentCityInputBox = ({ setActiveBox }: CurrentCityInputBoxProps) => {
  const [available, setAvailable] = useState(false);
  const [currentCity, setCurrentCity] = useState('');
  const handleSubmit = async () => {
    try {
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (currentCity) {
      setAvailable(true);
    } else {
      setAvailable(false);
    }
  }, [currentCity]);
  return (
    <div className="space-y-3">
      <input
        className="w-full rounded-lg border p-3"
        placeholder="Current City"
        type="text"
        onChange={(e) => setCurrentCity(e.target.value)}
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

export default CurrentCityInputBox;
