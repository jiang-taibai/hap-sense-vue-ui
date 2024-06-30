<script setup>
import * as echarts from 'echarts';
import {onMounted, ref, watch} from "vue";
import {useStatisticsStore} from "@/stores/statistics-state.js";

const statisticsStore = useStatisticsStore()

let chart = null;
const historyDataChartElement = ref(null)
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
  const seriesData = Object.values(statistics).sort((a, b) => a.date > b.date);
  const myChart = echarts.init(historyDataChartElement.value, null, {renderer: 'svg', locale: 'ZH'});
  const option = {
    title: {
      text: 'XX国家公园人口数据折线图',
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
        name: '人口总人数',
        type: 'line',
        smooth: true,
        seriesLayoutBy: 'row',
        data: seriesData.map(item => item.totalPopulation)
      },
      {
        name: '人口总户数',
        type: 'line',
        smooth: true,
        seriesLayoutBy: 'row',
        data: seriesData.map(item => item.totalHousehold)
      },
      {
        name: '种植户总户数',
        type: 'line',
        smooth: true,
        seriesLayoutBy: 'row',
        data: seriesData.map(item => item.totalPlantingHousehold)
      }
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
  <div ref="historyDataChartElement" style="width: 100%; height: 600px;"></div>
</template>

<style scoped>

</style>