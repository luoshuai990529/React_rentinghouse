import React from "react"
import { NavBar, Icon } from 'antd-mobile';
import styles from "./index.module.scss"
class Carousels extends React.Component {
    
    componentDidMount() {
       
    }
    render() {
        return (
            <div className={styles.found_page}>
            <NavBar
              mode="light"
              icon={<Icon type="left" />}
              onLeftClick={() => console.log('onLeftClick')}
              rightContent={[
                <Icon key="0" type="search" style={{ marginRight: '16px' }} />,
                <Icon key="1" type="ellipsis" />,
              ]}
            >地图查找</NavBar>
        
           
          </div>
        );
    }
}

export default Carousels