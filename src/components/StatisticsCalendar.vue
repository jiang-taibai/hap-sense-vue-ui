<script setup>
import {computed, onMounted, ref, watch} from "vue";
import {format} from "date-fns/esm";
import {useStatisticsStore} from "@/stores/statistics-state.js";
import {NCalendar} from "naive-ui";

const calendarDate = ref(Date.now().valueOf())
const statisticsStore = useStatisticsStore()


onMounted(() => {
});

const getCalendarDate = computed(() => {
  return (year, month, date) => {
    const formattedDate = format(new Date(year, month - 1, date), "yyyy-MM-dd");
    if (!statisticsStore.statistics[formattedDate]) {
      return '暂无数据';
    }
    const data = statisticsStore.statistics[formattedDate];
    return [
      `人口总数: ${data.totalPopulation}`,
      `人口总户数: ${data.totalHousehold}`,
      `种植户总数: ${data.totalPlantingHousehold}`
    ].join('\n');
  };
});
</script>

<template>
  <n-calendar v-model:value="calendarDate" #="{ year, month, date }">
      <span class="calendar-content">
        {{ getCalendarDate(year, month, date) }}
      </span>
  </n-calendar>
</template>

<style scoped>
.calendar-content {
  white-space: pre-wrap;
}
</style>