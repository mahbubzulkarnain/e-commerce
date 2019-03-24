<template>
  <nav class="breadcrumb has-succeeds-separator" aria-label="breadcrumbs" v-if="false">
    <ul >
      <li>
        <router-link to="/">Home</router-link>
      </li>
      <li class="is-active">
        <router-link to="/" aria-current="page">Breadcrumb</router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'Breadcrumb',
  computed: {
    data() {
      const route = this.$router.currentRoute.fullPath.split('/').slice(1);
      const routeLink = [{ title: 'Home', slug: '/' }];
      return '';
    },
  },
};
</script>

<style scoped>

</style>
