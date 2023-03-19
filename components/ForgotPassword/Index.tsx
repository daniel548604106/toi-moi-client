import React, { useState } from 'react';

import { InboxIcon } from '@heroicons/react/outline';
import Image from 'next/image';

import { postForgotPasswordAPI } from '@/axios/resetRequest';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [emailSent, setEmailSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleSendEmail = async () => {
    if (!email) return;
    // Send again
    if (emailSent) setLoading(true);
    try {
      const res = await postForgotPasswordAPI(email);
      console.log(res);
      setEmailSent(true);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="  flex w-full max-w-[400px]  flex-col items-center justify-center rounded-lg bg-white bg-secondary  p-5 text-center text-secondary shadow-xl "
    >
      <h1 className="mb-[10px] text-xl font-semibold"> Forgot Password</h1>

      <Image src="/images/email.svg" width="60" height="60" alt="email" />

      {emailSent ? (
        <div className="mt-2 space-y-1 text-center">
          <span className="text-sm text-gray-400">
            {loading ? (
              'Sending...'
            ) : (
              <span>
                Email has been sent!
                <br />
                Please check your email account
              </span>
            )}
          </span>

          <div className="flex items-center justify-center">
            <span
              onClick={() => handleSendEmail()}
              className="cursor-pointer text-xs text-gray-300 underline"
            >
              Not received? Send again
            </span>
          </div>
        </div>
      ) : (
        <div className="mt-5 flex w-full items-center  rounded-lg border p-2">
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email"
            className="focus:outline-none w-full"
          />
          <span
            onClick={() => handleSendEmail()}
            className={`ml-[5px] rounded-full border p-1 text-gray-400  ${
              email && 'cursor-pointer bg-gray-600 text-secondary'
            }`}
          >
            <InboxIcon className="h-6" />
          </span>
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;
