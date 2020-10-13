import React, { Component, Fragment } from 'react';
// 1 引入 ant 组件
import { Button } from "antd-mobile";
// 引入页面组件
import Home from "./pages/home";
import My from "./pages/my";

class App extends Component {
  render() {
    return (
      <Fragment>
        {/* 2 使用 */}
        
        <div>
          <Button>按钮</Button>
        </div>
        <My></My>
        <Home></Home>
      </Fragment>
    );
  }
}
export default App;