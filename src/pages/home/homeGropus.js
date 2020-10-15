import React from "react"
import groupsStyle from "./groups.module.scss"

class Groups extends React.Component {
    state = {
        groupsData: [],
    }
    componentDidMount() {
        this.queryGroups();
    }
    queryGroups = () => {
        this.$axios.get("/home/groups").then(res => {
            this.setState({ groupsData: res.data.body }, () => {
                console.log("groups数据：", this.state);
            })
        })
    }
    render() {
        return (
            <div className={groupsStyle.groups}>
                <div className={groupsStyle.head} >
                    <span className={groupsStyle.left}>租房小组</span>
                    <span className={groupsStyle.right}>更多</span>
                </div>
                <div className={groupsStyle.groups_wrap}>
                    {
                        this.state.groupsData.map(item => <a key={item.id} href="#" className={groupsStyle.item}>
                            <div className={groupsStyle.text}>
                                <h4>{item.title}</h4>
                                <span>{item.desc}</span>
                            </div>
                            <img src={this.$axios.baseURL+item.imgSrc} alt="" />
                        </a>)
                    }
                </div>
            </div>
        )
    }

}

export default Groups;
