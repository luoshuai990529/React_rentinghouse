import React from "react"
import newsStyle from "./news.module.scss"

class News extends React.Component {
    state = {
        newsData: [],
    }
    componentDidMount() {
        this.queryNews();
    }
    queryNews = () => {
        this.$axios.get("/home/news").then(res => {
            this.setState({ newsData: res.data.body }, () => {
            })
        })
    }
    render() {
        return (
            <div className={newsStyle.news}>
                <div className={newsStyle.head}>
                    <h4 >最新资讯</h4>
                </div>
                <div className={newsStyle.news_item}>
                    {
                        this.state.newsData.map(item => <a key={item.id} href="#" className={newsStyle.item}>
                            <img src={this.$axios.baseURL+item.imgSrc} alt="" />
                            <div className={newsStyle.item_info}>
                                <h4>{item.title}</h4>
                                <p><span className={newsStyle.left}>{item.from}</span> <span className="right">{item.date}</span></p>
                            </div>
                        </a>)
                    }
                </div>
            </div>
        )
    }

}

export default News;
