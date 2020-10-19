import React from "react"
import secStyle from "./secinput.module.scss"
import { connect } from "react-redux";
import {withRouter} from "react-router-dom"
class SecInput extends React.Component {
    constructor(props){
        super(props)
    }
    render() {
        return (
            <div className={secStyle.sec_wrap}>
                <div className={secStyle.secinp}>
                    <span className={secStyle.search_city} onClick={()=>{this.props.history.push("/citylist")}}>{this.props.cityName}<i className={"iconfont icon-arrow " + secStyle.icon_arrow}></i></span>
                    <span className={secStyle.text}><i className={"iconfont icon-seach " + secStyle.icon_seach}></i> 请输入校区或地址</span>
                </div>
                <div className={secStyle.map} onClick={()=>{this.props.history.push("/map")}}><i style={{color:this.props.mapColor}} className={"iconfont icon-map " + secStyle.icon_map}></i></div>
            </div>
        )
    }

}

// connect(mapStateToProps,mapDispatchToProps);
const mapStateToProps = (state) => {
    // 把 mapReducer 的地图数据映射到搜索框组件中
    return { ...state.mapReducer };
};

export default withRouter(connect(mapStateToProps)(SecInput));
