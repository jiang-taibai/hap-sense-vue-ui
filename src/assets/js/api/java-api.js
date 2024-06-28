import axios from 'axios';
import {ApiBuilder} from "@/assets/js/api/basic.js";

const devBaseURL = 'http://localhost:8000'
const prodBaseURL = 'https://project-api.coderjiang.com/hap-sense/java-api'
const baseURL = process.env.NODE_ENV === 'production' ? prodBaseURL : devBaseURL
// const baseURL = prodBaseURL

const api = new ApiBuilder(baseURL)

const response_on_error = (err) => {
    alert('请求失败，请检查网络连接或联系管理员。错误原因：', err);
}

export const queryResidents = (queryType, queryContent, page, pageSize, callback) => {
    api.get('/resident/query', {queryType, queryContent, page, pageSize}, callback, response_on_error)
}

export const addResident = (name, identityNumber, familyNumber, inParkTime, tags, callback) => {
    api.post('/resident/add', {name, identityNumber, familyNumber, inParkTime, tags}, callback, response_on_error)
}

export const updateResident = (id, name, identityNumber, familyNumber, inParkTime, tags, callback) => {
    api.post('/resident/update', {
        id,
        name,
        identityNumber,
        familyNumber,
        inParkTime,
        tags
    }, callback, response_on_error)
}

export const deleteResident = (id, callback) => {
    api.post('/resident/delete', {id}, callback, response_on_error)
}

export const getAllStatistics = (callback) => {
    api.get('/statistics/all', {}, callback, response_on_error)
}