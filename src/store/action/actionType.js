// 就是用来管理 action.type 的字符串

// 把字符串保存为变量，方便在其他JS文件中直接使用变量名
export const CART_ADD = "CART_ADD"
export const CART_LESS = "CART_LESS"

export const USER_LOGIN = "USER_LOGIN"
export const USER_OUT = "USER_OUT"

export const GET_CITY = 'GET_CITY';

// 通过 export default 导出一个对象也可以
// const CART_ADD = 'CART_ADD';
// const CART_LESS = 'CART_LESS';
// export default { CART_ADD, CART_LESS };
