<template>
  <div class="product-list">
    <router-link class="is-pulled-right product-list-seemore" to="#" v-if="showSeeMore">See More...</router-link>
    <!--<p class="product-list-title">Nyantai dengan kursi santai</p>-->
    <div class="columns is-multiline">
      <li v-for="product in products" class="column is-one-fifth">
        <ProductItems :product="product"/>
      </li>
    </div>
  </div>
</template>

<script>
import ProductItems from './ProductItems';

export default {
  name: 'ProductsList',
  components: {
    ProductItems,
  },
  props: {
    title: {
      required: true,
    },
    products: {
      default: [],
    },
    showSeeMore: {
      default: false,
    },
  },
};
</script>

<style scoped lang="scss">
  @import "../../assets/stylesheet/config";

  .product-list {
    margin-bottom: 1.5rem;

    .product-list-seemore {
      font-size: medium;
    }

    .product-list-title {
      color: $color-primary;
      font-size: large;
      margin-bottom: 1rem;
    }
  }
</style>
