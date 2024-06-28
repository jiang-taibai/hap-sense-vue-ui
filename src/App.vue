<script setup>
import {NConfigProvider} from 'naive-ui'
import {zhCN, dateZhCN} from 'naive-ui'
import MainPage from "@/components/MainPage.vue";

  /**
   * js 文件下使用这个做类型提示
   * @type import('naive-ui').GlobalThemeOverrides
   */
  const themeOverrides = {}
</script>

<template>
  <n-config-provider :locale="zhCN" :date-locale="dateZhCN" :theme-overrides="themeOverrides">
    <main-page/>
  </n-config-provider>
</template>

<style scoped>

</style>
