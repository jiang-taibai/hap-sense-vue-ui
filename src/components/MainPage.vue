<script setup>
import {
  NLayout, NLayoutSider, NMenu,
  NScrollbar, NDialogProvider,
  NNotificationProvider, NIcon,
} from "naive-ui";
import {h, onMounted, ref} from "vue";
import {RouterLink} from "vue-router";
import {currentRouterName} from "@/assets/js/utils.js"
import Icon from "@/components/Icon.vue";

const menuInstRef = ref(null)
const collapsed = ref(false)
const activeKey = ref('Overview')

const renderIcon = (iconName) => {
  const size = 20
  return () => h(NIcon, {size: `${size}`}, {
    default: () => h(Icon, {name: iconName, size: `${size}`})
  })
}
const menuOptions = [{
  label: "概览",
  key: "Overview",
  name: "Overview",
  icon: renderIcon("home"),
}, {
  label: "数据监控",
  key: "DataMonitor",
  icon: renderIcon("data-monitor"),
  children: [{
    label: "历史数据",
    key: "HistoryData",
    name: "HistoryData",
    icon: renderIcon("history-data"),
  }, {
    label: "多维数据",
    key: "MultiDimensionalData",
    name: "MultiDimensionalData",
    icon: renderIcon("multi-dimensional-data"),
  }]
}, {
  label: "态势感知",
  key: "SituationAwareness",
  icon: renderIcon("situation-awareness"),
  children: [{
    label: "变化趋势分析",
    key: "ChangeTrendAnalysis",
    name: "ChangeTrendAnalysis",
    icon: renderIcon("change-trend-analysis"),
  }, {
    label: "异常趋势分析",
    key: "AbnormalTrendAnalysis",
    name: "AbnormalTrendAnalysis",
    icon: renderIcon("abnormal-trend-analysis"),
  }]
}, {
  label: "数据面板",
  key: "DataPanel",
  icon: renderIcon("data-panel"),
  children: [{
    label: "数据管理",
    key: "DataManagement",
    name: "DataManagement",
    icon: renderIcon("data-management"),
  }]
}, {
  label: "技术支持",
  key: "TechnicalSupport",
  name: "TechnicalSupport",
  icon: renderIcon("technical-support"),
}]
const renderMenuLabel = (option) => {
  if ("name" in option) {
    return h(RouterLink,
        {
          to: {
            name: option.name,
          },
          prefetch: true,
        },
        {default: () => option.label})
  }
  return option.label
}
onMounted(() => {
  activeKey.value = currentRouterName();
  menuInstRef.value?.showOption(activeKey.value);
})
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
      <n-menu ref="menuInstRef"
              v-model:value="activeKey"
              :collapsed="collapsed"
              :collapsed-width="64"
              :collapsed-icon-size="22"
              :render-label="renderMenuLabel"
              :options="menuOptions"/>
    </n-layout-sider>
    <n-layout>
      <n-notification-provider>
        <n-dialog-provider>
          <n-scrollbar style="height: 100vh;">
            <router-view/>
          </n-scrollbar>
        </n-dialog-provider>
      </n-notification-provider>
    </n-layout>
  </n-layout>
</template>

<style scoped>

</style>
