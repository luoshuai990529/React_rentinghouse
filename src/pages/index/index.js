import { TabBar } from 'antd-mobile';
import React from "react";
import { HashRouter as Router, Redirect, Route, Switch } from "react-router-dom"
import Home from "../home"
import Found from "../found"
import My from "../my"
// import Index from "../index"
class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: '1',
            hidden: false,
        };
    }

    // 自定义的函数
    renderContent(pageText) {
        return (
            <div style={{ backgroundColor: 'white', height: '100%', textAlign: 'center' }}>
                {pageText}
            </div>
        );
    }

    // 生命周期函数render
    render() {
        const { history } = this.props
        const { location } = this.props
        return (
            <>
                <Route exact path="/home" component={Home}></Route>
                <Route path="/home/list" component={Found}></Route>
                <Route path="/home/profile" component={My}></Route>
                <div style={{ position: 'fixed', height: 50, width: '100%', bottom: 0 }}>
                    {/* 路由组件 */}

                    <TabBar
                        unselectedTintColor="#949494"//未选中字体颜色 
                        tintColor="#21B97A"//选中的字体颜色 
                        barTintColor="white"//背景色
                        hidden={this.state.hidden}
                    >
                        <TabBar.Item
                            title="首页"
                            key="首页"
                            icon={<i className="iconfont icon-ind" />}
                            selectedIcon={<i className="iconfont icon-ind" />}
                            selected={location.pathname === '/home'}
                            onPress={() => { history.push("/home"); }}
                            data-seed="logId"
                        >
                        </TabBar.Item>
                        <TabBar.Item
                            icon={<i className="iconfont icon-findHouse" />}
                            selectedIcon={<i className="iconfont icon-findHouse" />}
                            title="找房"
                            key="找房"
                            selected={location.pathname === '/home/list'}
                            onPress={() => { history.push("/home/list"); }}
                            data-seed="logId1"
                        >
                        </TabBar.Item>
                        <TabBar.Item
                            icon={<i className="iconfont icon-my" />}
                            selectedIcon={<i className="iconfont icon-my" />}
                            title="我的"
                            key="我的"
                            selected={location.pathname === '/home/profile'}
                            onPress={() => { history.push("/home/profile"); }}
                        >
                        </TabBar.Item>
                    </TabBar>
                </div>
            </>
        );
    }
}
export default Index
// ReactDOM.render(<TabBarExample />, mountNode);