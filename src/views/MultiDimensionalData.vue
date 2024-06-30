<script setup>
import CalendarHeatmapOfTheProportionOfPlanters
  from "@/components/HAPSenseECharts/CalendarHeatmapOfTheProportionOfPlanters.vue";
import LineChartOfTheProportionOfPlanters from "@/components/HAPSenseECharts/LineChartOfTheProportionOfPlanters.vue";


</script>

<template>
  <div class="container">
    <div class="card">
      <line-chart-of-the-proportion-of-planters/>
    </div>
    <div class="card">
      <calendar-heatmap-of-the-proportion-of-planters style="width: 100%; height: 1100px"/>
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