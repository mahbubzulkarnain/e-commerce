<template>
  <div class="columns">
    <div class="column is-four-fifths">
      <div class="columns">
        <div class="column is-two-fifths">
          <ImageLazyLoad :src="product.picture" :alt="product.title" class="shadow"/>
          <span class="tag">
            Condition :<b style="padding-left: 10px;">
            {{+product.condition === 0 ? 'New':'Second'}}
          </b>
          </span>
        </div>
        <div class="column is-three-fifths">
          <div class="columns" v-if="product.author._id === user.id && $store.getters.isLogin">
            <div class="column">
              <router-link class="button is-info is-fullwidth" :to="'/p/edit/'+product.slug">
                Edit
              </router-link>
            </div>
            <div class="column">
              <button class="button is-danger is-fullwidth">
                Delete
              </button>
            </div>
          </div>
          <h2 class="title">{{product.title}}</h2>
          <h2 class="subtitle">{{rupiah(product.price)}}</h2>
        </div>
      </div>
      <p class="content">{{product.description}}</p>
      <form class="columns" v-if="product.author._id !== user.id && $store.getters.isLogin"
            @submit.prevent="addToChart">
        <div class="column">
          <div class="field is-horizontal">
            <div class="field-label is-normal">
              <label class="label">Quantity</label>
            </div>
            <div class="field-body">
              <div class="field">
                <p class="control">
                  <input class="input" type="number" value="1" v-model="quantity">
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="column">
          <input type="submit" class="button is-primary is-fullwidth" value="Buy">
        </div>
      </form>
    </div>
    <div class="column is-one-fifth">
      <div class="panel">
        <div class="panel-heading">
          Pelapak
        </div>
        <div class="panel-block">
          <h2>{{fullname}}</h2>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import rupiah from '../../helpers/rupiah';

export default {
  name: 'ProductRead',
  data() {
    return {
      quantity: 1,
      product: {
        _id: '',
        picture: '',
        slug: '',
        description: '',
        weight: '',
        condition: '',
        notes: '',
        created_at: '',
        updated_at: '',
        title: '',
        price: '',
        stock: '',
        author: '',
      },
    };
  },
  methods: {
    addToChart() {
      /* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
      this.$api
        .post('/carts', {
          picture: this.product.picture,
          weight: this.product.weight,
          condition: this.product.condition,
          quantity: this.quantity,
          product: this.product._id,
          title: this.product.title,
          price: this.product.price,
        })
        .then(({ data }) => {
          localStorage.xc = data._id;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    rupiah(price) {
      return rupiah(price);
    },
  },
  computed: {
    fullname() {
      return `${this.product.author.first_name} ${this.product.author.last_name}`;
    },
    user() {
      return this.$store.getters.user;
    },
  },
  beforeCreate() {
    this.$api.get(`/products/${this.$router.currentRoute.params.id}`)
      .then(({ data }) => {
        this.product = data;
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>

<style scoped lang="scss">
  .panel {
    * {
      word-break: break-all;
    }
  }

  .shadow {
    box-shadow: 1px 0 1px 1px #ddd;
  }
</style>
