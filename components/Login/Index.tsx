import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import Cookie from 'js-cookie';
import useTranslation from 'next-translate/useTranslation';
import Image from 'next/image';
import { useRouter } from 'next/router';

import { postLoginAPI } from '@/axios/authRequest';

import Loader from '@/components/Global/loader/LoaderBounce';
import ForgotPassword from '@/components/login/ForgotPassword';
import Signup from '@/components/login/Signup';
import catchError from '@/lib/catchError';
import { setUserLogin } from '@/redux/slices/userSlice';

const Login = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { t } = useTranslation('login');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isSignupOpen, setSignupOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [isForgotPasswordOpen, setForgotPasswordOpen] = useState(false);
  const [loginInput, setLoginInput] = useState({
    email: 'interviewer@gmail.com',
    password: 'dearinterviewer',
  });

  const handleLoginInput = (e) => {
    const { name, value } = e.target;
    setError('');
    setLoginInput({ ...loginInput, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (loginInput.email === '' || loginInput.password === '')
      return setError('Email and password required!');
    try {
      setLoading(true);
      const { data } = await postLoginAPI(loginInput);
      Cookie.set('token', data.token);
      dispatch(setUserLogin(data.user));
      setLoading(false);
      router.push('/');
    } catch (error) {
      const errMsg = catchError(error);
      setError(errMsg);
    } finally {
      setLoading(false);
    }
  };

  // useEffect(() => {
  //   const userEmail = Cookie.get('userEmail');
  //   if (userEmail) {
  //     setLoginInput({ ...loginInput, email: userEmail });
  //   }
  //   setShowNotifications(true);
  // }, [loginInput]);

  return (
    <div className="mx-auto flex h-screen w-full max-w-5xl flex-col items-center justify-center  px-5 md:flex-row md:justify-between">
      {isSignupOpen && (
        <div
          onClick={() => setSignupOpen(false)}
          className="fixed top-0 left-0 z-50 flex h-screen w-screen items-center justify-center bg-black bg-opacity-20"
        >
          <Signup setSignupOpen={setSignupOpen} />
        </div>
      )}
      {isForgotPasswordOpen && (
        <div
          onClick={() => setForgotPasswordOpen(false)}
          className="fixed top-0 left-0 z-50 flex h-screen w-screen items-center justify-center bg-black bg-opacity-20"
        >
          <ForgotPassword />
        </div>
      )}
      <div className="mb-[20px] w-full max-w-md md:mb-0">
        <Image
          width="300"
          height="200"
          className="mx-auto h-[100px] w-[300px] sm:mx-0 sm:h-[200px] sm:w-[400px]"
          src="/toi&moi-logo.svg"
          alt="logo"
        />
        <h2 className="text-md font-semibold  sm:text-2xl">
          Connect with friends and the world around you on Toi&Moi.
        </h2>
      </div>

      <div className="relative w-full max-w-[450px] rounded-md bg-white bg-secondary p-3 text-center text-black shadow-md sm:p-5">
        <div className={`${showNotifications && ' hiInterviewerBg'} `}>
          <div className="dialogue absolute  rounded-lg border bg-white p-2">
            <span className="ball"></span>
            <p className="whitespace-nowrap">
              <span className="shakeHand">👋</span> <span className="ml-[5px]">Hi there!</span>
            </p>
          </div>
        </div>
        <form className="w-full space-y-2 sm:space-y-3">
          <div className="">
            <input
              name="email"
              onChange={(e) => handleLoginInput(e)}
              className="text-md mt-2 block  w-full rounded-md border p-3 text-black sm:text-lg"
              id="account"
              value={loginInput.email}
              type="email"
              placeholder="Email"
            />
          </div>
          <div className="">
            <input
              name="password"
              onChange={(e) => handleLoginInput(e)}
              className="text-md  mt-2 block w-full rounded-md border p-3 text-black sm:text-lg"
              id="password"
              type="password"
              value={loginInput.password}
              placeholder="Password"
            />
          </div>
          {error !== '' && (
            <div className="sm:text-md relative my-3 text-sm text-red-500 ">{error}</div>
          )}
          <button
            onClick={(e) => handleLogin(e)}
            className="focus:outline-none outline-none text-md flex w-full items-center justify-center rounded-md bg-main p-2 text-white text-secondary sm:p-3 sm:text-lg"
          >
            {loading ? <Loader /> : 'Login'}
          </button>
        </form>
        <span
          onClick={() => setForgotPasswordOpen(true)}
          className="sm:text-md text-md my-[20px] inline-block cursor-pointer text-sm text-main"
        >
          {t('forget-password')}?
        </span>
        <hr />
        <button
          onClick={() => setSignupOpen(true)}
          className="text-md  my-3 cursor-pointer rounded-md bg-main-yellow p-3 text-white text-secondary sm:my-4 sm:text-lg"
        >
          {t('create-account')}
        </button>
      </div>
    </div>
  );
};

export default Login;
