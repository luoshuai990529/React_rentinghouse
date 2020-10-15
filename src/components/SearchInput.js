import React from "react"
import secStyle from "./secinput.module.scss"

class SecInput extends React.Component {
    state = {
    }
    render() {
        return (
            <div className={secStyle.sec_wrap}>
                <div className={secStyle.secinp}>
                    <span className={secStyle.search_city}>广州<i className={"iconfont icon-arrow "+secStyle.icon_arrow}></i></span>
                    <span className={secStyle.text}><i className={"iconfont icon-seach "+secStyle.icon_seach}></i> 请输入校区或地址</span>
                </div>
                <div className={secStyle.map}><i className={"iconfont icon-map "+secStyle.icon_map}></i></div>
            </div>
        )
    }

}

export default SecInput;
