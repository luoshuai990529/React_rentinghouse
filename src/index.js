import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './styles/global.scss';
import axios from "axios";
import { Toast } from 'antd-mobile';

//配置全局axios基地址
// axios.defaults.baseURL="http://157.122.54.189:9060"
// React.Component.prototype.$axios = axios;
// 创建自定义axios实例
const axios1 = axios.create({ baseURL: "http://157.122.54.189:9060" })
// const axios2 = axios.create({ baseURL:"http://157.122.54.189:9061" })
// 准备一个计数器用来管理 什么时候关闭Toast
let axiosCount = 0;
axios1.interceptors.request.use((config) => {
  // 在发送请求之前做什么
  axiosCount++;
  Toast.loading("加载中...", 0)
  return config
}, (err) => {
  // 队请求错误做些什么
  return Promise.reject(err);
})
// 响应拦截器
axios1.interceptors.response.use((res) => {
  axiosCount--;
  if (axiosCount === 0) {
    console.log('拦截器隐藏Toast');
    Toast.hide()
  }
  // console.log(res.data.body);
  return res
  // 在发送请求之前做什么
}, (err) => {
  // 队请求错误做些什么
  Toast.info("网络出问题了")
  return Promise.reject(err)
})
// 给函数添加一个路径属性
axios1.baseURL = "http://157.122.54.189:9060"

React.Component.prototype.$axios = axios1;


ReactDOM.render(
  // <React.StrictMode>
  //   </React.StrictMode>
  <App />,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
