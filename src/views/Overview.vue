<script setup>
import WeatherWidget from "@/components/WeatherWidget.vue";
import ClockCard from "@/components/ClockCard.vue";
import StatisticsCalendar from "@/components/StatisticsCalendar.vue";
import TodayParkDataCard from "@/components/TodayParkDataCard.vue";


</script>

<template>
  <div class="container">
    <div class="title">
      <h1>XX国家公园人口数据概览</h1>
    </div>
    <div class="card-container">
      <div class="date-container">
        <clock-card/>
      </div>
      <div class="weather-container">
        <weather-widget/>
      </div>
      <div class="data-container">
        <today-park-data-card/>
      </div>
    </div>
    <statistics-calendar/>
  </div>
</template>

<style scoped>
.container {
  padding: 20px;

  .card-container {
    display: flex;
    gap: 20px;
    margin-bottom: 20px;
    height: 240px;

    .date-container {
      width: 200px;
    }

    .weather-container {
      width: 440px;
    }

  }
}

</style>