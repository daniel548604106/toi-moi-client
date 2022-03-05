import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUserLogin } from '@/Redux/slices/userSlice';
import { useRouter } from 'next/router';
import catchError from '@/Lib/catchError';
import Cookie from 'js-cookie';
import Signup from '../Signup/Index';
import { XIcon, ClipboardIcon } from '@heroicons/react/outline';
import Image from 'next/image';
import ForgotPassword from '../ForgotPassword/Index';
import Loader from '../Global/Loader';
import { postLoginAPI } from '@/Axios/authRequest';

const Login = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const [error, setError] = useState('');
  const [isSignupOpen, setSignupOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [isForgotPasswordOpen, setForgotPasswordOpen] = useState(false);
  const [loginInput, setLoginInput] = useState({
    email: 'interviewer@gmail.com',
    password: 'dearinterviewer',
  });
  const handleLoginInput = (e) => {
    setError('');
    const { name, value } = e.target;
    setLoginInput({ ...loginInput, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (loginInput.account === '' || loginInput.password === '')
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
      setLoading(false);
      setError(errMsg);
    }
  };
  useEffect(() => {
    const userEmail = Cookie.get('userEmail');
    if (userEmail) {
      setLoginInput({ ...loginInput, email: userEmail });
    }
    setShowNotifications(true);
  }, []);
  return (
    <div className="w-full flex-col justify-center md:flex-row max-w-5xl mx-auto h-screen flex  items-center md:justify-between px-5">
      {isSignupOpen && (
        <div
          onClick={() => setSignupOpen(false)}
          className="fixed top-0 z-50 left-0 flex w-screen h-screen items-center justify-center bg-opacity-20 bg-black"
        >
          <Signup setSignupOpen={setSignupOpen} />
        </div>
      )}
      {isForgotPasswordOpen && (
        <div
          onClick={() => setForgotPasswordOpen(false)}
          className="fixed top-0 z-50 left-0 flex w-screen h-screen items-center justify-center bg-opacity-20 bg-black"
        >
          <ForgotPassword />
        </div>
      )}
      {/* <div className="fixed z-50 bottom-3 right-2  border p-3 pr-5 rounded-lg bg-white">
        <XIcon className="absolute top-2 right-2 h-6" />
        <p className="text-sm sm:text-md font-semibold">
          💫 If you're an interviewer, please use the following credentials for
          login.
        </p>
        <Image
          className="absolute right-0 bottom-2"
          src="/logo.svg"
          width={60}
          height={60}
        />
        <div className="mt-2 ">
          <p className="text-sm sm:text-md">Account :</p>
          <p className="flex items-center text-gray-600 text-sm sm:text-md">
            <ClipboardIcon className="h-4 mr-2" />
            <span>interviewer@gmail.com</span>{' '}
          </p>
        </div>
        <div className="mt-2 ">
          <p className="text-sm sm:text-md">Password :</p>{' '}
          <p className="flex items-center text-gray-600 text-sm sm:text-md">
            <ClipboardIcon className="h-4 mr-2" /> <span> dearinterviewer</span>
          </p>
        </div>
      </div> */}

      <div className="w-full max-w-md mb-[20px] md:mb-0">
        <img
          className="w-[300px] mx-auto sm:mx-0 h-[100px] sm:w-[400px] sm:h-[200px]"
          src="/toi&moi-logo.svg"
          alt="logo"
        />
        <h2 className="text-md sm:text-2xl  font-semibold">
          Connect with friends and the world around you on Toi&Moi.
        </h2>
      </div>

      <div className="relative p-3 sm:p-5 bg-white rounded-md text-center bg-secondary text-black shadow-md w-full max-w-[450px]">
        <div className={`${showNotifications && ' hiInterviewerBg'} `}>
          <div className="dialogue absolute  bg-white border p-2 rounded-lg">
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
              className="w-full text-md text-black  block mt-2 p-3 sm:text-lg rounded-md border"
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
              className="block  text-md w-full text-black mt-2 p-3 sm:text-lg rounded-md border"
              id="password"
              type="password"
              value={loginInput.password}
              placeholder="Password"
            />
          </div>
          {error !== '' && (
            <div className="text-sm sm:text-md text-red-500 my-3 relative ">{error}</div>
          )}
          <button
            onClick={(e) => handleLogin(e)}
            className="rounded-md focus:outline-none outline-none flex items-center justify-center w-full text-md sm:text-lg p-2 sm:p-3 text-white bg-main text-secondary"
          >
            {loading ? <Loader /> : 'Login'}
          </button>
        </form>
        <span
          onClick={() => setForgotPasswordOpen(true)}
          className="text-sm sm:text-md inline-block text-main my-[20px] cursor-pointer text-md"
        >
          Forgot Password?
        </span>
        <hr />
        <button
          onClick={() => setSignupOpen(true)}
          className="text-white  text-md sm:text-lg p-3 bg-main-yellow cursor-pointer my-3 sm:my-4 text-secondary rounded-md"
        >
          Create Account
        </button>
      </div>
    </div>
  );
};

export default Login;
