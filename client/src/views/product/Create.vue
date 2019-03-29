<template>
  <form @submit.prevent="create_product">
    <div class="columns is-fixed-top">
      <h3 class="column is-three-fifths title">
        Sell products
      </h3>
      <div class="column is-two-fifths">
        <div class="field">
          <div class="control">
            <a :class="btnSell" ref="btnSell" @click="create_product">Sell</a>
          </div>
        </div>
      </div>
    </div>
    <div class="columns">
      <div class="column is-two-fifth">
        <div class="panel" @click="$refs.inputFile.click()" style="border: 1px dashed #bbb;padding: 1rem;">
          <div class="panel-body has-text-centered">
            <img
              :src="newProduct.picture || '/assets/images/upload-image.png'"
              style="width: 150px;margin: 0 auto;display: block;"
              ref="outputFile"
            />
            <p class="is-small">
              <b class="has-text-primary">Pilih Gambar Barang</b>
            </p>

            <input
              type="file"
              style="display: none;"
              ref="inputFile"
              id="file"
              @change="previewFiles"
            >
          </div>
        </div>
        <p class="is-size-7 has-text-danger" v-if="error['file']">{{error['file'].message}}</p>
      </div>
      <div class="column is-three-fifths">
        <div class="panel">
          <div class="panel-block">
            <div class="field is-fullwidth">
              <div class="field-body">
                <div class="field">
                  <div class="control">
                    <label>Name</label>
                    <input type="text" class="input" placeholder="Name" v-model="newProduct.title">
                    <p class="is-size-7 has-text-danger" v-if="error['title']">{{error['title'].message}}</p>
                  </div>
                </div>
              </div>
              <div class="field-body">
                <div class="field">
                  <label>Condition</label>
                  <div class="control">
                    <p>
                      <input type="radio" id="conditionNew" value="0" v-model="newProduct.condition">
                      <label for="conditionNew" style="padding-left: 10px;padding-right: 10px;">New</label>
                      <input type="radio" id="conditionSecond" value="1" v-model="newProduct.condition">
                      <label for="conditionNew" style="padding-left: 5px;"> Second</label>
                    </p>
                    <p class="is-size-7 has-text-danger" v-if="error['condition']">{{error['condition'].message}}</p>
                  </div>
                </div>
              </div>
              <div class="field-body">
                <div class="field">
                  <div class="control">
                    <label>Description</label>
                    <textarea class="textarea" placeholder="Description" v-model="newProduct.description"></textarea>
                    <p class="is-size-7 has-text-danger" v-if="error['description']">
                      {{error['description'].message}}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <p class="panel-heading">
            Product Detail
          </p>
          <div class="panel-block">
            <div class="field" style="width: 100%">
              <div class="field-body">
                <div class="field">
                  <div class="control">
                    <label>Price</label>
                    <div class="field has-addons">
                      <p class="control">
                        <a class="button is-static">
                          Rp.
                        </a>
                      </p>
                      <p class="control is-fullwidth">
                        <input type="number" class="input" placeholder="0" v-model="newProduct.price">
                      </p>
                    </div>
                    <p class="is-size-7 has-text-danger" v-if="error['price']">{{error['price'].message}}</p>
                  </div>
                </div>
              </div>
              <div class="field-body">
                <div class="field">
                  <label>Weight</label>
                  <div class="field has-addons">
                    <p class="control is-fullwidth">
                      <input type="number" class="input" placeholder="0" v-model="newProduct.weight">
                    </p>
                    <p class="control">
                      <a class="button is-static">
                        gram
                      </a>
                    </p>
                  </div>
                  <p class="is-size-7 has-text-danger" v-if="error['weight']">{{error['weight'].message}}</p>
                </div>
              </div>
              <div class="field-body">
                <div class="field">
                  <div class="control">
                    <label>Stock</label>
                    <input type="number" class="input" placeholder="0" v-model="newProduct.stock">
                    <p class="is-size-7 has-text-danger" v-if="error['stock']">{{error['stock'].message}}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  name: 'Create',
  data() {
    return {
      error: {},
      btnSell: {
        button: true,
        'is-primary': true,
        'is-loading': false,
        'is-fullwidth': true,
      },
      newProduct: {
        _id: '',
        title: '',
        description: '',
        price: 0,
        stock: 0,
        weight: 0,
        condition: 0,
        picture: '',
      },
    };
  },
  mounted() {
    if (this.$router.currentRoute.params.id) {
      this.$api.get(`/products/${this.$router.currentRoute.params.id}`)
        .then(({ data }) => {
          this.newProduct = data;
          console.log(this.newProduct);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  },
  methods: {
    previewFiles() {
      const { files } = this.$refs.inputFile;
      if (files && files[0]) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.$refs.outputFile.src = e.target.result;
        };
        reader.readAsDataURL(files[0]);
      }
    },
    create_product() {
      this.btnSell['is-loading'] = true;


      const dataUpload = this.newProduct;

      const formData = new FormData();
      const dataFile = document.querySelector('#file');
      formData.append('title', dataUpload.title);
      formData.append('description', dataUpload.description);
      formData.append('price', +dataUpload.price);
      formData.append('stock', +dataUpload.stock);
      formData.append('weight', +dataUpload.weight);
      formData.append('condition', +dataUpload.condition);
      formData.append('file', dataFile.files[0]);

      if (!this.newProduct.slug && !this.$router.currentRoute.params.id) {
        this.$api
          .post('/products', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          })
          .then(({ data }) => {
            this.$router.replace(`/p/${data.slug}`);
          })
          .catch((err) => {
            if (err.response.data && err.response.data.message) {
              this.error = err.response.data.message.errors;
            }
            setTimeout(() => {
              // this.error = '';
            }, 3000);
          })
          .finally(() => {
            this.btnSell['is-loading'] = false;
          });
      } else {
        this.$api
          .put(`/products/${this.newProduct._id}`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          })
          .then(({ data }) => {
            this.$router.replace(`/p/${data.slug}`);
          })
          .catch((err) => {
            if (err.response.data && err.response.data.message) {
              this.error = err.response.data.message.errors;
            }
            setTimeout(() => {
              // this.error = '';
            }, 3000);
          })
          .finally(() => {
            this.btnSell['is-loading'] = false;
          });
      }
    },
  },
};
</script>

<style scoped lang="scss">

</style>
