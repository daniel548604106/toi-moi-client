import React, { useEffect, useState } from 'react';

import { patchProfileBioAPI } from '@/axios/profileRequest';
import { useAppSelector } from '@/hooks/useAppRedux';

interface BioInputProps {
  isEditable: boolean;
  bio: string;
  originalBio: string;
  setBio: (string) => void;
}

const BioInput = (props: BioInputProps) => {
  const { isEditable, bio, originalBio, setBio } = props;
  const [bioInputOpen, setBioInputOpen] = useState(false);
  const [bioLengthLeft, setBioLengthLeft] = useState(80);
  const { username } = useAppSelector((state) => state.user.userInfo);

  const [disable, setDisable] = useState(false);

  const handleSendBio = async () => {
    if (disable) return;
    setBioInputOpen(false);
    try {
      const { data } = await patchProfileBioAPI({ username, bio });
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancelChanges = () => {
    setBioInputOpen(false);
    setBio(originalBio);
  };

  useEffect(() => {
    if (bio && bio !== '') {
      setBioLengthLeft(80 - bio.length);
    }
    if (bioLengthLeft < 0) {
      setDisable(true);
    } else {
      setDisable(false);
    }
  }, [bio, bioLengthLeft]);
  return (
    <div>
      {bioInputOpen ? (
        <div>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="focus:outline-none h-[120px] w-[300px] overflow-y-scroll rounded-xl  bg-gray-100 p-2"
          />
          <div className="flex items-center justify-between">
            <span className="tex-gray-400 text-xs">{bioLengthLeft} text left </span>
            <div className="flex items-center ">
              <button
                onClick={() => handleCancelChanges()}
                className="rounded-md border bg-secondary px-4 py-2 text-xs text-secondary"
              >
                Cancel
              </button>
              <button
                onClick={() => handleSendBio()}
                className={`${
                  disable && 'cursor-not-allowed bg-gray-200'
                } ml-[10px] rounded-md border bg-main px-4 py-2 text-xs text-white `}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex w-[300px] flex-col items-center justify-center">
          <span>{bio}</span>
          {isEditable && (
            <span onClick={() => setBioInputOpen(true)} className="cursor-pointer text-main">
              Edit
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default BioInput;
