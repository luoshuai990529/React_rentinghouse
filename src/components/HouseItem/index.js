import React from "react"
import styles from "./index.module.scss"
function HouseItem(state) {
    const { homeList } = state;
    console.log("房源列表数据：",homeList);
    // const show_House = state.showHouseList?styles.active:""
    return (
        <div className={`${styles.house_list_wrap} `}>
            <div className={styles.house_title} style={{display:state.headHiden}}>
                <span>房屋列表</span>
                <a href="#">更多房源</a>
            </div>
            <div className={styles.house_list}>
                {homeList.list.map(item => <div key={item.houseCode} className={styles.house_item}>
                    <img src={state.baseURL + item.houseImg} alt="" />
                    <div className={styles.house_info}>
                        <div className={styles.house_info_name}>{item.title}</div>
                        <div className={styles.house_desc}>{item.desc}</div>
                        <div className={styles.house_tags}>
                            {item.tags.slice(0,3).map(tag => <span key={tag}>{tag}</span>)}
                        </div>
                        <div className={styles.house_price}>{item.price}</div>
                    </div>
                </div>)}
            </div>

        </div>

    )

}
export default HouseItem;
