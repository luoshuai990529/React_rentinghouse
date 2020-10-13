import { TabBar } from 'antd-mobile';
import React from "react";
class TabBarExample extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'redTab',
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
        return (
            <div style={{ position: 'fixed', height: '100%', width: '100%', top: 0 } }>
                <TabBar
                    unselectedTintColor="#949494"//未选中字体颜色 
                    tintColor="#21B97A"//选中的字体颜色 
                    barTintColor="white"//背景色
                    hidden={this.state.hidden}
                >
                    <TabBar.Item
                        title="首页"
                        key="首页"
                        icon={<i className="iconfont icon-ind"  /> }
                        selectedIcon={<i className="iconfont icon-ind"  /> }
                        selected={this.state.selectedTab === 'blueTab'}
                        onPress={() => { this.setState({ selectedTab: 'blueTab', }); }}
                        data-seed="logId"
                    >
                        {this.renderContent('首页')}
                    </TabBar.Item>
                    <TabBar.Item
                        icon={ <i className="iconfont icon-findHouse" /> }
                        selectedIcon={ <i className="iconfont icon-findHouse" /> }
                        title="找房"
                        key="找房"
                        selected={this.state.selectedTab === 'redTab'}
                        onPress={() => { this.setState({ selectedTab: 'redTab', }); }}
                        data-seed="logId1"
                    >
                        {this.renderContent('找房')}
                    </TabBar.Item>
                    <TabBar.Item
                        icon={ <i className="iconfont icon-my" /> }
                        selectedIcon={ <i className="iconfont icon-my" /> }
                        title="我的"
                        key="我的"
                        selected={this.state.selectedTab === 'greenTab'}
                        onPress={() => { this.setState({ selectedTab: 'greenTab', }); }}
                    >
                        {this.renderContent('我的')}
                    </TabBar.Item>
                </TabBar>
            </div>
        );
    }
}
export default TabBarExample
// ReactDOM.render(<TabBarExample />, mountNode);