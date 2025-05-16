import Axios, { type AxiosInstance } from 'axios';

const axiosInstance: AxiosInstance = Axios.create({
  baseURL: 'https://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
  },

  withCredentials: true
});

export default axiosInstance;