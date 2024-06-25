<script setup>
import {
  NLayout,
  NLayoutSider,
  NMenu,
  NScrollbar
} from "naive-ui";
import {h, ref} from "vue";
import {defineProps} from 'vue';
import {RouterLink} from "vue-router";

const props = defineProps({});

const collapsed = ref(false)
const activeKey = ref('overview')
const menuOptions = [{
  label: "概览",
  key: "overview",
  name: "Overview",
  icon: null,
}, {
  label: "数据监控",
  key: "data-monitor",
  icon: null,
  children: [{
    label: "历史数据",
    key: "history-data",
    name: "HistoryData",
    icon: null,
  }, {
    label: "多维数据",
    key: "multi-dimensional-data",
    name: "MultiDimensionalData",
    icon: null,
  }]
}, {
  label: "态势感知",
  key: "situation-awareness",
  icon: null,
  children: [{
    label: "变化趋势分析",
    key: "change-trend-analysis",
    name: "ChangeTrendAnalysis",
    icon: null,
  }, {
    label: "异常趋势分析",
    key: "abnormal-trend-analysis",
    name: "AbnormalTrendAnalysis",
    icon: null,
  }]
}, {
  label: "数据面板",
  key: "data-panel",
  icon: null,
  children: [{
    label: "数据管理",
    key: "data-management",
    name: "DataManagement",
    icon: null,
  }]
}, {
  label: "技术支持",
  key: "technical-support",
  name: "TechnicalSupport",
  icon: null,
}]
const renderMenuLabel = (option) => {
  if ("name" in option) {
    return h(RouterLink,
        {
          to: {
            name: option.name,
          }
        },
        {default: () => option.label})
  }
  return option.label
}
</script>

<template>
  <n-layout has-sider>
    <n-layout-sider
        bordered
        collapse-mode="width"
        :collapsed-width="64"
        :width="240"
        :collapsed="collapsed"
        show-trigger
        @collapse="collapsed = true"
        @expand="collapsed = false"
    >
      <n-menu v-model:value="activeKey"
              :collapsed="collapsed"
              :collapsed-width="64"
              :collapsed-icon-size="22"
              :render-label="renderMenuLabel"
              :options="menuOptions"/>
    </n-layout-sider>
    <n-layout>
      <n-scrollbar style="height: 100vh">
        <router-view/>
      </n-scrollbar>
    </n-layout>
  </n-layout>
</template>

<style scoped>

</style>
