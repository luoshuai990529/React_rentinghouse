import { GET_CITY } from "../action/actionType";

// 仓库默认数据
const defaultState = {
  cityName: '定位中'
};

// 仓库管理员  action 由 dispatch 发送过来的
const mapReducer = (state = defaultState, action) => {
  switch (action.type) {
    case GET_CITY:
      return { cityName: action.value };
    default:
      return state;
  }
};

// 导出 reducer 函数
export default mapReducer;
