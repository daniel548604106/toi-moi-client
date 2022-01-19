import axios from 'axios';
import Cookie from 'js-cookie';

const request = axios.create({
  baseURL:
    process.env.NODE_ENV === 'development'
      ? `http://localhost:3001/api`
      : 'https://toi-moi-server.de.r.appspot.com/api'
});

// Add a request interceptor
request.interceptors.request.use(function (config) {
  const token = Cookie.get('token');
  config.headers.Authorization = `Bearer ${token}`;

  return config;
});

export default request;
