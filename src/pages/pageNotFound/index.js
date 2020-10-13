import React from "react"
class My extends React.Component {
    componentDidMount() {
        setTimeout(() => {
            this.props.history.replace("/home")
        }, 2000)
    }
    render() {
        return (
            <h1>页面未找到，2秒后跳转到首页</h1>
        )
    }
}

export default My
