
// 第三方库的全局变量，需要从 window 中提取出来才能在 JS 文件中使用
const { BMap, BMAP_STATUS_SUCCESS } = window;

// 导出通过百度地图获取城市的功能
export const getCityByBaiduMap = () => {
  // 把获取地图定位的业务封装成 Promise 对象
  return new Promise((resolve, reject) => {
    // 调用百度地图的浏览器定位
    const geolocation = new BMap.Geolocation();
    // 获取当前定位
    geolocation.getCurrentPosition(function (res) {
      // 成功的情况
      if (this.getStatus() == BMAP_STATUS_SUCCESS) {
        // 成功的时候返回城市名称
        resolve(res.address.city);
      }
      // 失败的情况
      else {
        // 失败的情况返回定位失败
        reject('定位失败');
      }
    });
  });
};