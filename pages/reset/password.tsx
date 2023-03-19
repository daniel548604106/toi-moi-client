import React, { useEffect, useState } from 'react';

import Image from 'next/image';
import router from 'next/router';

import { postPasswordResetAPI } from '@/axios/resetRequest';

import catchError from '@/lib/catchError';

const Password = () => {
  const token = router.query.token;
  const [error, setError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [newPasswordSuccess, setNewPasswordSuccess] = useState(false);

  const handleResetPassword = async () => {
    if (!password || !passwordConfirm) return setError('Missing required field');
    if (password !== passwordConfirm)
      return setError("Password and password confirm doesn't match");
    try {
      await postPasswordResetAPI(token, password);
      setNewPasswordSuccess(true);
    } catch (error) {
      console.log(error);
      setError(catchError(error));
    }
  };
  useEffect(() => {
    setError('');
  }, [password, passwordConfirm]);
  return (
    <div className=" fixed top-0 left-0 flex h-screen w-screen flex-col items-center justify-center bg-gray-100 p-3">
      <div className="flex w-full max-w-[450px] flex-col items-center justify-center">
        <Image
          src="/toi&moi-logo.svg"
          className="max-w-[100px] sm:w-[400px]"
          width={400}
          height={120}
          alt="toi-moi-logo"
        />
        <div className="w-full max-w-[600px] space-y-3  rounded-lg border bg-white bg-secondary  p-5 text-center text-secondary shadow-xl">
          <h2 className="mb-3 text-lg font-semibold sm:text-xl">
            {newPasswordSuccess ? 'Changed Successfully' : 'Password Reset'}
          </h2>
          <Image
            src={`/images/password-${newPasswordSuccess ? 'success' : 'reset'}.svg`}
            width={60}
            height={60}
            alt="password-success"
          />

          {!newPasswordSuccess && (
            <>
              <div className={`rounded-lg border p-3 ${error && 'border-red-600'}`}>
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  placeholder="Password"
                  className="focus:outline-none w-full"
                />
              </div>
              <div className={`rounded-lg border p-3 ${error && 'border-red-600'}`}>
                <input
                  value={passwordConfirm}
                  onChange={(e) => setPasswordConfirm(e.target.value)}
                  type="password"
                  placeholder="Confirm Password"
                  className="focus:outline-none w-full"
                />
              </div>
            </>
          )}
          {error && <p className="text-sm text-red-600">{error}</p>}
          {newPasswordSuccess ? (
            <button
              onClick={() => router.push('/')}
              className="focus:outline-none mt-[10px] rounded-lg bg-green-500 p-3 py-2 text-secondary"
            >
              Login
            </button>
          ) : (
            <button
              onClick={() => handleResetPassword()}
              className="focus:outline-none rounded-lg bg-main p-3 text-sm text-white  text-secondary sm:text-lg"
            >
              Reset Password
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Password;
