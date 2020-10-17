import React from "react"
import { NavBar, Icon } from 'antd-mobile';
import styles from "./index.module.scss";
import {withRouter} from "react-router-dom"
import { connect } from "react-redux";
//将window全局变量的BMap解构出来 
const { BMap } = window
class MapFound extends React.Component {

  componentDidMount() {
    const map = new BMap.Map("container")
    console.log("mapFound--componentDidMount", this.props);
    // 缩放级别 1-19 
    map.centerAndZoom(this.props.cityName, 10)
  }
  render() {
    console.log(this.props);
    return (
      <div className={styles.mapwrap}>
        <div className={styles.found_page}>
          <NavBar
            mode="light"
            icon={<Icon type="left" />}
            onLeftClick={() => { this.props.history.go(-1) }}
          // rightContent={[
          //   <Icon key="0" type="search" style={{ marginRight: '16px' }} />,
          //   <Icon key="1" type="ellipsis" />,
          // ]}
          >地图查找</NavBar>

        </div>
        <div className={styles.baidu_map} id="container" >
          百度地图的盒子
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  // 把 mapReducer 的地图数据映射到搜索框组件中
  return { ...state.mapReducer };
};

export default withRouter(connect(mapStateToProps)(MapFound));