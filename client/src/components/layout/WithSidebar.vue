<template>
  <section class="container">
    <div class="columns">
      <div class="column is-one-fifth">
        <Sidebar/>
      </div>
      <div class="column is-four-fifths">
        <section class="section">
          <Breadcrumb/>
          <slot></slot>
        </section>
      </div>
    </div>
  </section>
</template>

<script>
import Sidebar from '@/components/Sidebar.vue';
import Breadcrumb from '@/components/Breadcrumb.vue';

export default {
  name: 'WithSidebar',
  components: {
    Sidebar,
    Breadcrumb,
  },
};
</script>

<style scoped>

</style>
