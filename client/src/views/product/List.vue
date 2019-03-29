<template>
  <div>
    <ProductsList :title="'Catalog'" :products="products"/>
  </div>
</template>

<script>
import ProductsList from '@/components/products/ProductsList';

export default {
  name: 'List',
  data() {
    return {
      products: [],
    };
  },
  mounted() {
    this.$api
      .get('/my-products')
      .then(({ data }) => {
        this.products = data;
      })
      .catch((err) => {
        console.log(err);
      });
  },
  components: {
    ProductsList,
  },
};
</script>

<style scoped>

</style>
