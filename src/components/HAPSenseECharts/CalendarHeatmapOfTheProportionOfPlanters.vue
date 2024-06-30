<script setup>

import * as echarts from 'echarts';
import {ref, onMounted, watch} from "vue";
import {useStatisticsStore} from "@/stores/statistics-state.js";

const statisticsStore = useStatisticsStore()

onMounted(() => {
  render(statisticsStore.statistics);
});

watch(() => statisticsStore.statistics, (statistics) => {
  render(statistics);
})
watch(() => statisticsStore.loaded, (loaded) => {
  if (!chartIns) return
  if (loaded) {
    chartIns.hideLoading()
  } else {
    chartIns.showLoading()
  }
})

const chartEle = ref(null)
let chartIns = null;

const render = (statistics) => {

  let minRatio = 100
  let maxRatio = 0;

  function getData(year) {
    // 选择 statistics 中，所有 year 开头的 key，然后按照日期排序
    const filteredStatistics = Object.values(statistics)
        .filter(item => item.date.startsWith(year))
        .sort((a, b) => a.date > b.date);
    return filteredStatistics.map(item => {
      const ratio = item.totalPlantingHousehold / item.totalHousehold * 100;
      minRatio = Math.min(minRatio, ratio);
      maxRatio = Math.max(maxRatio, ratio);
      return [item.date, ratio];
    });
  }


  if (chartIns == null) {
    chartIns = echarts.init(chartEle.value, null, {locale: 'ZH'});
  }
  const option = {
    title: {
      text: 'XX国家公园种植户比例热力图',
      subtext: '',
      left: 'center'
    },
    tooltip: {
      position: 'top'
    },
    visualMap: {
      min: 0,
      max: 1000,
      calculable: true,
      orient: 'horizontal',
      left: 'right',
      top: 'top'
    },
    calendar: [],
    series: []
  };
  const years = ['2020', '2021', '2022', '2023', '2024']
  for (let i = 0; i < years.length; ++i) {
    const year = years[i]
    option.calendar.push({
      range: year,
      cellSize: ['auto', 20],
      top: 200 * i + 100,
    })
    option.series.push({
      type: 'heatmap',
      coordinateSystem: 'calendar',
      calendarIndex: i,
      data: getData(year)
    })
  }
  option.visualMap.min = minRatio;
  option.visualMap.max = maxRatio;
  chartIns.setOption(option);
}
</script>

<template>
  <div ref="chartEle"></div>
</template>

<style scoped>

</style>