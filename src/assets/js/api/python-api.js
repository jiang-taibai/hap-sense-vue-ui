import {ApiBuilder} from "@/assets/js/api/basic.js";

const devBaseURL = 'http://localhost:8100'
const prodBaseURL = 'https://project-api.coderjiang.com/hap-sense/python-api'
const baseURL = process.env.NODE_ENV === 'production' ? prodBaseURL : devBaseURL

const api = new ApiBuilder(baseURL)

const response_on_error = (err) => {
    alert('请求失败，请检查网络连接或联系管理员。错误原因：' + err.message);
}

export const getPredictiveStatistics = (callback) => {
    api.get('/predictive-statistics', {}, callback, response_on_error)
}