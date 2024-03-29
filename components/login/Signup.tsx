import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';

import { ExclamationCircleIcon, XIcon } from '@heroicons/react/solid';
import { Field, Form, Formik, FormikProps, FormikValues } from 'formik';
import Cookie from 'js-cookie';
import range from 'lodash/range';
import router from 'next/router';
import * as Yup from 'yup';

import { postSignupAPI } from '@/axios/authRequest';

import Loader from '@/components/global/loader/LoaderBounce';
import catchError from '@/lib/catchError';
import { setUserLogin } from '@/redux/slices/userSlice';

const SignupSchema = Yup.object().shape({
  name: Yup.string().min(2, 'Please use your real name').max(50, 'Too Long!').required('Required'),
  account: Yup.string()
    .min(2, 'account must be at least 2 characters')
    .max(50, 'Too Long!')
    .required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .max(20, 'Too Long!')
    .required('Required'),
});
const Index = ({ setSignupOpen }) => {
  const dispatch = useDispatch();
  const formRef = useRef<FormikProps<FormikValues>>(null);

  const [isLoading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [birthdayError, setBirthdayError] = useState('');

  const currentYear = new Date().getFullYear();
  const yearRange = range(currentYear, 1930);
  const monthRange = range(1, 13);
  const dateRange = range(1, 32);

  const handleSignup = async (e) => {
    e.preventDefault();
    const { name, account, email, gender, password, year, month, date } = formRef?.current?.values;

    if (!year || !month || !date) {
      return setBirthdayError('Please fill in your correct birthday');
    }

    const birthday = new Date(year, month - 1, date).toISOString();
    const signupInfo = {
      name,
      username: account,
      email,
      password,
      birthday,
      gender,
    };
    try {
      setLoading(true);
      const { data } = await postSignupAPI(signupInfo);
      Cookie.set('token', data.token);
      dispatch(setUserLogin(data.user));
      setSignupOpen(false);
      router.push('/');
    } catch (error) {
      setErrorMsg(catchError(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="relative h-screen w-screen overflow-y-auto rounded-lg bg-white shadow-lg  sm:h-auto  sm:w-full sm:max-w-[500px]"
    >
      <span
        onClick={() => setSignupOpen(false)}
        className="absolute top-5 right-5 cursor-pointer rounded-full border border-gray-600 p-2 text-gray-600 "
      >
        <XIcon className="h-4  sm:h-6" />
      </span>
      <div className="border-b  p-3 sm:p-5">
        <h1 className="text-xl font-semibold sm:text-3xl">Signup</h1>
        <p className="text-sm text-gray-400">Fast and simple</p>
      </div>

      <div className="p-5">
        <Formik
          innerRef={formRef}
          initialValues={{
            name: '',
            account: '',
            email: '',
            password: '',
            gender: 'male',
            year: '',
            month: '',
            date: '',
          }}
          onSubmit={handleSignup}
          validationSchema={SignupSchema}
        >
          {({ errors, touched, isValid, dirty }) => (
            <Form className="space-y-3">
              {errorMsg && (
                <div className="w-full rounded-md bg-red-600 p-3 text-white">{errorMsg}</div>
              )}
              <div
                className={`flex w-full items-center rounded-md border p-3 ${
                  errors.name && touched.name && 'border-red-600'
                }`}
              >
                <Field placeholder="Name" className="outline-none w-full" name="name" />
                {errors.name && touched.name && (
                  <ExclamationCircleIcon className="h-6 text-red-600" />
                )}
              </div>
              <div className="text-sm text-red-600">
                {/* {errors.name && touched.name ? <div>{errors.name}</div> : null} */}
              </div>
              <div
                className={`flex w-full items-center rounded-md border p-3 ${
                  errors.account && touched.account && 'border-red-600'
                }`}
              >
                <Field placeholder="Account" className="outline-none w-full" name="account" />
                {errors.account && touched.account && (
                  <ExclamationCircleIcon className="h-6 text-red-600" />
                )}
              </div>
              <div className="text-sm text-red-600">
                {/* {errors.account && touched.account ? <div>{errors.account}</div> : null} */}
              </div>
              <div
                className={`flex w-full items-center rounded-md border p-3 ${
                  errors.email && touched.email && 'border-red-600'
                }`}
              >
                <Field
                  placeholder="Email"
                  className="outline-none w-full"
                  name="email"
                  type="email"
                />
                {errors.email && touched.email && (
                  <ExclamationCircleIcon className="h-6 text-red-600" />
                )}
              </div>
              <div className="text-sm text-red-600">
                {/* {errors.email && touched.email ? <div>{errors.email}</div> : null} */}
              </div>
              <div
                className={`flex w-full items-center rounded-md border p-3 ${
                  errors.password && touched.password && 'border-red-600'
                }`}
              >
                <Field
                  placeholder="Password"
                  className="outline-none w-full"
                  name="password"
                  type="password"
                />
                {errors.password && touched.password && (
                  <ExclamationCircleIcon className="h-6 text-red-600" />
                )}
              </div>
              <div className="text-sm text-red-600">
                {/* {errors.password && touched.password ? <div>{errors.password}</div> : null} */}
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <div id="Birthday">Birthday</div>
                  {birthdayError && <div className="text-xs text-red-600">{birthdayError}</div>}
                </div>
                <div className="mt-1 flex items-center">
                  <Field
                    className={`outline-none w-full rounded-md border bg-white p-2 ${
                      birthdayError ? 'border-red-600' : ''
                    }`}
                    as="select"
                    name="year"
                  >
                    {yearRange.map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </Field>
                  <Field
                    className={`outline-none ml-[10px] w-full rounded-md border bg-white p-2 ${
                      birthdayError ? 'border-red-600' : ''
                    }`}
                    as="select"
                    name="month"
                  >
                    {monthRange.map((month) => (
                      <option key={month} value={month}>
                        {month}
                      </option>
                    ))}
                  </Field>
                  <Field
                    className={`outline-none ml-[10px] w-full rounded-md border bg-white p-2 ${
                      birthdayError ? 'border-red-600' : ''
                    }`}
                    as="select"
                    name="date"
                  >
                    {dateRange.map((date) => (
                      <option key={date} value={date}>
                        {date}
                      </option>
                    ))}
                  </Field>
                </div>
              </div>
              <div>
                <div id="gender-group">Gender</div>
                <div className="mt-1 flex items-center" role="group" aria-labelledby="gender-group">
                  <div className="flex w-full items-center justify-between rounded-md border p-2">
                    <label> Male</label>
                    <Field type="radio" name="gender" value="male" />
                  </div>
                  <div className="ml-2 flex w-full items-center justify-between rounded-md border p-2">
                    <label>Female</label>
                    <Field type="radio" name="gender" value="female" />
                  </div>
                  <div className="ml-2 flex w-full items-center justify-between rounded-md border p-2">
                    <label>Other</label>
                    <Field type="radio" name="gender" value="other" />
                  </div>
                </div>
              </div>

              <p className="my-[20px] text-xs text-gray-600 sm:text-sm">
                By clicking <span className="underline">Signup</span> means you&apos;'ve agreed to
                our <span className="cursor-pointer text-main">Service policy</span> and{' '}
                <span className="cursor-pointer text-main">Cookie policy</span>
              </p>
              <div className="flex items-center justify-center">
                <button
                  type="submit"
                  disabled={!(isValid && dirty)}
                  className={`text-md mx-auto mb-20 flex w-[200px] items-center justify-center  rounded-md p-2 font-semibold text-white text-secondary sm:text-lg ${
                    !(isValid && dirty)
                      ? 'cursor-not-allowed bg-gray-100 text-black'
                      : 'bg-main-yellow'
                  }`}
                >
                  {isLoading ? <Loader /> : 'SIGN UP'}{' '}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Index;
