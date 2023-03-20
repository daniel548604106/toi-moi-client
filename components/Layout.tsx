import React from 'react';

import { useRouter } from 'next/router';

import { useAppSelector } from '@/hooks/useAppRedux';

import Header from '@/components/Global/Header';

const Layout = ({ children }) => {
  const router = useRouter();

  const isUserLoggedIn = useAppSelector((state) => state.user.isUserLoggedIn);

  return (
    <>
      {/* {router.pathname !== '/login' && isUserLoggedIn && <Header />} */}
      <main
        className={`${
          router.pathname.includes('messages') ? 'pt-56px' : 'pt-[110px]'
        }  primary h-screen dark:bg-primary md:pt-[56px]`}
      >
        {children}
      </main>
    </>
  );
};

export default Layout;
