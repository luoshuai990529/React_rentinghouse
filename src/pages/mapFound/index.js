import React from "react"
import { NavBar, Icon } from 'antd-mobile';
import styles from "./index.module.scss";
import { withRouter } from "react-router-dom"
import { connect } from "react-redux";
import HouseItem from "../../components/HouseItem"
import { Toast } from 'antd-mobile';
//将window全局变量的BMap解构出来 
const { BMap } = window
// 为了方面访问地图实例的变量  将其变为公共的
let map;
// 定位城市名
let areaCenterName = ""
// 根据不同数据级别展示不同的缩放级别和 覆盖物类名
let levelData = [
  { id: 1, scale: 12, className: "map_circle" },
  { id: 2, scale: 13, className: "map_circle" },
  { id: 3, scale: 15, className: "map_rect" },
]
let levelIndex = 0;
let lableZindex=0;
/* 
获取城市房源数据：
  1.请求一：先通过城市名称换区一个城市id
  2.请求二：根据城市的id获取房源信息
  3.根据房源信息绘制覆盖物
获取区域的房源数据
  1.清楚地图覆盖物
  2.发送网络请求，传入区域的id
  3.根据房源信息绘制覆盖物

  设置地图中心点
  设置地图缩放级别
  设置覆盖物类名

  三级房源覆盖物点击：
    1.展示房屋列表组件
    2.发送网络请求获取房源列表数据
    3.渲染到组建中
    4.覆盖物移动过到视觉中心
    5.被点击的覆盖物层级提升一级
  
  地图移动的时候，隐藏房屋列表

*/


class MapFound extends React.Component {
  state = {
    showHouseList: false,
    homeList: []
  }

  componentDidMount() {
    levelIndex = 0;
    console.log("mapFound--componentDidMount", this.props);
    areaCenterName = this.props.cityName
    this.renderMap();
  }
  

  renderMap = () => {
    map = new BMap.Map("container")

    map.addEventListener("dragstart",()=>{
      // 拖拽地图隐藏房源列表
      this.setState({
        showHouseList:false
      })
    })

    // 🚩 添加地图控件
    // 建议把添加控件的代码写到定时器中，否则界面会先错乱一下才变正常(体验不好)
    map.addControl(new BMap.NavigationControl());
    map.addControl(new BMap.GeolocationControl());
    setTimeout(() => {
      // 因为加载问题 需要延迟5s
      map.addControl(new BMap.ScaleControl());
    }, 5000);
    // map.centerAndZoom(this.props.cityName, 12)

    this.getHouseData();
  }
  // 获取房源数据封装
  getHouseData = async () => {
    const { cityName } = this.props;
    // 1.请求一：先通过城市名称换区一个城市id
    const res1 = await this.$axios.get(`/area/info?name=${cityName}`)
    const { value: id } = res1.data.body
    // 2.请求二：根据城市的id获取房源信息
    const res2 = await this.$axios.get(`/area/map?id=${id}`)
    const areaList = res2.data.body;
    // 3.调用渲染覆盖物方法
    this.renderOverlay(areaList)
  }
  // 4.渲染覆盖物的函数 -递归封装
  renderOverlay = (areaList) => {
    // 4.1清除所有的覆盖物
    map.clearOverlays();
    // 4.2重新定位中心点
    // console.log('定位中心点', areaCenterName);
    map.centerAndZoom(areaCenterName, levelData[levelIndex].scale);

    areaList.forEach(item => {
      // 解构需要战术的数据
      const { label: areaName, value: id, count, coord } = item;
      // areaCenterName=areaName;
      // console.log(areaCenterName);
      const opts = {
        // 指定文本标注所在的地理位置
        position: new BMap.Point(coord.longitude, coord.latitude),
        // 设置文本偏移量，偏移宽高的一半就是居中
        offset: new BMap.Size(-35, -35)
      };
      // 创建文本覆盖物，通过覆盖物内的div控制样式，切换类明就可以切换样式
      const label = new BMap.Label(`<div class='${levelData[levelIndex].className}'><span>${areaName}</span><p>${count}套</p></div>`, opts)
      // 清除文本覆盖物原本的模人样还是
      label.setStyle({ border: 'none', backgroundColor: "transparent" });
      // 4.3把覆盖物添加到地图中
      map.addOverlay(label);
      
      label.addEventListener("click", (e) => {
        
        
        // 给用户提示
        if (levelIndex < 2) {
          levelIndex++;
          areaCenterName += areaName

          this.$axios.get(`/area/map?id=${id}`).then(res => {
            // console.log('当前区的房源信息：', res.data.body);
            const areaList = res.data.body;
            // 4.4递归：函数内部自己调用自己，不过这里传入的是新的房源数据
            this.renderOverlay(areaList)
          })
          // Toast.info("已经显示完所有数据啦~", 1)
          // return
        } else {
          this.getLevel3HourseList(id)

          label.setZIndex(++lableZindex);
          const {clientX,clientY} = e.changedTouches[0];
          const x= window.screen.width/2 -clientX
          const y= window.screen.height/2/2 -clientY
          map.panBy(x,y)
        }

      })
    })
  }
  // 5.点击三级房源覆盖物 获取房屋列表展示
  getLevel3HourseList = async (id) => {
    console.log("展示房屋列表");
    this.setState({
      showHouseList: false
    })
    let res = await this.$axios.get(`/houses?cityId=${id}`)
    this.setState({
      homeList: res.data.body,
      showHouseList: true
    })
  }


  render() {
    this.state.baseURL = this.$axios.baseURL
    const showHouse = this.state.showHouseList ? styles.active:"";
    return (
      <div className={styles.mapwrap}>
        <div className={styles.found_page}>
          {/* 1.0头部导航组件 */}
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
        {/* 2.0百度地图 */}
        <div className={styles.baidu_map} id="container" >
        </div>
        {/* 3.0房屋列表 */}
        <div className={`${styles.House_content} ${showHouse}`}>
          {this.state.showHouseList ? <HouseItem {...this.state} /> : ""}
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