<template>
  <WithSidebar>
    <div class="card" v-for="(cart, i) in carts" :key="cart._id" :ref="'cart-'+cart._id" style="margin-bottom: 2rem">
      <div class="card-header">
        <p class="card-header-title">{{fullname(cart.product.author)}}</p>
      </div>
      <div class="card-content">
        <div class="columns">
          <div class="column is-four-fifths">
            <div class="field has-addons">
              <div class="control">
                <figure class="image is-128x128">
                  <img :src="cart.picture">
                </figure>
              </div>
              <div class="control ml-1rem">
                <p class="subtitle">
                  {{cart.title}}
                </p>
                <div class="field is-grouped">
                  <div class="control">
                    <button
                      class="button is-small"
                      @click="quantityMin(i, cart._id, cart.product._id)">-
                    </button>
                  </div>
                  <div class="control">
                    <input
                      class="input is-small"
                      :ref="'quantity-'+cart._id"
                      :value="cart.quantity"
                    >
                  </div>
                  <div class="control">
                    <button
                      class="button is-small"
                      @click="quantityPlus(i, cart._id, cart.product._id)">+
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="column is-one-fifth">
            <button
              class="button is-danger is-small is-pulled-right"
              @click="removeProduct(i, cart._id, cart.product._id)">Cancel
            </button>
            <p>
              {{rupiah(cart.price * cart.quantity)}}
            </p>
          </div>
        </div>
      </div>
    </div>
    <hr>
    <div class="is-flex" style="justify-content: space-between;">
      <div>
        <p>
          Subtotal:<b> {{price}}</b>
        </p>
        <p class="help">
          Belum termasuk ongkos kirim
        </p>
      </div>
      <div v-if="false">
        <button class="button is-primary">Checkout</button>
      </div>
    </div>
  </WithSidebar>
</template>

<script>
import rupiah from '../helpers/rupiah';

export default {
  name: 'Cart',
  data() {
    return {
      carts: [],
      subtotal: 0,
    };
  },
  methods: {
    removeProduct(index, id) {
      this.$api
        .delete(`/carts/${id}`)
        .then(() => {
          this.carts.splice(index, 1);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    quantityMin(index, id, product) {
      if (this.carts[index].quantity > 1) {
        // this.carts[index].quantity -= 1;
        this.$api
          .patch(`/carts/${id}/quantity/${product}/min`)
          .then(({ data }) => {
            this.carts[index].quantity = data.quantity;
          })
          .then((err) => {
            console.log(err);
          });
      }
    },
    quantityPlus(index, id, product) {
      if ((this.carts[index].quantity + 1) < this.carts[index].product.stock) {
        // this.carts[index].quantity += 1;
        this.$api
          .patch(`/carts/${id}/quantity/${product}/plus`)
          .then(({ data }) => {
            this.carts[index].quantity = data.quantity;
          })
          .then((err) => {
            console.log(err);
          });
      }
    },
    fullname(author) {
      return `${author.first_name} ${author.last_name}`;
    },
    rupiah(price) {
      return rupiah(price);
    },
  },
  computed: {
    price() {
      return rupiah(this.subtotal);
    },
  },
  beforeCreate() {
    this.$api
      .get('/carts')
      .then(({ data }) => {
        this.carts = data;
        data.forEach((item) => {
          this.subtotal += (item.price * item.quantity);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>

<style scoped lang="scss">
  .ml-1rem {
    margin-left: 1rem;
  }
</style>
