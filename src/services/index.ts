import axios, { InternalAxiosRequestConfig, AxiosResponse } from 'axios';
import { Toast } from 'zarm';

//创建实例
const taxios = axios.create({
  baseURL: 'http://127.0.0.1:8000',
  timeout: 5000,
});

//添加拦截器
taxios.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    config.headers.Authorization = 'Bearer ' + localStorage.getItem('token');
    return config;
  },
  err => {
    return Promise.reject(`请求发送失败：${err}`);
  },
);

taxios.interceptors.response.use(
  (res: AxiosResponse) => {
    // 隐藏加载图标
    Toast.clear();
    if (res.data.code !== '0') {
      Toast.show(res.data.message);
    }
    return res;
  },
  error => {
    // 隐藏加载图标
    Toast.clear();
    // 处理错误
    if (error.response) {
      // 服务器响应错误
      switch (error.response.status) {
        case 408:
          Toast.show('请求超时');
          break;
        // 其他错误状态处理
        default:
          Toast.show(`错误 :${error}`);
          break;
      }
      return Promise.reject(error);
    }
  },
);

export default taxios;
