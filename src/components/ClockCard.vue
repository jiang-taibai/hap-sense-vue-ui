<script setup>

import {ref} from "vue";
import {format} from "date-fns/esm";
import {NCard} from "naive-ui";

const time = ref(format(Date.now(), "HH:mm:ss"))
setInterval(() => {
  time.value = format(Date.now(), "HH:mm:ss")
}, 1000)
</script>

<template>
  <n-card>
    <div class="time">{{ time }}</div>
    <div class="date">{{ format(Date.now(), "yyyy-MM-dd") }}</div>
  </n-card>
</template>

<style scoped>
.time {
  font-size: 24px;
}
</style>