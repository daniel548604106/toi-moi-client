import React from 'react';
import { useDispatch } from 'react-redux';

import { BookOpenIcon, PencilAltIcon } from '@heroicons/react/solid';
import { useRouter } from 'next/router';

import { setPostInputBoxOpen } from '@/redux/slices/postSlice';

import CreateListItem from './CreateListItem';

interface CreateDropDownProps {
  t: (text: string) => string;
}

const CreateDropDown = ({ t }: CreateDropDownProps) => {
  const router = useRouter();
  const dispatch = useDispatch();
  return (
    <div>
      <div>
        <h2 className="text-2xl font-semibold">{t('create')}</h2>
      </div>
      <div>
        <div onClick={() => dispatch(setPostInputBoxOpen(true))}>
          <CreateListItem Icon={PencilAltIcon} title={t('post')} description={t('sharePost')} />
        </div>
        <div onClick={() => router.push('/stories/create')}>
          <CreateListItem
            Icon={BookOpenIcon}
            title={t('story')}
            description={t('shareVideoOrWriteSth')}
          />
        </div>
      </div>
    </div>
  );
};

export default CreateDropDown;
