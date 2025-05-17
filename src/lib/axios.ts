import Axios, { type AxiosInstance } from 'axios';
import { store } from './store/store';
import { setLogout } from './store/slices/auth.slice';

const axiosInstance: AxiosInstance = Axios.create({
  baseURL: 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
  },

  withCredentials: true
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = store.getState().auth.accessToken;

    if (token) config.headers.Authorization = `Bearer ${token}`;
    
    return config;
  },
  (error) => Promise.reject(error),
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (
      error.response?.data.message === 'Access token is invalid' ||
      error.response?.data.message === 'User not found' ||
      error.response?.data.message === 'User is not verified' ||
      error.response?.data.message === 'jwt expired' ||
      error.response?.data.message === 'jwt malformed' ||
      error.response?.data.message === 'jwt signature is required'
    ) {
      store.dispatch(setLogout())
      localStorage.removeItem('accessToken')
      window.location.href = '/login'
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;