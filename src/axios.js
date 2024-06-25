import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://api.example.com', // 替换为你的API基地址
  timeout: 1000,
  headers: {'X-Custom-Header': 'foobar'}
});

export default axiosInstance;