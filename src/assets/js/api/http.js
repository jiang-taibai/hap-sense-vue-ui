import axios from 'axios';

const http = axios.create({
  baseURL: 'http://api.example.com', // 你的 API 基地址
  timeout: 5000, // 请求超时时间
});

// 可以添加拦截器等其他配置

export default http;