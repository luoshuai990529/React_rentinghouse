import React from "react"
import { NavBar, Icon } from 'antd-mobile';
import styles from "./index.module.scss"
import SecInput from "../../components/SearchInput"
import HomeItem from "../../components/HouseItem"
import { connect } from "react-redux";
class Found extends React.PureComponent {
    state = {
        showMask: false,
        homeList: []
    }
    componentDidMount() {
        this.getHouseData()
    }

    showSelect = (type) => {
        console.log(type);
        this.setState({
            showMask: true
        })
    }
    // 获取房源信息
    getHouseData = async () => {
        const { cityName } = this.props;
        // 1.请求一：先通过城市名称换区一个城市id
        const res1 = await this.$axios.get(`/area/info?name=${cityName}`)
        const { value: id } = res1.data.body
        // 2.请求二：根据城市的id获取房源信息 &rentType=false&start=1&end=20
        const res2 = await this.$axios.get(`/houses?cityId=${id}`)
        this.setState({
            homeList: res2.data.body
        })
    }
    render() {
        this.state.baseURL= this.$axios.baseURL
        return (
            <div className={styles.found_wrap}>
                {/* 头部搜索栏 */}
                <div className={styles.found_sec}>
                    {/* 1.0头部导航组件 */}
                    <NavBar
                        mode="light"
                        icon={<Icon type="left" />}
                        onLeftClick={() => { this.props.history.go(-1) }}

                    ><div className={styles.sec_input}><SecInput mapColor={"#00ae66"} /></div></NavBar>
                </div>

                {/*筛选栏 */}
                <div className={styles.found_condiction}>
                    <div className={styles.head_warp}>
                        <div className={styles.con_items} onClick={() => { this.showSelect("area") }}>区域<i className={`${styles.iconfont} iconfont icon-arrow`}></i></div>
                        <div className={styles.con_items} onClick={() => { this.showSelect("method") }}>方式<i className={`${styles.iconfont} iconfont icon-arrow`}></i></div>
                        <div className={styles.con_items} onClick={() => { this.showSelect("price") }}>租金<i className={`${styles.iconfont} iconfont icon-arrow`}></i></div>
                        <div className={styles.con_items} onClick={() => { this.showSelect("filte") }}>筛选<i className={`${styles.iconfont} iconfont icon-arrow`}></i></div>
                    </div>
                    {/* 筛选栏内容 */}
                    {this.state.showMask ? <div className={styles.condition_wrap}></div> : ''}
                    {/* 取消确定 */}
                    {this.state.showMask ? <div className={styles.footer}><span>取消</span><span>确定</span></div> : ""}
                </div>
                {/* 房源列表 */}
                <div className={styles.house_item}>
                    {this.state.homeList.count > 0 ? <HomeItem headHiden="none" {...this.state} /> : ""}
                </div>

                {/* 阴影遮罩层 */}
                {this.state.showMask ? <div className={styles.mask} onClick={() => { this.setState({ showMask: false }) }}></div> : ""}

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    // 把 mapReducer 的地图数据映射到搜索框组件中
    return { ...state.mapReducer };
};

export default connect(mapStateToProps)(Found)
