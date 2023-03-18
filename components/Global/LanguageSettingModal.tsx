import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { XIcon } from '@heroicons/react/outline';
import useTranslation from 'next-translate/useTranslation';
import Link from 'next/link';
import router from 'next/router';

import { toggleLanguageOpen } from '@/redux/slices/globalSlice';

const languages = [
  {
    name: 'English',
    id: 'en-US',
  },
  {
    name: '繁體中文',
    id: 'zh-TW',
  },
];

const LanguageSettingModal = () => {
  let { t } = useTranslation('common');
  const dispatch = useDispatch();
  const [currentLanguage, setCurrentLanguage] = useState(router.locale);

  return (
    <div className="relative w-full max-w-[400px] rounded-lg p-5 bg-secondary text-secondary">
      <h2 className="text-2xl font-semibold mb-3">{t('languageSetting')}</h2>
      <span
        onClick={() => dispatch(toggleLanguageOpen())}
        className="cursor-pointer absolute top-3 right-3 rounded-full p-2 bg-secondary text-secondary"
      >
        <XIcon className="h-6" />
      </span>
      <form className="space-y-2">
        {languages.map(({ id, name }) => (
          <div key={id} className="flex items-center justify-between text-lg">
            <label htmlFor={name}>{name}</label>
            <input
              onChange={(e) => setCurrentLanguage(e.target.value)}
              type="radio"
              value={id}
              name="language"
              id={id}
              checked={currentLanguage === id}
            />
          </div>
        ))}
        <div className="flex items-center justify-end mt-3">
          <Link href="/" locale={currentLanguage}>
            <button
              onClick={() => dispatch(toggleLanguageOpen())}
              className=" rounded-lg px-4 p-2 bg-main text-white"
            >
              Save
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LanguageSettingModal;
