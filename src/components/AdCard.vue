<script setup>
import {NCard, NImage, NCarousel} from "naive-ui";

const imgs = [
  "脐橙",
  "辣椒",
  "LV",
  "玛莎拉蒂",
]
const getImageUrl = (name) => {
  return new URL(`../assets/img/ads/${name}.jpg`, import.meta.url).href;
}
</script>

<template>
  <n-carousel autoplay show-arrow>
    <img class="carousel-img" v-for="img in imgs" width="100" :src="getImageUrl(img)" alt="img"/>
  </n-carousel>
</template>

<style scoped>
.carousel-img {
  height: 100%;
  width: 100%;
  object-fit: cover;
}
</style>