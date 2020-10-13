import React, { Component, Fragment } from 'react';
import { HashRouter as Router, Route, Switch ,Redirect} from "react-router-dom"
// 1 引入 ant 组件
// import { Button } from "antd-mobile";
// 引入页面组件
import Index from "./pages/index";
import MapFound from "./pages/mapFound";
import CityList from "./pages/citySelect";
import PageNotFound from "./pages/pageNotFound";

// import Test from "./pages/test";

class App extends Component {
  render() {
    return (
      <Fragment>
        {/* Index页面 */}
        <Router>
          <Switch>
            <Redirect exact path="/" to="/home"></Redirect>
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
export default App;