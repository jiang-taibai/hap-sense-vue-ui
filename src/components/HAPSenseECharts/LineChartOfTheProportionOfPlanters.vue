<script setup>
import * as echarts from 'echarts';
import {onMounted, ref, watch} from "vue";
import {useStatisticsStore} from "@/stores/statistics-state.js";

const statisticsStore = useStatisticsStore()

let chart = null;
const chartEle = ref(null)
onMounted(() => {
  initLineChart(statisticsStore.statistics);
});

watch(() => statisticsStore.statistics, (statistics) => {
  initLineChart(statistics);
})
watch(() => statisticsStore.loaded, (loaded) => {
  if (!chart) return
  if (loaded) {
    chart.hideLoading()
  } else {
    chart.showLoading()
  }
})

const initLineChart = (statistics) => {
  // statistics={'2024-06-26': {date: '2024-06-26', 'totalPopulation': 100, 'totalHousehold': 10, 'totalPlantingHousehold': 5}, ...}
  const xAxisData = Object.keys(statistics).sort();
  const seriesData = xAxisData.map(date => statistics[date]).map(item => item.totalPlantingHousehold / item.totalHousehold);
  const myChart = echarts.init(chartEle.value, null, {renderer: 'svg', locale: 'ZH'});
  const option = {
    title: {
      text: 'XX国家公园种植户比例折线图',
      subtext: '',
      left: 'center'
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        animation: true
      },
    },
    toolbox: {
      show: true,
      feature: {
        dataZoom: {
          yAxisIndex: 'none'
        },
        dataView: {readOnly: true},
        restore: {},
        saveAsImage: {}
      }
    },
    grid: {},
    legend: {
      orient: 'horizontal',
      left: 'center',
      top: '25',
    },
    dataZoom: [
      {
        show: true,
        realtime: true,
        start: 0,
        end: 100,
        xAxisIndex: [0, 1]
      },
      {
        type: 'inside',
        realtime: true,
        start: 0,
        end: 100,
        xAxisIndex: [0, 1]
      }
    ],
    xAxis: {
      type: 'category',
      data: xAxisData,
    },
    yAxis: {gridIndex: 0},
    series: [
      {
        name: '种植户比例',
        type: 'line',
        smooth: true,
        seriesLayoutBy: 'row',
        data: seriesData
      },
    ]
  };
  myChart.setOption(option);
  if (statisticsStore.loaded) {
    myChart.hideLoading()
  } else {
    myChart.showLoading()
  }
  chart = myChart;
  return myChart;
}

</script>

<template>
  <div ref="chartEle" style="width: 100%; height: 600px;"></div>
</template>

<style scoped>

</style>