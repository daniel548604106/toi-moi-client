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
  {
    name: '日本語',
    id: 'ja-JP',
  },
];

const LanguageSettingModal = () => {
  let { t } = useTranslation('common');
  const dispatch = useDispatch();
  const [currentLanguage, setCurrentLanguage] = useState(router.locale);

  return (
    <div className="relative w-full max-w-[400px] rounded-lg bg-secondary p-5 text-secondary">
      <h2 className="mb-3 text-2xl font-semibold">{t('languageSetting')}</h2>
      <span
        onClick={() => dispatch(toggleLanguageOpen())}
        className="absolute top-3 right-3 cursor-pointer rounded-full bg-secondary p-2 text-secondary"
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
        <div className="mt-3 flex items-center justify-end">
          <Link href="/" locale={currentLanguage}>
            <button
              onClick={() => dispatch(toggleLanguageOpen())}
              className=" rounded-lg bg-main p-2 px-4 text-white"
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
