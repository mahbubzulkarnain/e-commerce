<template>
  <div class="card product-item">
    <div class="card-image">
      <figure class="image is-4by3">
        <img :src="'https://source.unsplash.com/random/1280x960?v='+Math.random()" alt="Placeholder image">
      </figure>
    </div>
    <div class="card-content">
      <p>
        {{item.title}}
      </p>
      <p class="product-item-price">{{item.price}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductItems',
  data() {
    return {
      itemdefault: {
        title: '',
        price: '',
      },
    };
  },
  props: ['product'],
  computed: {
    item() {
      return {
        ...this.itemdefault,
        ...this.product,
      };
    },
  },
};
</script>

<style scoped lang="scss">
  @import "../../assets/stylesheet/config";

  .product-item {
    .card-content {
      padding: 10px;
    }

    .product-item-price {
      margin: 5px;
      font-size: small;
      color: $color-primary;
    }
  }

</style>
