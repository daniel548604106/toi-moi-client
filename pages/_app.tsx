import '@/styles/globals.css';
import '@/styles/LoaderBounce.css';
import '@/styles/LoaderSpinner.css';
import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';
import { useCallback, useEffect } from 'react';
import { Provider } from 'react-redux';

import { AnimatePresence, motion } from 'framer-motion';
import Cookies from 'js-cookie';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

import { useAppDispatch, useAppSelector } from '@/hooks/useAppRedux';

import Header from '@/components/Global/Header';
import GlobalLoader from '@/components/Global/Loader/PostSkeletonLoader';
import LoaderSpinner from '@/components/Global/LoaderSpinner';
import Notification from '@/components/Global/Notification';
import ViewPostModal from '@/components/Global/ViewPostModal';
import InputBoxModal from '@/components/Home/Feed/InputBoxModal';
import Login from '@/components/Login/Index';
import * as ga from '@/lib/gtag';
import { setIsCommonLoading, setNotification } from '@/redux/slices/globalSlice';
import { setUserLogout } from '@/redux/slices/userSlice';
import { store } from '@/redux/store';

const Overlay = dynamic(() => import('@/components/Global/Overlay'), {
  loading: () => <LoaderSpinner />,
});

// Modals

const EditSummaryModal = dynamic(() => import('@/components/Profile/EditSummaryModal'), {
  loading: () => <LoaderSpinner />,
});
const LikesListModal = dynamic(() => import('@/components/Home/Feed/LikesListModal'), {
  loading: () => <LoaderSpinner />,
});
const CreateRoomModal = dynamic(() => import('@/components/Home/Feed/Room/CreateRoomModal/Index'), {
  loading: () => <LoaderSpinner />,
});
const EditProfileImageModal = dynamic(() => import('@/components/Profile/EditProfileImageModal'), {
  loading: () => <LoaderSpinner />,
});
const LanguageSettingModal = dynamic(() => import('@/components/Global/LanguageSettingModal'), {
  loading: () => <LoaderSpinner />,
});

let persistor = persistStore(store);

// Disable Console.logs
if (process.env.NODE_ENV !== 'development') console.log = () => {};

const App = ({ Component, pageProps }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { isLikesListOpen, isPostInputBoxOpen, isViewPostModalOpen } = useAppSelector(
    (state) => state.post,
  );
  const { isLanguageOpen, notification, isCreateRoomOpen, isCommonLoading } = useAppSelector(
    (state) => state.global,
  );
  const isUserLoggedIn = useAppSelector((state) => state.user.isUserLoggedIn);
  const isEditProfileImageOpen = useAppSelector((state) => state.user.isEditProfileImageOpen);
  const isEditSummaryModalOpen = useAppSelector((state) => state.profile.isEditSummaryModalOpen);

  // Log user out if no token is found
  const token = Cookies.get('token');
  if (!token) {
    dispatch(setUserLogout());
  }

  const handleRouteChange = useCallback(
    (url, { shallow }) => {
      ga.pageView(url);
      dispatch(setIsCommonLoading(true));
    },
    [dispatch],
  );

  const handleRouteChangeComplete = useCallback(() => {
    dispatch(setIsCommonLoading(false));
  }, [dispatch]);

  useEffect(() => {
    setTimeout(() => {
      dispatch(setNotification(''));
    }, 3000);
  }, [notification, dispatch]);

  useEffect(() => {
    router.events.on('routeChangeStart', handleRouteChange);
    router.events.on('routeChangeComplete', handleRouteChangeComplete);

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method:
    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, [handleRouteChange, handleRouteChangeComplete, router.events]);

  // Track user geolocation

  useEffect(() => {
    const successfulLookup = (position) => {
      const { latitude, longitude } = position.coords;
      ga.event({
        action: 'send',
        category: 'geolocation',
        label: 'geolocation',
        value: [latitude, longitude],
      });
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(successfulLookup, console.log);
    }
  }, []);

  const allowedRoutes = router.pathname === '/reset/password';
  const isModalOpen =
    isLikesListOpen ||
    isPostInputBoxOpen ||
    isViewPostModalOpen ||
    isEditProfileImageOpen ||
    isEditSummaryModalOpen ||
    isCreateRoomOpen ||
    isLanguageOpen;

  return (
    <>
      <Head>
        <title>Toi & Moi</title>
        <meta
          name="description"
          content="Toi&Moi is a fullstack social platform designated to connect people from distances away, users are able to build their own profile and connect with people from around the world with realtime messaging and friend system. "
        />

        <meta name="keywords" content="Toi&Moi social-media friend post" />
        <meta property="og:type" content="website" />
        <meta
          property="og:description"
          content="Toi&Moi is a fullstack social platform designated to connect people from distances away, users are able to build their own profile and connect with people from around the world with realtime messaging and friend system."
        />
        <meta name="theme-color" content="#eb7f82" />
        <meta property="fb:app_id" content="4937468222991458" />
        <meta property="og:title" content="Toi & Moi | Brand New Social Media Platform" />
        <meta property="og:url" content="https://toi-moi.herokuapp.com" />
        <meta property="og:image" content="https://cdn01.pinkoi.com/product/ZD5QQsTg/0/800x0.jpg" />

        {/* new */}

        <meta property="fb:app_id" content="4937468222991458" />
        <meta
          property="og:title"
          content="O.HI.O | 亞洲領先設計購物網站 | Design the way you are"
        />
        <meta property="og:url" content="https://www.pinkoi.com/browse" />
        <meta property="og:image" content="https://cdn01.pinkoi.com/product/ZD5QQsTg/0/800x0.jpg" />

        {/* <!-- iOS  --> */}
        <link href="logo.svg" rel="apple-touch-icon" />
        <link href="logo.svg" rel="apple-touch-icon" sizes="76x76" />
        <link href="logo.svg" rel="apple-touch-icon" sizes="120x120" />
        <link href="logo.svg" rel="apple-touch-icon" sizes="152x152" />

        <link rel="apple-touch-icon" href="./favicon.ico" />
        <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
        <link rel="apple-touch-icon" href="../public/favicon.ico" />
        <link rel="icon" href="../public/favicon.ico" />
      </Head>
      {!isUserLoggedIn && !allowedRoutes ? (
        <Login />
      ) : (
        <>
          {isModalOpen && (
            <Overlay>
              <>
                {isLikesListOpen && <LikesListModal />}
                {isPostInputBoxOpen && <InputBoxModal />}
                {isViewPostModalOpen && <ViewPostModal />}
                {isEditProfileImageOpen && <EditProfileImageModal />}
                {isEditSummaryModalOpen && <EditSummaryModal />}
                {isLanguageOpen && <LanguageSettingModal />}
                {isCreateRoomOpen && <CreateRoomModal />}
              </>
            </Overlay>
          )}
          {!allowedRoutes && <Header />}
          {/* <AnimatePresence> */}
          {notification && <Notification notification={notification} />}
          {/* </AnimatePresence> */}
          {isCommonLoading && <GlobalLoader />}
          <main
            className={`${
              router.pathname.includes('messages') ? 'pt-56px' : 'pt-[110px]'
            }  primary h-screen dark:bg-primary md:pt-[56px]`}
          >
            <Component {...pageProps} />
          </main>
        </>
      )}
    </>
  );
};

function MyApp({ Component, pageProps }) {
  return (
    //Make sure every page has the login state
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App pageProps={pageProps} Component={Component} />
      </PersistGate>
    </Provider>
  );
}

export default MyApp;
