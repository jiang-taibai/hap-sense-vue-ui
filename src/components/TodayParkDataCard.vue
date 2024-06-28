<script setup>
import {NCard, NNumberAnimation, NStatistic, NSkeleton} from "naive-ui";
import {onMounted, ref, watch, watchEffect} from "vue";
import {useStatisticsStore} from "@/stores/statistics-state.js";
import {format} from "date-fns/esm";

const totalPopulation = ref(0)
const totalHousehold = ref(0)
const totalPlantingHousehold = ref(0)
const statisticsStore = useStatisticsStore()

onMounted(() => {
});
watchEffect(() => {
  const today = format(Date.now(), "yyyy-MM-dd");
  if (statisticsStore.statistics[today]) {
    const data = statisticsStore.statistics[today];
    totalPopulation.value = data.totalPopulation;
    totalHousehold.value = data.totalHousehold;
    totalPlantingHousehold.value = data.totalPlantingHousehold;
  }
})
</script>

<template>
  <n-card style="height: 100%">
    <n-statistic label="人口总人数" tabular-nums>
      <span>
        <span v-if="!statisticsStore.loaded">--,---</span>
        <n-number-animation v-else show-separator :from="0" :to="totalPopulation"/>
      </span>
      <template #suffix>人</template>
    </n-statistic>
    <n-statistic label="人口总户数" tabular-nums>
      <span>
        <span v-if="!statisticsStore.loaded">--,---</span>
        <n-number-animation v-else show-separator :from="0" :to="totalHousehold"/>
      </span>
      <template #suffix>户</template>
    </n-statistic>
    <n-statistic label="种植户总数" tabular-nums>
      <span>
        <span v-if="!statisticsStore.loaded">--,---</span>
        <n-number-animation v-else show-separator :from="0" :to="totalPlantingHousehold"/>
      </span>
      <template #suffix>户</template>
    </n-statistic>
  </n-card>
</template>

<style scoped>

</style>