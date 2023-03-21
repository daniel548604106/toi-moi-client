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

import ErrorBoundary from '@/components/ErrorBoundary';
import LoaderSpinner from '@/components/global/loader/LoaderSpinner';
import GlobalLoader from '@/components/global/loader/PostSkeletonLoader';
import Notification from '@/components/global/Notification';
import ViewPostModal from '@/components/global/ViewPostModal';
import Layout from '@/components/Layout';
import Login from '@/components/login/Index';
import * as ga from '@/lib/gtag';
import { setIsCommonLoading, setNotification } from '@/redux/slices/globalSlice';
import { setUserLogout } from '@/redux/slices/userSlice';
import { store } from '@/redux/store';

const Overlay = dynamic(() => import('@/components/global/Overlay'), {
  loading: () => <LoaderSpinner />,
});

// Modals

const EditSummaryModal = dynamic(() => import('@/components/profile/EditSummaryModal'), {
  loading: () => <LoaderSpinner />,
});
const CreateRoomModal = dynamic(() => import('@/components/Home/Feed/Room/CreateRoomModal/Index'), {
  loading: () => <LoaderSpinner />,
});
const EditProfileImageModal = dynamic(() => import('@/components/profile/EditProfileImageModal'), {
  loading: () => <LoaderSpinner />,
});

let persistor = persistStore(store);

// Disable Console.logs
if (process.env.NODE_ENV !== 'development') console.log = () => {};

const App = ({ Component, pageProps }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { isViewPostModalOpen } = useAppSelector((state) => state.post);
  const { notification, isCreateRoomOpen, isCommonLoading } = useAppSelector(
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
    isViewPostModalOpen || isEditProfileImageOpen || isEditSummaryModalOpen || isCreateRoomOpen;
  return (
    <>
      <Head>
        <title>Toi & Moi</title>
      </Head>
      <ErrorBoundary>
        <Layout>
          {!isUserLoggedIn && !allowedRoutes ? (
            <Login />
          ) : (
            <>
              {isModalOpen && (
                <Overlay>
                  <>
                    {isViewPostModalOpen && <ViewPostModal />}
                    {isEditProfileImageOpen && <EditProfileImageModal />}
                    {isEditSummaryModalOpen && <EditSummaryModal />}
                    {/* {isCreateRoomOpen && <CreateRoomModal />} */}
                  </>
                </Overlay>
              )}
              {/* <AnimatePresence> */}
              {notification && <Notification notification={notification} />}
              {/* </AnimatePresence> */}
              {isCommonLoading && <GlobalLoader />}

              <Component {...pageProps} />
            </>
          )}
        </Layout>
      </ErrorBoundary>
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
