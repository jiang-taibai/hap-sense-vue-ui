import {createRouter, createWebHashHistory} from 'vue-router'

// 懒加载所有路由组件
const Overview = () => import('@/views/Overview.vue');
const HistoryData = () => import('@/views/HistoryData.vue');
const MultiDimensionalData = () => import('@/views/MultiDimensionalData.vue');
const ChangeTrendAnalysis = () => import('@/views/ChangeTrendAnalysis.vue');
const AbnormalTrendAnalysis = () => import('@/views/AbnormalTrendAnalysis.vue');
const DataManagement = () => import('@/views/DataManagement.vue');
const TechnicalSupport = () => import('@/views/TechnicalSupport.vue');

// 定义路由数组
export const routes = [{
    path: '/',
    name: 'Overview',
    component: Overview
}, {
    path: '/history-data',
    name: 'HistoryData',
    component: HistoryData
}, {
    path: '/multi-dimensional-data',
    name: 'MultiDimensionalData',
    component: MultiDimensionalData
}, {
    path: '/change-trend-analysis',
    name: 'ChangeTrendAnalysis',
    component: ChangeTrendAnalysis
}, {
    path: '/abnormal-trend-analysis',
    name: 'AbnormalTrendAnalysis',
    component: AbnormalTrendAnalysis
}, {
    path: '/data-management',
    name: 'DataManagement',
    component: DataManagement
}, {
    path: '/technical-support',
    name: 'TechnicalSupport',
    component: TechnicalSupport
}];

// 创建路由器实例
const router = createRouter({
    history: createWebHashHistory(),
    routes
});

export default router;
