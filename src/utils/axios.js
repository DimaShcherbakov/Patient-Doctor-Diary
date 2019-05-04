import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000',
});
axiosInstance.all = axios.all;
export default axiosInstance;
