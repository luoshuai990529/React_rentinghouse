import React from "react"
// 导入走马灯组件
import HomeBanner from "./homeBanner"
import HomeGroups from "./homeGropus"
import HomeNews from "./homeNews"
// 导入home页面样式
import style from "./index.module.scss"
// 导入Flex布局
import { Flex } from 'antd-mobile';
import imgSrc1 from "../../assets/images/nav-1.png"
import imgSrc2 from "../../assets/images/nav-2.png"
import imgSrc3 from "../../assets/images/nav-3.png"
import imgSrc4 from "../../assets/images/nav-4.png"

class Home extends React.Component {
    state = {
        navList: [
            { id: 1, src: imgSrc1, href: "", text: "整租" },
            { id: 2, src: imgSrc2, href: "", text: "合租" },
            { id: 3, src: imgSrc3, href: "", text: "地图找房" },
            { id: 4, src: imgSrc4, href: "", text: "去出租" },
        ]
    }
    render() {
        return (
            <div className={style.homeContainer}>
                {/*  首页轮播图部分*/}
                <HomeBanner></HomeBanner>
                {/* 首页nav菜单 */}
                <Flex justify="around" className={style.homeNav}>
                    {
                        this.state.navList.map(item => <div onClick={() => { }} key={item.id} className={style.navItem}>
                            <img className={style.navImg} src={item.src} alt="" />
                            <p className={style.navText}>{item.text}</p>
                        </div>)
                    }
                </Flex>
                {/* Groups结构 */}
                <HomeGroups></HomeGroups>
                {/* news结构 */}
                <HomeNews></HomeNews>

            </div>
        )
    }
}

export default Home
