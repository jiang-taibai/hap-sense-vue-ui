<script setup>
import {updateWidget} from "@/assets/js/lib/weather.js";
import {NSkeleton} from "naive-ui";
import {onMounted, ref} from "vue";

const loadingWeather = ref(true)
const id = 'ww_cf434a6e96ca9'

onMounted(() => {
  updateWidget(id, 0);
  const weatherWidget = document.getElementById(id)
  // 监听当 weatherWidget 不止有一个子节点时，说明加载完成
  const observer = new MutationObserver(() => {
    if (weatherWidget.children.length > 1) {
      loadingWeather.value = false
    }
  })
  observer.observe(weatherWidget, {childList: true})
})
</script>

<template>
  <div>
    <div v-show="loadingWeather">
      <n-skeleton text :repeat="9"/>
      <n-skeleton text style="width: 60%"/>
    </div>
    <div v-show="!loadingWeather" :id="id" v='1.3' loc='id'
         style="height: 100%"
         a='{"t":"horizontal","lang":"zh","sl_lpl":1,"ids":[],"font":"Times","sl_ics":"one_a","sl_sot":"celsius","cl_bkg":"image","cl_font":"#FFFFFF","cl_cloud":"#FFFFFF","cl_persp":"#81D4FA","cl_sun":"#FFC107","cl_moon":"#FFC107","cl_thund":"#FF5722"}'>
      <a href="https://weatherwidget.org/" :id="id + '_u'" target="_blank">Free weather widget for
        website</a>
    </div>
  </div>
</template>

<style scoped>

</style>