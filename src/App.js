import React, { Component, Fragment } from 'react';
import { HashRouter as Router, Route, Switch ,Redirect} from "react-router-dom"

// 引入页面组件
import Index from "./pages/index";
import MapFound from "./pages/mapFound";
import CityList from "./pages/citySelect";
import PageNotFound from "./pages/pageNotFound";
// import Test from "./pages/test";

// 导入 connect 函数，用于把 dispatch 映射到组件 props 中
import { connect } from "react-redux";
// 导入 action 创建函数
import { getCityAction } from "./store/action/actionCreator";


class App extends Component {
  // 生命周期函数 - 组件挂载完毕时
  componentDidMount() {
    // 触发获取城市定位的 dispatch
    this.props.getCity();
  }

  render() {
    return (
      <Fragment>
        {/* Index页面 */}
        <Router>
          <Switch>
            <Redirect exact path="/h" to="/home"></Redirect>
            <Route path="/home" component={Index}></Route>
            <Route path="/map" component={MapFound}></Route>
            <Route path="/citylist" component={CityList}></Route>
            <Route component={PageNotFound}></Route>
          </Switch>
        </Router>
        {/* <Index></Index> */}
      </Fragment>
    );
  }
}


// 把 dispatch 映射到 props 中的函数
const mapDispatchToProps = (dispatch) => {
  return {
    // 获取城市定位的 dispatch
    getCity: () => {
      // action 创建函数内部获取定位的城市，最终有 dispatch 发送到仓库，修改仓库数据
      dispatch(getCityAction());
    }
  };
};

// connect 把 dispatch 映射到组件 props 中
export default connect(null, mapDispatchToProps)(App);