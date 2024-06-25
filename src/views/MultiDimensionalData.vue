<script setup>
import * as echarts from 'echarts';
import {onMounted, ref} from "vue";
import {
  NDatePicker,
  NButton,
} from "naive-ui";

const dateRange = ref([1577808000000, Date.now()]);
const BarChartOfTheProportionOfHouseholdsElement = ref(null)
onMounted(() => {
  initBarChartOfTheProportionOfHouseholds();
});

const initBarChartOfTheProportionOfHouseholds = () => {
  const myChart = echarts.init(BarChartOfTheProportionOfHouseholdsElement.value);
  let option;
  const rawData = [
    [100, 302, 301, 334, 390, 330, 320],
    [820, 832, 901, 934, 1290, 1330, 1320]
  ];
  const totalData = [];
  for (let i = 0; i < rawData[0].length; ++i) {
    let sum = 0;
    for (let j = 0; j < rawData.length; ++j) {
      sum += rawData[j][i];
    }
    totalData.push(sum);
  }
  const grid = {
    left: 100,
    right: 100,
    top: 50,
    bottom: 50
  };
  const gridWidth = myChart.getWidth() - grid.left - grid.right;
  const gridHeight = myChart.getHeight() - grid.top - grid.bottom;
  const categoryWidth = gridWidth / rawData[0].length;
  const barWidth = categoryWidth * 0.6;
  const barPadding = (categoryWidth - barWidth) / 2;
  const series = [
    '种植户户数',
    '人口总户数',
  ].map((name, sid) => {
    return {
      name,
      type: 'bar',
      stack: 'total',
      barWidth: '60%',
      label: {
        show: true,
        formatter: (params) => Math.round(params.value * 1000) / 10 + '%'
      },
      data: rawData[sid].map((d, did) =>
          totalData[did] <= 0 ? 0 : d / totalData[did]
      )
    };
  });
  const color = ['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de'];
  const elements = [];
  for (let j = 1, jlen = rawData[0].length; j < jlen; ++j) {
    const leftX = grid.left + categoryWidth * j - barPadding;
    const rightX = leftX + barPadding * 2;
    let leftY = grid.top + gridHeight;
    let rightY = leftY;
    for (let i = 0, len = series.length; i < len; ++i) {
      const points = [];
      const leftBarHeight = (rawData[i][j - 1] / totalData[j - 1]) * gridHeight;
      points.push([leftX, leftY]);
      points.push([leftX, leftY - leftBarHeight]);
      const rightBarHeight = (rawData[i][j] / totalData[j]) * gridHeight;
      points.push([rightX, rightY - rightBarHeight]);
      points.push([rightX, rightY]);
      points.push([leftX, leftY]);
      leftY -= leftBarHeight;
      rightY -= rightBarHeight;
      elements.push({
        type: 'polygon',
        shape: {
          points
        },
        style: {
          fill: color[i],
          opacity: 0.25
        }
      });
    }
  }
  option = {
    title: {
      text: 'XX国家公园人口户数占比柱状图',
      subtext: '',
      left: 'center'
    },
    legend: {
      selectedMode: false,
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
    grid,
    yAxis: {
      type: 'value'
    },
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    series,
    graphic: {
      elements
    }
  };
  myChart.setOption(option)
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
      <div ref="BarChartOfTheProportionOfHouseholdsElement" style="width: 100%; height: 600px;"></div>
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