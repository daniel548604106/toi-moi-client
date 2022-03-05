import '@/Styles/globals.css';
import '@/Styles/LoaderSpinner.css';
import '@/Styles/LoaderBounce.css';

import Cookies from 'js-cookie';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

import Header from '@/Components/Global/Header';
import PostSkeletonLoader from '@/Components/Global/Loader/PostSkeletonLoader';
import LoaderSpinner from '@/Components/Global/LoaderSpinner';
import Notification from '@/Components/Global/Notification';
import ViewPostModal from '@/Components/Global/ViewPostModal';
import InputBoxModal from '@/Components/Home/Feed/InputBoxModal';
import Login from '@/Components/Login/Index';
import { useAppDispatch, useAppSelector } from '@/Hooks/useAppRedux';
import * as ga from '@/Lib/gtag';
import { setNotification } from '@/Redux/slices/globalSlice';
import { setUserLogout } from '@/Redux/slices/userSlice';
import { store } from '@/Redux/store';

const Overlay = dynamic(() => import('@/Components/Global/Overlay'), {
  loading: () => <LoaderSpinner />,
});

// Modals

const EditSummaryModal = dynamic(() => import('@/Components/Profile/EditSummaryModal'), {
  loading: () => <LoaderSpinner />,
});
const LikesListModal = dynamic(() => import('@/Components/Home/Feed/LikesListModal'), {
  loading: () => <LoaderSpinner />,
});
const CreateRoomModal = dynamic(() => import('@/Components/Home/Feed/Room/CreateRoomModal/Index'), {
  loading: () => <LoaderSpinner />,
});
const EditProfileImageModal = dynamic(() => import('@/Components/Profile/EditProfileImageModal'), {
  loading: () => <LoaderSpinner />,
});
const LanguageSettingModal = dynamic(() => import('@/Components/Global/LanguageSettingModal'), {
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
  const { isLanguageOpen, notification, isCreateRoomOpen } = useAppSelector(
    (state) => state.global,
  );
  const isUserLoggedIn = useAppSelector((state) => state.user.isUserLoggedIn);
  const isEditProfileImageOpen = useAppSelector((state) => state.user.isEditProfileImageOpen);
  const isEditSummaryModalOpen = useAppSelector((state) => state.profile.isEditSummaryModalOpen);

  const [loading, setLoading] = useState(false);

  // Log user out if no token is found
  const token = Cookies.get('token');
  if (!token) {
    dispatch(setUserLogout());
  }

  const handleRouteChange = (url, { shallow }) => {
    ga.pageView(url);
    setLoading(true);
  };
  const handleRouteChangeComplete = () => {
    setLoading(false);
  };

  useEffect(() => {
    setTimeout(() => {
      dispatch(setNotification(''));
    }, 3000);
  }, [notification]);

  useEffect(() => {
    router.events.on('routeChangeStart', handleRouteChange);
    router.events.on('routeChangeComplete', handleRouteChangeComplete);

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method:
    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, []);

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

  if (!isUserLoggedIn && !allowedRoutes)
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
          <meta
            property="og:image"
            content="https://cdn01.pinkoi.com/product/ZD5QQsTg/0/800x0.jpg"
          />
          <link rel="apple-touch-icon" href="../public/favicon.ico" />
          <link rel="icon" href="../public/favicon.ico" />
        </Head>
        <Login />
      </>
    );

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
        <link rel="apple-touch-icon" href="../public/favicon.ico" />
        <link rel="icon" href="../public/favicon.ico" />
      </Head>
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
      {notification && <Notification notification={notification} />}
      {loading ? (
        <div className="pt-[100px] text-gray-600 text-center">
          <PostSkeletonLoader />
          <span className="">載入中...</span>
        </div>
      ) : (
        <main
          className={`${
            router.pathname.includes('messages') ? 'pt-56px' : 'pt-[110px]'
          }  md:pt-[56px] h-screen primary dark:bg-primary`}
        >
          <Component {...pageProps} />
        </main>
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
