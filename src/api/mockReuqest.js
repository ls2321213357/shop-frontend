import axios from 'axios';
const mockRequest = axios.create({
  baseURL: '/mock',
  timeout: 5000,
});
mockRequest.interceptors.request.use((config) => {
  return config;
});
mockRequest.interceptors.response.use(
  (res) => {
    return res.data;
  },
  (error) => {
    return Promise.reject(new Error('failure' + error));
  },
);
export default mockRequest;
