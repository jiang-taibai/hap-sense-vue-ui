<script setup>
import Markdown from 'vue3-markdown-it';
import {
  NCard, NButton,
} from 'naive-ui';

const markdownText = `
# 1. 项目背景

我省拥有三江源、祁连山、青海湖等国家公园，目前，基本形成了以国家公园为主体的新型自然保护的体系，每年都采集了大量的针对相关区域的数据，例如林地、草地、湿地以及相关冰川、保护物种等的数据，如何基于这些数据形成对国家公园的数据分析及预测，有效保障人与自然的平衡发展，是当前生态大数据分析以及人工智能应用技术的一个重点方向。我公司基于以上思考，研发了国家公园态势感知系统，利用大数据、云计算、机器学习等前沿技术，激活每年沉淀的调查数据，实现国家公园的宏观态势感知。

需解决的主要技术难题

1. 海量数据的存储：要全面实现国家森林公园的态势感知，需从多个空间、时间维度获取相关的数据，为此需要研究大量数据的归类、统计方法，形成科学合理、完整的数据库。
2. 模型建设：本系统需要将机器学习、神经网络以及各种生态模型进行整合，实现国家公园态势评价以及关键点的分析、预警，为此需要结合数据库建设、数据分析技术及信息系统开发技术，完成相关模型的建设和训练。

# 2. 项目目标

本子项目的目标是实现国家公园的态势感知，实现基于公园的人口总户数、总人数及种植户的户数及人数变化情况，建立公园的人类活动态势感知模型，实现对公园的人类活动态势的实时监测、分析、预警。
同时实现一套功能完善的数据管理面板，实现对公园的人口数据、种植户数据、人类活动数据的管理、分析、展示等功能。

# 3. 技术架构

## 3.1 基础架构

本项目使用了以下技术：

| 前端         | 说明    | 后端           | 说明    | 人工智能      | 说明     | 运维     | 说明       |
|------------|-------|--------------|-------|-----------|--------|--------|----------|
| \`Vue3\`     | 前端框架  | \`SpringBoot\` | 后端框架  | \`PyTorch\` | 深度学习框架 | NGINX  | HTTP服务器  |
| \`Vite2\`    | 构建工具  | \`TK-MyBatis\` | ORM框架 | \`Flask\`   | 异步网络框架 | Tomcat | Web应用服务器 |
| \`Naive UI\` | UI组件库 | \`MySQL\`      | 数据库   |           |        |        |          |
| \`ECharts\`  | 数据可视化 |              |       |           |        |        |          |
| \`Axios\`    | 网络请求  |              |       |           |        |        |          |
| \`Pinia\`    | 状态管理  |              |       |           |        |        |          |

## 3.2 核心技术

1. 基于时间序列分析GRU模型的人口预测模型: 使用时间序列分析模型，对人口数、户数等数据进行预测。
2. 基于变点检测模型的人口数量预警模型: 使用变点检测模型，对人口数、户数等数据的变化进行检测，实现对异常波动的监控。
3. 差分数组算法: 使用差分数组算法实现数据统计的高效计算，在数据量大的情况下，能够保持 O(n) 的时间复杂度。

# 4. 资料

- [焦点访谈：住在国家公园里的人们 - 央视网](https://news.cctv.com/2021/05/27/ARTICSH5SyXlKHTDZTrnhbuJ210527.shtml)
- [National Park population estimates](https://www.ons.gov.uk/peoplepopulationandcommunity/populationandmigration/populationestimates/datasets/nationalparkmidyearpopulationestimatesexperimental)
- [National Park Population Estimates (experimental) ](https://www.data.gov.uk/dataset/ac92a0d6-89fb-4e43-92d9-820a1e9ab296/national-park-population-estimates-experimental)
- [Resident population of national parks in England and Wales in 2011 and 2021, by park](https://www.statista.com/statistics/1405883/national-parks-residents-england-wales/)
- [National Park, NJ Population by Year](https://www.neilsberg.com/insights/national-park-nj-population-by-year/)
- [National Park population estimates (experimental): Reference tables](https://cy.ons.gov.uk/peoplepopulationandcommunity/populationandmigration/populationestimates/datasets/nationalparkpopulationestimatesexperimentalreferencetables)

`

const openLink = (url) => {
  window.open(url, '_blank');
}
</script>

<template>
  <div class="container">
    <div class="markdown-container">
      <markdown source='#'/>
    </div>
    <div class="aosp-container">
      <n-card hoverable :bordered="false" class="title-card">
        <div style="display: flex; justify-content: center;align-items: center; height: 100%; width: 100%">
          <div style="line-height: 100%; font-size: 100px;">🎉</div>
        </div>
      </n-card>
      <n-card title="HAP Sense Vue UI" hoverable :bordered="false" class="aosp-card">
        使用 Vue3 + Vite2 + Naive UI 等框架构建的 HAP Sense Vue UI，提供了数据监控、态势感知、数据面板等友好的人机交互界面。
        <template #header-extra>
          <n-button type="primary" @click="openLink('https://github.com/jiang-taibai/hap-sense-vue-ui')">GitHub
          </n-button>
        </template>
      </n-card>
      <n-card title="HAP Sense Java API" hoverable :bordered="false" class="aosp-card">
        使用 SpringBoot + MyBatis 构建的 HAP Sense Java API，提供了数据库的管理、数据统计等功能。
        <template #header-extra>
          <n-button type="primary" @click="openLink('https://github.com/jiang-taibai/hap-sense-java-api')">GitHub
          </n-button>
        </template>
      </n-card>
      <n-card title="HAP Sense Python API" hoverable :bordered="false" class="aosp-card">
        使用 Python + PyTorch + Flask 构建的 HAP Sense Python API，提供了深度学习模型从训练、推理到API部署全流程服务。
        <template #header-extra>
          <n-button type="primary" @click="openLink('https://github.com/jiang-taibai/hap-sense-python-api')">GitHub
          </n-button>
        </template>
      </n-card>
      <n-card hoverable :bordered="false" class="title-card">
        <div style="display: flex; justify-content: center;align-items: center; height: 100%; width: 100%">
          <div style="line-height: 100%; font-size: 100px;">🎉</div>
        </div>
      </n-card>
    </div>

    <div class="markdown-container">
      <markdown :source="markdownText"></markdown>
    </div>
  </div>

</template>

<style scoped lang="less">
.container {
  padding: 20px;
  background-color: #f2f2f2;

  .aosp-container {
    display: flex;
    justify-content: start;
    gap: 20px;
    margin-bottom: 20px;
    margin-top: 20px;
    flex-wrap: wrap;

    .title-card {
      width: 10em;
      border-radius: 8px;
      cursor: pointer;
    }

    .aosp-card {
      max-width: 400px;
      min-width: 300px;
      border-radius: 8px;
      cursor: pointer;
    }
  }
}
</style>
<style lang="less">
.markdown-container {
  border-radius: 10px;
  padding: 20px 40px;
  margin-right: 20px;
  background-color: #ffffff;

  table {
    border-collapse: collapse;
    font-family: Arial, sans-serif;
    border: #dddddd solid 1px;
  }


  thead th {
    background-color: #4CAF50;
    color: white;
    padding: 10px 20px;
    text-align: left;
  }


  td {
    padding: 8px 20px;
    border-bottom: 1px solid #ddd;
  }


  tr:hover {
    background-color: #f5f5f5;
  }
}
</style>