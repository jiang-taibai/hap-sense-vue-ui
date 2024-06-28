<template>
  <div v-if="iconUrl" class="icon-container">
    <img :src="iconUrl" :alt="name" :style="{ width: computedSize, height: computedSize, 'object-fit': 'contain' }"/>
  </div>
</template>

<script>
export default {
  name: 'Icon',
  props: {
    name: {
      type: String,
      required: true
    },
    size: {
      type: [String, Number],
      default: '32'
    }
  },
  computed: {
    iconUrl() {
      try {
        return new URL(`../assets/img/icon/${this.name}.png`, import.meta.url).href;
      } catch (e) {
        console.error(`图标 ${this.name} 未找到！`);
        return null;
      }
    },
    computedSize() {
      return typeof this.size === 'number' ? `${this.size}px` : this.size + 'px';
    }
  }
};
</script>

<style scoped>
.icon-container {
  display: inline-block;
  /* 确保容器不会超出图标尺寸 */
  line-height: 0;
}

img {
  /* 保持图标自适应 */
  max-width: 100%;
  height: auto;
}
</style>
