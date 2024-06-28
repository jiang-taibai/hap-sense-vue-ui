<script setup>
import {
  NCard,
  NInfiniteScroll,
  NEllipsis,
  NBadge,
} from "naive-ui";
import {computed, onMounted, ref} from "vue";
import {getHotSearch} from "@/assets/js/api/public-api.js";

const news = ref([])
const showCount = ref(10)

onMounted(() => {
  getHotSearch((res) => {
    news.value = res.data.data
    /*
    id	"5050283973417702"
    title	"贵州文旅删除所有东方甄选相关视频"
    desc	"贵州文旅删除所有东方甄选相关视频"
    author	"互联网,社会新闻"
    timestamp	1719587061000
    hot	179489
    url	""
    mobileUrl	""
     */
  })
})

const handleLoad = () => {
  showCount.value += 10
}
const partOfNews = computed(() => {
  return news.value.slice(0, showCount.value)
})
</script>

<template>
  <n-card class="container" content-style="padding: 0;">
    <n-infinite-scroll style="height: 308px" :distance="10" @load="handleLoad">
      <div v-for="(newObject, index) in partOfNews" :key="newObject.id" class="new-item">
        <div class="num">{{ index + 1 }}.</div>
        <div class="desc">
          <n-badge :value="index <3?'hot':''">
            <n-ellipsis>
              <a :href="newObject.url" target="_blank" :class="{ 'top-three': index < 3 }">{{ newObject.desc }}</a>
            </n-ellipsis>
          </n-badge>
        </div>
      </div>
    </n-infinite-scroll>
  </n-card>
</template>

<style scoped lang="less">
.container {
  height: 100%;

  .new-item {
    display: flex;
    padding: 10px;
    cursor: pointer;
    border-bottom: #f2f2f2 1px solid;

    .num {
      width: 2em;
      text-align: center;
    }

    .desc {
      padding-left: 10px;
      flex: 1;
    }

    a {
      color: #000; /* 普通链接颜色 */
      text-decoration: none; /* 去掉下划线 */

      &:hover {
        color: #0056b3; /* 悬浮样式颜色 */
      }

      &:visited {
        color: #000; /* 点击后颜色不变 */
      }

      &.top-three {
        color: red; /* 前三条用红色字体 */
      }
    }
  }
}


.new-item:hover {
  background-color: #f0f0f0;
}
</style>