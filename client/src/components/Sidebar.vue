<template>
  <section class="section">
    <aside class="menu">
      <ul class="menu-list">
        <li class="menu-item">
          <router-link to="/">Home</router-link>
          <router-link to="/carts" v-if="isLogin && false">Cart</router-link>
        </li>
      </ul>
      <p class="menu-label" v-if="isLogin">
        My Store
      </p>
      <ul class="menu-list" v-if="isLogin">
        <li><router-link to="/p/create">Create</router-link></li>
        <li><router-link to="/p/list">List</router-link></li>
        <li><router-link to="/p/history" v-if="false">History</router-link></li>
      </ul>
    </aside>
  </section>
</template>

<script>
export default {
  name: 'Sidebar',
  computed: {
    isLogin() {
      return this.$store.getters.isLogin;
    },
  },
};
</script>

<style scoped lang="scss">
  .menu {
    .menu-list {
      a {
        margin-top: .3rem;
      }
    }
  }
</style>
