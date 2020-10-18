import React, { Component, Fragment } from 'react';
import { HashRouter as Router, Route, Switch, Redirect } from "react-router-dom"

// 引入页面组件
import Index from "./pages/index";
import MapFound from "./pages/mapFound";
import CityList from "./pages/citySelect";
import PageNotFound from "./pages/pageNotFound";
import Test from "./pages/test";

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
    console.log('App组件的render', this.props);
    return (
      <Fragment>
        {/* Index页面 */}
        {/* redux中的城市名不是为全国才显示下面的路由，即等待地图定位完毕 */}
        <Router>
          <Switch>
            <Redirect exact path="/" to="/home"></Redirect>
            <Route path="/test" component={Test}></Route>
            <Route path="/home" component={Index}></Route>
            <Route path="/map" >
              {/* 这样没有路由信息，可以用到withRouter */}
              {this.props.cityName !== "定位中" && <MapFound />}
            </Route>
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
// 把 state 映射到 props 中的函数
const mapStateToProps = (state) => {
  return { ...state.mapReducer };
};
// connect 把 dispatch 映射到组件 props 中
export default connect(mapStateToProps, mapDispatchToProps)(App);