import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './styles/global.scss';
import axios from "axios";
import { Toast } from 'antd-mobile';
// 提供商 代理商 
import { Provider } from "react-redux";
// 导入redux仓库
import store from './store/index';

//配置全局axios基地址
// axios.defaults.baseURL="http://157.122.54.189:9060"
// React.Component.prototype.$axios = axios;
// 创建自定义axios实例
const axios1 = axios.create({ baseURL: "http://157.122.54.189:9060" })
// const axios2 = axios.create({ baseURL:"http://157.122.54.189:9061" })
// 准备一个计数器用来管理 什么时候关闭Toast
let axiosCount = 0;
axios1.interceptors.request.use((config) => { axiosCount++; Toast.loading("加载中...", 0); return config }, (err) => Promise.reject(err) )
// 响应拦截器
axios1.interceptors.response.use((res) => { axiosCount--; if (axiosCount === 0) { Toast.hide() } return res }, (err) => { Toast.offline("网络出问题了"); return Promise.reject(err) })
// 给函数添加一个路径属性
axios1.baseURL = "http://157.122.54.189:9060"
React.Component.prototype.$axios = axios1;


ReactDOM.render(
  // 通过提供商提供仓库数据
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

