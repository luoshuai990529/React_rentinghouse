import React from "react"
import { Icon } from 'antd-mobile';
import styles from "./index.module.scss"
import { List } from 'react-virtualized';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom"
class CitySelect extends React.Component {

    state = {
        cityListData: [],
        letterList: [],
        activeIndex: 0
    }

    componentDidMount() {
        console.log(this.props);
        // this.getHotCity();
        // this.getAllCity();
        this.createCityListData();

    }

    async createCityListData() {
        let cityListData = [];
        // 01.获取当前城市
        cityListData.push({
            title: "当前城市", children: [{ cityName: this.props.cityName }]
        })
        // 02.获取热门城市
        let res1 = await this.getHotCity()
        const hotCity = res1.data.body;
        cityListData.push({
            title: "热门城市",
            children: hotCity.map(item => ({ cityName: item.label, value: item.value }))
        })
        let res2 = await this.getAllCity();
        // 03.所有城市按字母添加到城市选择数组中
        const allCity = res2.data.body
        // 按照城市缩写进行数组排序
        allCity.sort((a, b) => a.short > b.short ? 1 : -1)
        allCity.forEach(item => {
            // 提取首字母
            const firstLetter = item.short.charAt(0).toUpperCase();

            // 城市列表中是否有当前首字母
            //   - 如果没有：就新增当前首字母作为标题 title
            //   - 如果有：就把当前城市作为孩子醉经到children数组中
            const index = cityListData.findIndex(item2 => firstLetter === item2.title);
            // 如果没有标题
            if (index === -1) {
                // 新增一个已首字母开头的标题
                cityListData.push({
                    title: firstLetter,
                    children: [{ cityName: item.label, value: item.value }]
                })
            } else {
                // 作为孩子添加到当前字幕的 children列表中
                cityListData[index].children.push({ cityName: item.label, value: item.value })
            }
        })
        console.log("前端设计的列表：", cityListData);
        // splice(开始删除的索引，删除的个数，添加的数据1，添加的数据2)
        const letterList = cityListData.map(item => item.title);
        letterList.splice(0, 2, "#", "热");
        // console.log("字母列表", letterList);
        // 设置为组件的状态
        this.setState({ cityListData, letterList })
        // 根据准确的测量每一行数据的高度，而不是默认的估算的高度
        this.ListRef.current.measureAllRows();
    }

    // 获取热门城市
    getHotCity() {
        return this.$axios.get("/area/hot")
    }
    // 获取所有城市
    getAllCity() {
        return this.$axios.get("/area/city?level=1")
    }

    // 单个行渲染函数
    // key:唯一表示
    // index:索引
    // isScrolling:布尔值，当前列表是否在滚动
    // isVisible:当前行是否可见
    // style:当前行的样式
    rowRenderer = ({ key, index, isScrolling, isVisible, style, }) => {
        // console.log(key, style, list[index]);
        // console.log("是否在滚动:"+isScrolling,"当前行是否可见："+isVisible);
        // style.borderBottom = "1px solid #eee";
        // style.lineHeight = "40px"
        // style.paddingLeft = "10px"
        // style.width = "90%"
        const item = this.state.cityListData[index];
        return (
            <div key={key} style={style} className={styles.city_item}>
                {/* list[index]  代表一条数据，类似之前 map 中的 item */}
                {item.title}
                {item.children.map(item2 => <div key={item2.cityName} style={{ lineHeight: "40px" }}>{item2.cityName}</div>)}
            </div>
        );
    }
    onRowsRendered = ({ startIndex }) => {
        // 如果不相等的时候，才更新右侧字母列表
        if (startIndex !== this.state.activeIndex) {
            // 每次 setState 会触发 render，添加判断进行优化，减少不必要的渲染
            this.setState({ activeIndex: startIndex });
        }
    }
    rowHeightCom = ({ index }) => {
        return 40 + this.state.cityListData[index].children.length * 40;
    }
    // 创建 List 组件的 ref 关联
    ListRef = React.createRef();
    render() {
        return (
            <div className={styles.city_list}>
                {/* 1.0头部导航组件 */}
                <h3><Icon type="left" onClick={() => { this.props.history.go(-1) }} />城市选择</h3>
                {/* 2.0字母列表 */}
                <div className={styles.letter_list}>
                    {this.state.letterList.map((item, index) => <span key={item} onClick={() => { this.setState({ activeIndex: index }) }} className={this.state.activeIndex == index ? styles.active : ""}>{item}</span>)}
                </div>
                {/* 3.0左侧城市-虚拟化列表 */}
                <div className={styles.city_wrap}>
                    <List
                        width={window.screen.width}
                        height={window.screen.height - 45}
                        rowCount={this.state.cityListData.length} //总列表行数
                        rowHeight={this.rowHeightCom}   //单个行高度
                        rowRenderer={this.rowRenderer}         //单个行渲染函数
                        ref={this.ListRef}
                        scrollToIndex={this.state.activeIndex}
                        onRowsRendered={this.onRowsRendered}
                        scrollToAlignment="start"
                    />
                </div>

            </div>
        )
    }
}

// 把 state 映射到 props 中的函数
const mapStateToProps = (state) => {
    return { ...state.mapReducer };
};
export default withRouter(connect(mapStateToProps)(CitySelect))
