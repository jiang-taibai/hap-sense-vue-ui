<script setup>
import * as echarts from 'echarts';
import {onMounted, ref, toRaw, unref, watch} from "vue";
import {getPredictiveStatistics} from "@/assets/js/api/python-api.js";
import {DateUtils} from "@/assets/js/utils.js";
import {useStatisticsStore} from "@/stores/statistics-state.js";
import {addDays} from "date-fns";


const statisticsStore = useStatisticsStore()
let chart = null;
const historyDataChartElement = ref(null)


const initLineChart = (statistics, predictedStatistics) => {
  statistics = JSON.parse(JSON.stringify(statistics))
  let xAxisData = [];
  let seriesData = [];
  let historicalDays = Object.keys(statistics).length
  if (historicalDays > 0) {
    const minDate = addDays(new Date(), -101)
    const maxDate = addDays(new Date(), -1)
    minDate.setHours(0, 0, 0, 0);
    maxDate.setHours(0, 0, 0, 0);
    statistics = Object.fromEntries(
        Object.entries(statistics).filter(([key, value]) => {
          const date = new Date(key);
          return date >= minDate && date <= maxDate;
        })
    )
    xAxisData = Object.keys(statistics).sort();
    seriesData = Object.values(statistics).sort((a, b) => a.date > b.date);
    historicalDays = 100
  }
  const predictedSeriesData = {
    totalPopulation: Array(historicalDays).fill(null),
    totalHouseholds: Array(historicalDays).fill(null),
    totalPlantingHouseholds: Array(historicalDays).fill(null),
  }
  let predictiveDays = 0;
  if (predictedStatistics) {
    predictiveDays = predictedStatistics.length
    // 向后扩展 predictiveDays 天的数据
    DateUtils.getDaysAfterToday(predictiveDays).forEach((date) => {
      xAxisData.push(date);
    })
    // 需要修改最后一个数据为seriesData的最后一个数据，这样数据可视化线条才可以连接起来
    predictedSeriesData.totalPopulation[historicalDays - 1] = seriesData[historicalDays - 1].totalPopulation;
    predictedSeriesData.totalHouseholds[historicalDays - 1] = seriesData[historicalDays - 1].totalHousehold;
    predictedSeriesData.totalPlantingHouseholds[historicalDays - 1] = seriesData[historicalDays - 1].totalPlantingHousehold;
    predictedStatistics.forEach((statistic, index) => {
      predictedSeriesData.totalPopulation.push(statistic[0]);
      predictedSeriesData.totalHouseholds.push(statistic[1]);
      predictedSeriesData.totalPlantingHouseholds.push(statistic[2]);
    })
  }
  if (chart == null) {
    chart = echarts.init(historyDataChartElement.value, null, {renderer: 'svg', locale: 'ZH'});
  }
  const option = {
    title: {
      text: 'XX国家公园人口数据趋势分析图',
      subtext: '',
      left: 'center'
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        animation: true
      },
      formatter: function (params) {
        let result = params[0].axisValue + '<br/>';  // 显示类目轴的值
        params.forEach((param) => {
          // 检查数据系列和数据索引来决定是否显示这个点的信息
          if (param.seriesIndex >= 3 && param.dataIndex < historicalDays) {
            // 不显示前5个数据点的信息
          } else {
            // 显示其他数据点的信息
            result += param.marker + param.seriesName + ': ' + param.value + '<br/>';
          }
        });
        return result;
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
      data: xAxisData
    },
    yAxis: {gridIndex: 0},
    series: [
      {
        name: '人口总人数',
        type: 'line',
        smooth: true,
        seriesLayoutBy: 'row',
        data: seriesData.map(item => item.totalPopulation),
        showSymbol: false,
      },
      {
        name: '人口总户数',
        type: 'line',
        smooth: true,
        seriesLayoutBy: 'row',
        data: seriesData.map(item => item.totalHousehold),
        showSymbol: false,
      },
      {
        name: '种植户总户数',
        type: 'line',
        smooth: true,
        seriesLayoutBy: 'row',
        data: seriesData.map(item => item.totalPlantingHousehold),
        showSymbol: false,
      },
      {
        name: '人口总人数',
        type: 'line',
        smooth: true,
        seriesLayoutBy: 'row',
        data: predictedSeriesData.totalPopulation,
        lineStyle: {
          type: 'dashed'
        },
        showSymbol: false,
      },
      {
        name: '人口总户数',
        type: 'line',
        smooth: true,
        seriesLayoutBy: 'row',
        data: predictedSeriesData.totalHouseholds,
        lineStyle: {
          type: 'dashed'
        },
        showSymbol: false,
      },
      {
        name: '种植户总户数',
        type: 'line',
        smooth: true,
        seriesLayoutBy: 'row',
        data: predictedSeriesData.totalPlantingHouseholds,
        lineStyle: {
          type: 'dashed'
        },
        showSymbol: false,
      }
    ]
  };
  chart.setOption(option);
  if (statisticsStore.loaded) {
    chart.hideLoading()
  } else {
    chart.showLoading()
  }
}

onMounted(() => {
  initLineChart(statisticsStore.statistics);
  getPredictiveStatistics((response) => {
    initLineChart(statisticsStore.statistics, response.data.data);
  })
})
watch(() => statisticsStore.statistics, (statistics) => {
  initLineChart(statistics);
})
watch(() => statisticsStore.loaded, (loaded) => {
  if (loaded) {
    chart.hideLoading()
  } else {
    chart.showLoading()
  }
})
</script>

<template>
  <div class="container">
    <div class="card">
      <div ref="historyDataChartElement" style="width: 100%; height: 600px;"></div>
    </div>
  </div>
</template>

<style scoped lang="less">
.container {
  padding: 20px;

  .card {
    padding: 20px 40px;
    margin-bottom: 20px;
    border-radius: 4px;
    max-width: 1200px;
    border: 1px solid rgb(239, 239, 245);
  }
}


</style>