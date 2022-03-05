import Image from 'next/image';
import React, { useState } from 'react';

import { postForgotPasswordAPI } from '@/Axios/resetRequest';
import { InboxIcon } from '@heroicons/react/outline';

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
      className="  bg-white w-full max-w-[400px]  rounded-lg text-center shadow-xl p-5 bg-secondary text-secondary  flex flex-col items-center justify-center "
    >
      <h1 className="text-xl mb-[10px] font-semibold"> Forgot Password</h1>

      <Image src="/images/email.svg" width="60" height="60" />

      {emailSent ? (
        <div className="text-center space-y-1 mt-2">
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
              className="text-xs text-gray-300 cursor-pointer underline"
            >
              Not received? Send again
            </span>
          </div>
        </div>
      ) : (
        <div className="rounded-lg w-full flex items-center  mt-5 p-2 border">
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email"
            className="w-full focus:outline-none"
          />
          <span
            onClick={() => handleSendEmail()}
            className={`p-1 rounded-full ml-[5px] border text-gray-400  ${
              email && 'text-secondary bg-gray-600 cursor-pointer'
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
