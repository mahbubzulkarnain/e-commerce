<template>
  <section class="hero is-fullheight not-found">
    <div class="hero-body">
      <div class="container has-text-centered">
        <p class="title">404</p>
        <p class="subtitle">Not Found</p>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'NotFound',
};
</script>

<style scoped lang="scss">
  .not-found {
    .title {
      font-size: 3.5rem;
    }

    .subtitle {
      font-size: 3rem;
    }
  }
</style>
