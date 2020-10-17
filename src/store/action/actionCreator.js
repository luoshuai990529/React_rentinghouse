// #使用action生成器来创建action
// 把 action 也封装抽离出一个文件，方便后期对仓库的所有 action 进行管理。
import { getCityByBaiduMap } from "../../utils/baiduMap";
import { GET_CITY } from "./actionType";


// 获取城市信息也使用 异步 action
export const getCityAction = () => {
    // 返回一个有业务的函数
    return (dispatch) => {
      // 调用封装的百度地区获取定位城市的方法
      getCityByBaiduMap()
        // 获取成功时
        .then(res => {
          // 回调函数内部触发 dispatch() 发送 action 修改仓库的数据
          dispatch({ type: GET_CITY, value: res.replace('市', '') });
        });
    };
  };
