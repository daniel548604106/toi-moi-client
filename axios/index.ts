import axios from 'axios';
import Cookie from 'js-cookie';
import router from 'next/router';

const token = Cookie.get('token');

const axiosInstance = axios.create({
  baseURL:
    process.env.NODE_ENV === 'development'
      ? `http://localhost:3001/api`
      : `${process.env.API_BASE_URL}/api`, // Server API Endpoint
});

// Add a request interceptor
axiosInstance.interceptors.request.use(function (config) {
  const token = Cookie.get('token');
  config.headers.Authorization = `Bearer ${token}`;

  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (['401', '403'].includes(error.response.status)) {
      Cookie.remove('token');
      router.push('/login');
    }

    console.log(error, 'axios error');
  },
);

export default axiosInstance;
