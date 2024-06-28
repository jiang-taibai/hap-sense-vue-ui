<script setup>
import WeatherWidget from "@/components/WeatherWidget.vue";
import ClockCard from "@/components/ClockCard.vue";
import StatisticsCalendar from "@/components/StatisticsCalendar.vue";
import TodayParkDataCard from "@/components/TodayParkDataCard.vue";
import NewsCard from "@/components/NewsCard.vue";
import AdCard from "@/components/AdCard.vue";


</script>

<template>
  <div class="container">
    <div class="title">
      <h1>XX国家公园人口数据概览</h1>
    </div>
    <div class="card-container">
      <div class="ads-container">
        <ad-card style="flex: 1"/>
      </div>
      <div class="weather-container">
        <weather-widget/>
      </div>
      <div class="data-container">
        <clock-card/>
        <today-park-data-card/>
      </div>
      <div class="news-container">
        <news-card/>
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
    flex-wrap: wrap;
    gap: 20px;
    margin-bottom: 20px;
    min-height: 240px;

    .ads-container {
      width: 350px;
    }

    .weather-container {
      width: 440px;
    }

    .data-container {
      width: 200px;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .news-container {
      flex: 1;
    }

  }
}

</style>