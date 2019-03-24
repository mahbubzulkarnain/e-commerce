<template>
  <clazy-load :src="'https://source.unsplash.com/random/1280x960?v='+Math.random()">
    <img :src="src" :alt="alt">
    <div slot="placeholder" class="placeholder-img">
      Loading....
    </div>
  </clazy-load>
</template>

<script>
export default {
  name: 'ImageLazyLoad',
  props: {
    src: {
      default: '',
    },
    alt: {
      default: '',
    },
  },
};
</script>

<style scoped lang="scss">
  .placeholder-img {
    position: absolute;
    top: 50%;
  }
</style>
