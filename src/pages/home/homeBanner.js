import { Carousel } from 'antd-mobile';
import React from "react"
import style from "./index.module.scss"
//导入搜索框模块
import SecInput from "../../components/SearchInput"
class Carousels extends React.Component {
    state = {
        swiperData: [],
    }
    componentDidMount() {
        this.querySwiper();
    }
    querySwiper = () => {
        this.$axios.get("/home/swiper").then(res => {
            this.setState({ swiperData: res.data.body }, () => {
                // console.log("swiper数据：", this.state);
            })
        })
    }
    
    
    render() {
        return (
            // WingBlank 两侧留白的组件
            // <WingBlank>
            <div className={style.banner}>
                <SecInput></SecInput>
                {this.state.swiperData.length !== 0 &&
                    <Carousel
                        autoplay={false}
                        infinite
                    >
                        {this.state.swiperData.map(val => (

                            <a
                                onClick={(e) => { e.preventDefault() }}
                                key={val.id}
                                href="#"
                                className={style.img_awrap}
                            >
                                <img
                                    src={this.$axios.defaults.baseURL + val.imgSrc}
                                    className={style.imgHeight}
                                />
                            </a>
                        ))}
                    </Carousel>}
            </div>
            // </WingBlank>
        );
    }
}

export default Carousels