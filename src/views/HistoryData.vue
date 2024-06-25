<script setup>
import * as echarts from 'echarts';
import {onMounted, ref} from "vue";
import {
  NDatePicker,
  NButton,
} from "naive-ui";

const dateRange = ref([1577808000000, Date.now()]);
const historyDataChartElement = ref(null)
onMounted(() => {
  initLineChart();
});

const initLineChart = () => {
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
      data: ['2018', '2019', '2020', '2021', '2022', '2023', '2024']
    },
    yAxis: {gridIndex: 0},
    series: [
      {
        name: '人口总人数',
        type: 'line',
        smooth: true,
        seriesLayoutBy: 'row',
        data: [3600, 1932, 2901, 3934, 6290, 7330, 8320]
      },
      {
        name: '人口总户数',
        type: 'line',
        smooth: true,
        seriesLayoutBy: 'row',
        data: [820, 932, 901, 934, 1290, 1330, 1320]
      },
      {
        name: '种植户总户数',
        type: 'line',
        smooth: true,
        seriesLayoutBy: 'row',
        data: [300, 332, 301, 434, 590, 530, 620]
      }
    ]
  };
  myChart.setOption(option);
}
</script>

<template>
  <div class="container">
    <div class="date-picker-container">
      <span>日期选择：</span>
      <n-date-picker v-model:value="dateRange" type="daterange" clearable/>
      <n-button>确认</n-button>
    </div>
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
  padding: 20px 40px;
  margin-bottom: 20px;
  border-radius: 4px;
  max-width: 800px;
  border: 1px solid rgb(239, 239, 245);
}
</style>