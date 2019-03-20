<template>
  <section class="container home-page">
    <img src="../assets/img/header.jpg">
    <div class="columns">
      <div class="column">
        <img src="../assets/img/header.jpg">
      </div>
      <div class="column">
        <img src="../assets/img/header.jpg">
      </div>
      <div class="column">
        <img src="../assets/img/header.jpg">
      </div>
    </div>
    <ProductsList :title="'Catalog'" :products="products"></ProductsList>
  </section>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue';
import ProductsList from '../components/products/ProductsList';

export default {
  name: 'HomePage',
  data() {
    return {
      products: new Array(5),
    };
  },
  mounted() {
    this.$parent.bgNavbar = 'transparent';
    this.$api
      .get('/products')
      .then(({ data }) => {
        this.products = data;
      })
      .catch((err) => {
        console.log(err);
      });
  },
  components: {
    HelloWorld,
    ProductsList,
  },
};
</script>

<style scoped lang="scss">
  .home-page {
    margin-top: 3.5rem;
  }
</style>
