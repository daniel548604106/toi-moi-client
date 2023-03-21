import { useRef, useState } from 'react';

import { GlobeIcon } from '@heroicons/react/outline';
import { LogoutIcon, MoonIcon, SunIcon } from '@heroicons/react/solid';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

import { useAppDispatch, useAppSelector } from '@/hooks/useAppRedux';
import useDarkMode from '@/hooks/useDarkMode';

import Avatar from '@/components/global/Avatar';
import LanguageSettingModal from '@/components/global/LanguageSettingModal';
import { toggleLanguageOpen } from '@/redux/slices/globalSlice';
import { setUserLogout } from '@/redux/slices/userSlice';

const AccountPopup = ({ t }) => {
  const [isDark, setIsDark] = useDarkMode();
  const dispatch = useAppDispatch();
  const { isLanguageOpen } = useAppSelector((state) => state.global);
  const { userInfo } = useAppSelector((state) => state.user);
  const { email } = userInfo;
  const [darkModeChecked, setDarkModeChecked] = useState(false);
  const inputRef = useRef(null);
  const router = useRouter();

  const handleUserLogout = (email) => {
    // Set userEmail for autocomplete in login email field
    Cookies.set('userEmail', email);
    Cookies.remove('token');
    dispatch(setUserLogout());
    router.push('/');
  };

  return (
    <div className="ml-0 text-primary">
      <div
        onClick={() => router.push(`/${userInfo.username}`)}
        className="hidden cursor-pointer items-center rounded-md p-3 hover:bg-gray-100 sm:flex "
      >
        <Avatar
          width={60}
          height={60}
          username={userInfo.username}
          profileImage={userInfo.profileImage}
          gender={userInfo.gender}
        />
        <div className="ml-[10px] text-left">
          <span className="font-semibold">{userInfo.name}</span>
          <p className="text-xs ">{t('checkOutYourProfile')}</p>
        </div>
      </div>
      <hr className="my-[10px]" />

      <div
        onClick={() => dispatch(toggleLanguageOpen())}
        className="flex cursor-pointer items-center justify-between rounded-md p-2 hover:bg-gray-100"
      >
        <div className="flex items-center">
          <span className="rounded-full bg-gray-100 p-2">
            <GlobeIcon className="h-6 text-black" />
          </span>
          <span className="ml-[10px]">{t('language')}</span>
        </div>
      </div>
      {isLanguageOpen && <LanguageSettingModal />}

      <div className="flex items-center justify-between  p-2">
        <div className="flex items-center ">
          {darkModeChecked ? (
            <span className="rounded-full bg-gray-100 p-2">
              <MoonIcon className="h-6 text-black" />
            </span>
          ) : (
            <span className="rounded-full bg-gray-100 p-2">
              <SunIcon className="h-6 text-black" />
            </span>
          )}
          <span className="sm:text-md ml-[10px] text-sm">
            {isDark ? t('darkMode') : t('lightMode')}
          </span>
        </div>
        <div>
          <span
            onClick={() => inputRef.current.click()}
            className={`flex h-[40px] w-[70px]  items-center  rounded-full p-2 ${
              darkModeChecked ? 'bg-gray-700' : 'border bg-white'
            }`}
          >
            <span
              className={` h-[25px] w-[25px] transform rounded-full bg-white transition-all duration-200 ease-in-out
             ${darkModeChecked ? ' translate-x-full bg-white' : 'bg-gray-700'}
          `}
            ></span>
          </span>
          <input
            type="checkbox"
            hidden
            ref={inputRef}
            defaultChecked={darkModeChecked}
            onClick={() => {
              setIsDark(!isDark);
              setDarkModeChecked(!darkModeChecked);
            }}
          />
        </div>
      </div>
      <div
        onClick={() => handleUserLogout(email)}
        className="mb-32 flex cursor-pointer items-center rounded-md p-2 hover:bg-gray-100 sm:mb-0"
      >
        <span className="rounded-full bg-gray-100 p-2">
          <LogoutIcon className="h-6 text-black" />
        </span>
        <span className="sm:text-md ml-[10px] text-sm">{t('logOut')}</span>
      </div>
    </div>
  );
};

export default AccountPopup;
