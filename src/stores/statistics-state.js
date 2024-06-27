import {ref} from "vue";
import {defineStore} from "pinia";

import {getAllStatistics} from "@/assets/js/api/java-api";

export const useStatisticsStore = defineStore('statistics', () => {
    const statistics = ref({})
    const loaded = ref(false)
    const loadStatistics = () => {
        if (!loaded.value) {
            getAllStatistics((res) => {
                statistics.value = res.data.data;
                // 过滤日期小于 2020-01-01 的数据
                const minDate = new Date('2020-01-01');
                statistics.value = Object.fromEntries(
                    Object.entries(statistics.value).filter(([key, value]) => new Date(key) >= minDate)
                );
                loaded.value = true;
            });
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