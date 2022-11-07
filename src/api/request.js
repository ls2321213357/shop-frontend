//对axios二次封装
import axios from 'axios';
//引入store用来获取仓库数据
import { setAssToken, getRefToken, getAssToken } from '@/util/token';
import router from '@/router';
//利用axios对象的create方法,去创建一个axios实例
//引入进度条功能
import nProgress from 'nprogress';
//引入nProgress样式
import 'nprogress/nprogress.css';
// 创建一个 axios 接口
const requests = axios.create({
  //基础路径
  baseURL: '/api',
  //超时事件
  timeout: 15000,
});
//请求拦截器:当发出请求时,会被检测到
requests.interceptors.request.use((config) => {
  let sumToken = getAssToken() + '&' + getRefToken();
  config.headers.Authorization = 'Bearer ' + sumToken;
  //进度条开始
  nProgress.start();
  return config;
});
//响应拦截器
requests.interceptors.response.use(
  //成功的回调:服务器返回数据以后，可以进行相应的拦截,然后搞事情
  (res) => {
    //进度条结束
    let count = 0;
    if (res.data.code === 1026) {
      count++;
      if (count > 3) {
        router.push('/login');
      }
      setAssToken(res.data.msg.accessToken);
    } else if (res.data.code == 400) {
      router.push('/misspage');
    }
    nProgress.done();
    return res.data;
  },
  //失败的回调，可以把promise原型链进行断开
  (error) => {
    return Promise.reject(new Error('faile' + error));
  },
);
export default requests;
