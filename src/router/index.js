import {createRouter, createWebHistory} from 'vue-router'

const routes = [{
    path: '/',
    name: 'Overview',
    component: () => import('@/views/Overview.vue')
}, {
    path: '/history-data',
    name: 'HistoryData',
    component: () => import('@/views/HistoryData.vue')
}, {
    path: '/multi-dimensional-data',
    name: 'MultiDimensionalData',
    component: () => import('@/views/MultiDimensionalData.vue')
}, {
    path: '/change-trend-analysis',
    name: 'ChangeTrendAnalysis',
    component: () => import('@/views/ChangeTrendAnalysis.vue')
}, {
    path: '/abnormal-trend-analysis',
    name: 'AbnormalTrendAnalysis',
    component: () => import('@/views/AbnormalTrendAnalysis.vue')
}, {
    path: '/data-management',
    name: 'DataManagement',
    component: () => import('@/views/DataManagement.vue')
}, {
    path: '/technical-support',
    name: 'TechnicalSupport',
    component: () => import('@/views/TechnicalSupport.vue')
}]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

export default router
