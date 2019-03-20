<template>
  <div class='container'>
    <div class="columns is-vcentered">
      <form class="column is-two-fifths is-offset-1" @submit.prevent="postLogin">
        <div class="field">
          <div class="field-label is-normal has-text-left	">
            <label class="label">Username/Email</label>
          </div>
          <div class="field-body">
            <div class="field">
              <div class="control">
                <input type="text" placeholder="Username/Email" class="input" v-model="user" required>
              </div>
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
            </div>
          </div>
        </div>
        <div class="field">
          <div class="control">
            <input class="button is-primary is-fullwidth" type="submit" value="Login">
          </div>
        </div>
        <hr>
        <div class="field">
          <div class="control">
            <div id="google-signin-button" class="button is-danger is-outlined is-fullwidth"
                 :data-onsuccess="$parent.signIn">
              <div class="buttonText">Login with google</div>
            </div>
          </div>
        </div>
      </form>
      <section class="column is-two-fifths is-offset-1 hero is-fullheight">
        <div class="hero-body">
          <router-link class="button is-primary is-outlined is-fullwidth" to="/register">Register With Email
          </router-link>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      user: this.$parent.email || '',
      password: '',
    };
  },
  mounted() {
    gapi.load('auth2', () => {
      this.$parent.auth2 = gapi.auth2.init({
        client_id: '948327471193-oa3aha2tm769qf29cq71ca4n7223h187.apps.googleusercontent.com',
      });
      this.$parent.attachSignin(document.getElementById('google-signin-button'));
    });
  },
  methods: {
    postLogin() {
      this.$api
        .post('/auth/login', {
          user: this.user,
          password: this.password,
        })
        .then(({ data }) => {
          this.$parent.isLogin = true;
          localStorage.setItem('xf', data.fullname);
          localStorage.setItem('xu', data.username);
          localStorage.setItem('xi', data.id);
          localStorage.setItem('xs', data.token);
          this.$router.replace('/');
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style scoped>

</style>
