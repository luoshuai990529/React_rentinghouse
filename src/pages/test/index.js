import { Carousel, WingBlank } from 'antd-mobile';
import React from "react"
import "../../styles/carousel/index.scss"
class Carousels extends React.Component {
    state = {
        data: ['1', '2', '3'],
        imgHeight: 212,
    }
    componentDidMount() {
        // simulate img loading
        // 
        setTimeout(() => {
            this.setState({
                data: ['AiyWuByWklrrUDlFignR', 'TekJlZRVCjLFexlOCuWn', 'IJOtIlfsYdTyaDTRVrLI'],
            });
        }, 100);
    }
    render() {
        return (
            <WingBlank>
                <Carousel
                    autoplay={false}
                    infinite
                >
                    {this.state.data.map(val => (
                        <a
                            key={val}
                            href="http://www.alipay.com"
                            style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
                        >
                            <img
                                src={`https://zos.alipayobjects.com/rmsportal/${val}.png`}
                                alt=""
                                style={{ width: '100%', height: "100%", verticalAlign: 'top' }}
                            />
                        </a>
                    ))}
                </Carousel>
            </WingBlank>
        );
    }
}

export default Carousels