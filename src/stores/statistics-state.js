import {ref} from "vue";
import {defineStore} from "pinia";

import {getAllStatistics} from "@/assets/js/api/java-api";

export const useStatisticsStore = defineStore('statistics', () => {
    const statistics = ref({})
    const loaded = ref(false)
    const loadStatistics = () => {
        if (!loaded.value) {
            new Promise((resolve, reject) => {
                getAllStatistics((res) => {
                    resolve(res.data.data)
                });
            }).then(data => {
                statistics.value = data;
                // 过滤日期小于 2020-01-01 的数据
                const minDate = new Date('2020-01-01');
                statistics.value = Object.fromEntries(
                    Object.entries(statistics.value).filter(([key, value]) => new Date(key) >= minDate)
                );
                loaded.value = true;
            })
        }
    }

    loadStatistics()

    const setDirty = () => {
        loaded.value = false;
    }

    return {
        statistics,
        loaded,
        loadStatistics,
        setDirty,
        reloadStatistics: loadStatistics
    }
})