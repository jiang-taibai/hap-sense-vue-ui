<script setup>

import LineChartOfHistoricalStatisticalData
  from "@/components/HAPSenseECharts/LineChartOfHistoricalStatisticalData.vue";
</script>

<template>
  <div class="container">
    <div class="card">
      <line-chart-of-historical-statistical-data/>
    </div>
  </div>
</template>

<style scoped lang="less">
.container {
  padding: 20px;

  .card {
    padding: 20px;
    margin-bottom: 20px;
    border-radius: 4px;
    border: 1px solid rgb(239, 239, 245);
  }
}


</style>