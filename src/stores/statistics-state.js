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
                const maxDate = new Date();
                statistics.value = filterDates(minDate, maxDate);
                loaded.value = true;
            })
        }
    }

    const filterDates = (minDate, maxDate) => {
        minDate.setHours(0, 0, 0, 0);
        // 错误原因在于 new Date(‘yyyy-MM-dd') 会返回一个 0 时区的时间，对应中国也就是 8 点
        // 如果用户在 0点到8点之前 访问系统和 8 点之后访问系统，两次的结果是不一样的！
        maxDate.setHours(23, 59, 59, 999);
        return Object.fromEntries(
            Object.entries(statistics.value).filter(([key, value]) => {
                const date = new Date(key);
                return date >= minDate && date <= maxDate;
            })
        );
    }

    loadStatistics()

    const setDirty = () => {
        loaded.value = false;
        loadStatistics()
    }

    return {
        statistics,
        loaded,
        loadStatistics,
        setDirty,
        reloadStatistics: loadStatistics,
    }
})