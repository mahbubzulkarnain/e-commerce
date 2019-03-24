<template>
  <WithSidebar>
    <div class="columns" v-if="false">
      <div class="column is-full">
        Promo
      </div>
    </div>
    <ProductsList :title="'Catalog'" :products="products"/>
  </WithSidebar>
</template>

<script>
import HelloWorld from '@/components/HelloWorld.vue';
import ProductsList from '@/components/products/ProductsList';
import Carousel from '@/components/Carousel.vue';

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
    Carousel,
  },
};
</script>

<style scoped lang="scss">

</style>
