import axios from 'axios';
import Cookie from 'js-cookie';

const request = axios.create({
  baseURL:
    process.env.NODE_ENV === 'development'
      ? `http://localhost:3001/api`
      : 'http://ec2-18-141-229-55.ap-southeast-1.compute.amazonaws.com:3001/api'
});

// Add a request interceptor
request.interceptors.request.use(function (config) {
  const token = Cookie.get('token');
  config.headers.Authorization = `Bearer ${token}`;

  return config;
});

export default request;
