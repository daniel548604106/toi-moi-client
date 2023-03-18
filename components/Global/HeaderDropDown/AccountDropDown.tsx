import { useRef, useState } from 'react';

import { GlobeIcon } from '@heroicons/react/outline';
import { LogoutIcon, MoonIcon, SunIcon } from '@heroicons/react/solid';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

import { useAppDispatch, useAppSelector } from '@/hooks/useAppRedux';
import useDarkMode from '@/hooks/useDarkMode';

import Avatar from '@/components/Global/Avatar';
import { toggleLanguageOpen } from '@/redux/slices/globalSlice';
import { setUserLogout } from '@/redux/slices/userSlice';

const AccountPopup = ({ t }) => {
  const [isDark, setIsDark] = useDarkMode();
  const dispatch = useAppDispatch();
  const userInfo = useAppSelector((state) => state.user.userInfo);
  const email = useAppSelector((state) => state.user.userInfo.email);
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
    <div className="text-primary ml-0">
      <div
        onClick={() => router.push(`/${userInfo.username}`)}
        className="hidden sm:flex cursor-pointer items-center rounded-md hover:bg-gray-100 p-3 "
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
        className="cursor-pointer flex justify-between items-center hover:bg-gray-100 rounded-md p-2"
      >
        <div className="flex items-center">
          <span className="p-2 rounded-full bg-gray-100">
            <GlobeIcon className="h-6 text-black" />
          </span>
          <span className="ml-[10px]">{t('language')}</span>
        </div>
      </div>
      <div className="flex items-center justify-between  p-2">
        <div className="flex items-center ">
          {darkModeChecked ? (
            <span className="p-2 rounded-full bg-gray-100">
              <MoonIcon className="h-6 text-black" />
            </span>
          ) : (
            <span className="p-2 rounded-full bg-gray-100">
              <SunIcon className="h-6 text-black" />
            </span>
          )}
          <span className="text-sm sm:text-md ml-[10px]">
            {isDark ? t('darkMode') : t('lightMode')}
          </span>
        </div>
        <div>
          <span
            onClick={() => inputRef.current.click()}
            className={`rounded-full w-[70px] h-[40px]  p-2  flex items-center ${
              darkModeChecked ? 'bg-gray-700' : 'bg-white border'
            }`}
          >
            <span
              className={` rounded-full transition-all transform duration-200 ease-in-out bg-white w-[25px] h-[25px]
             ${darkModeChecked ? ' bg-white translate-x-full' : 'bg-gray-700'}
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
        className="mb-32 sm:mb-0 cursor-pointer flex items-center hover:bg-gray-100 rounded-md p-2"
      >
        <span className="p-2 rounded-full bg-gray-100">
          <LogoutIcon className="h-6 text-black" />
        </span>
        <span className="text-sm sm:text-md ml-[10px]">{t('logOut')}</span>
      </div>
    </div>
  );
};

export default AccountPopup;
