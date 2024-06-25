<script setup>
import {onMounted, ref} from "vue";
import {format} from "date-fns/esm";
import {
  NCalendar,
  NCard,
  NStatistic,
  NNumberAnimation,
} from "naive-ui";
import WeatherWidget from "@/components/WeatherWidget.vue";

const calendarDate = ref(Date.now().valueOf())
const getCalendarDate = (year, month, date) => {
  return [`人口总数: ${year}`, `人口总户数: ${month}`, `种植户总户数: ${date}`].join('\n')
}
const time = ref('')
setInterval(() => {
  time.value = format(Date.now(), "HH:mm:ss")
}, 1000)

</script>

<template>
  <div class="container">
    <div class="title">
      <h1>XX国家公园人口数据概览</h1>
    </div>
    <div class="card-container">
      <div class="date-container">
        <n-card>
          <div class="time">{{ time }}</div>
          <div class="date">{{ format(Date.now(), "yyyy-MM-dd") }}</div>
        </n-card>
      </div>
      <div class="weather-container">
        <weather-widget/>
      </div>
      <div class="data-container">
        <n-card>
          <n-statistic label="人口总人数" tabular-nums>
            <n-number-animation show-separator :from="0" :to="5201314"/>
            <template #suffix>人</template>
          </n-statistic>
          <n-statistic label="人口总户数" tabular-nums>
            <n-number-animation show-separator :from="0" :to="201314"/>
            <template #suffix>户</template>
          </n-statistic>
          <n-statistic label="种植户总数" tabular-nums>
            <n-number-animation show-separator :from="0" :to="1314"/>
            <template #suffix>户</template>
          </n-statistic>
        </n-card>
      </div>
    </div>
    <n-calendar v-model:value="calendarDate" #="{ year, month, date }">
      <span class="calendar-content">
        {{ getCalendarDate(year, month, date) }}
      </span>
    </n-calendar>
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

      .time {
        font-size: 24px;
      }
    }

    .weather-container {
      width: 440px;
    }

  }

  .calendar-content {
    white-space: pre-wrap;
  }
}

</style>