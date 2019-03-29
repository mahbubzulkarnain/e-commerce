<template>
  <div class="card product-item" :ref="item._id">
    <router-link class="card-image" :to="'/p/'+item.slug">
      <figure class="image is-4by3">
        <ImageLazyLoad :src="item.picture" alt="Placeholder"/>
      </figure>
    </router-link>
    <span class="tag is-pulled-right">
        {{+item.condition === 0 ? 'New':'Second'}}
      </span>
    <div class="is-clearfix"/>
    <div class="card-content">
      <p>
        {{item.title}}
      </p>
      <p class="product-item-price">{{rupiah(item.price)}}</p>
    </div>
    <div class="card-footer" v-if="item.author._id+'' === user.id+'' && $store.getters.isLogin">
      <router-link class="button is-info is-small is-fullwidth" :to="'/p/edit/'+item.slug">Edit</router-link>
      <button class="button is-danger is-small is-fullwidth" @click="deleteProduct(item._id)">Delete</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductItems',
  data() {
    return {
      itemdefault: {
        _id: '',
        title: '',
        price: '',
        author: {
          _id: '',
        },
      },
    };
  },
  props: ['product'],
  methods: {
    deleteProduct(id) {
      this.$api
        .delete(`/products/${id}`)
        .then(({ data }) => {
          this.$refs[id].remove();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    rupiah(price) {
      if (isNaN(price) || typeof price !== 'number') return `Rp. ${0}`;
      return `Rp. ${Number.parseFloat(price).toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`;
    },
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },
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
    height: 100%;

    &:hover {
      .card-footer {
        visibility: visible;
      }
    }

    .card-content {
      padding: 10px;
    }

    .card-footer {
      top: 100%;
      visibility: hidden;
      position: absolute;
      background-color: #efeff4;
      width: 100%;
      z-index: 1001;
      border: none;
      padding: 10px;
      -webkit-box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1);
      box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1);

      .title {
        font-size: small;
      }

      .subtitle {
        font-size: x-small;
      }
    }

    .product-item-price {
      margin: 5px;
      font-size: small;
      color: $color-primary;
    }
  }

</style>
