import {ApiBuilder} from "@/assets/js/api/basic.js";

const hotSearchApi = new ApiBuilder('https://api.pearktrue.cn')

const response_on_error = (err) => {
    alert('请求失败，请检查网络连接或联系管理员。错误原因：', err);
}

export const getHotSearch = (callback) => {
    hotSearchApi.get('/api/dailyhot', {title:"微博"}, callback, response_on_error)
}