<script setup>
import * as echarts from 'echarts';
import {onMounted, ref, watch} from "vue";
import {
  NDatePicker,
  NButton,
} from "naive-ui";
import {useStatisticsStore} from "@/stores/statistics-state.js";

const statisticsStore = useStatisticsStore()

const dateRange = ref([1577808000000, Date.now()]);
const historyDataChartElement = ref(null)
onMounted(() => {
  initLineChart(statisticsStore.statistics);
});

const initLineChart = (statistics) => {
  // statistics={'2024-06-26': {date: '2024-06-26', 'totalPopulation': 100, 'totalHousehold': 10, 'totalPlantingHousehold': 5}, ...}
  const xAxisData = Object.keys(statistics).sort();
  const seriesData = Object.values(statistics).sort((a, b) => a.date - b.date);

  const myChart = echarts.init(historyDataChartElement.value);
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
}

watch(() => statisticsStore.statistics, (statistics) => {
  initLineChart(statistics);
})
</script>

<template>
  <div class="container">
<!--    <div class="date-picker-container">-->
<!--      <span>日期选择：</span>-->
<!--      <n-date-picker v-model:value="dateRange" type="daterange" clearable/>-->
<!--      <n-button>确认</n-button>-->
<!--    </div>-->
    <div class="card">
      <div ref="historyDataChartElement" style="width: 100%; height: 600px;"></div>
    </div>
  </div>
</template>

<style scoped lang="less">
.container {
  padding: 20px;

  .date-picker-container {
    max-width: 800px;
    display: flex;
    gap: 10px;
    align-items: center;
    margin-bottom: 20px;
  }
}

.card {
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 4px;
  border: 1px solid rgb(239, 239, 245);
}
</style>