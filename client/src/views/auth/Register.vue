<template>
  <div class='container'>
    <div class="columns is-vcentered">
      <form class="column is-two-fifths is-offset-1" @submit.prevent="postRegister">
        <div class="field">
          <div class="field-label is-normal has-text-left	">
            <label class="label">First name</label>
          </div>
          <div class="field-body">
            <div class="field">
              <div class="control">
                <input type="text" placeholder="First name" class="input" v-model="first_name" required>
                <p class="help is-danger" v-if="error['first_name']">{{error['first_name'].message}}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="field">
          <div class="field-label is-normal has-text-left	">
            <label class="label">Last name</label>
          </div>
          <div class="field-body">
            <div class="field">
              <div class="control">
                <input type="text" placeholder="Last name" class="input" v-model="last_name" required>
              </div>
              <p class="help is-danger" v-if="error['last_name']">{{error['last_name'].message}}</p>
            </div>
          </div>
        </div>
        <br>
        <div class="field">
          <div class="field-label is-normal has-text-left	">
            <label class="label">Email</label>
          </div>
          <div class="field-body">
            <div class="field">
              <div class="control">
                <input type="text" placeholder="Email" class="input" v-model="email" required>
              </div>
              <p class="help is-danger" v-if="error['email']">{{error['email'].message}}</p>
            </div>
          </div>
        </div>
        <div class="field">
          <div class="field-label is-normal has-text-left	">
            <label class="label">Username</label>
          </div>
          <div class="field-body">
            <div class="field">
              <div class="control">
                <input type="text" placeholder="Username" class="input" v-model="username" required>
              </div>
              <p class="help is-danger" v-if="error['username']">{{error['username'].message}}</p>
            </div>
          </div>
        </div>
        <div class="field">
          <div class="field-label is-normal has-text-left	">
            <label class="label">Password</label>
          </div>
          <div class="field-body">
            <div class="field">
              <div class="control">
                <input type="password" placeholder="Password" class="input" autocomplete="off" v-model="password"
                       required>
              </div>
              <p class="help is-danger" v-if="error['password']">{{error['password'].message}}</p>
            </div>
          </div>
        </div>
        <div class="field">
          <div class="control">
            <input class="button is-primary is-fullwidth" type="submit" value="Register">
          </div>
        </div>
        <hr>
        <div class="field">
          <div class="control">
            <div id="google-signin-button" class="button is-danger is-outlined is-fullwidth"
                 :data-onsuccess="$root.signIn">
              <div class="buttonText">Register with google</div>
            </div>
          </div>
        </div>
      </form>
      <section class="column is-two-fifths is-offset-1 hero is-fullheight">
        <div class="hero-body">
          <router-link class="button is-primary is-outlined is-fullwidth" to="/login">Login With Email</router-link>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Register',
  data() {
    return {
      first_name: '',
      last_name: '',
      username: '',
      email: '',
      password: '',
      error: '',
    };
  },
  methods: {
    postRegister() {
      this.error = '';
      this.$api
        .post('/auth/register', {
          username: this.username,
          email: this.email,
          password: this.password,
          first_name: this.first_name,
          last_name: this.last_name,
        })
        .then(({ data }) => {
          this.$parent.email = data.email;
          this.$router.replace('/login');
        })
        .catch((err) => {
          try {
            const { message } = err.response.data;
            this.error = message.errors;
          } catch (e) {

          }
        });
    },
  },
};
</script>

<style scoped>

</style>
