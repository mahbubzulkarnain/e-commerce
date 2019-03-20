<template>
  <div id="app">
    <Navbar :bg-navbar="bgNavbar"/>
    <router-view/>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar';
import axios from 'axios';

export default {
  data() {
    return {
      bgNavbar: 'white',
      email: '',
      fullname: 'Profile',
      username: '',
      auth2: '',
      isLogin: false,
    };
  },
  methods: {
    attachSignin(element) {
      this.auth2.attachClickHandler(element, {},
        this.signIn, (error) => {
          console.log(error);
        });
    },
    checkLogin: function checkLogin(id_token) {
      this.$api
        .post('/auth/verify', {
          id_token,
        })
        .then(({ data }) => {
          this.isLogin = true;
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
    signIn(googleUser) {
      const { id_token } = googleUser.getAuthResponse();
      this.checkLogin(id_token);
    },
  },
  beforeUpdate() {
    if (localStorage.xf) {
      this.fullname = localStorage.xf;
    }

    if (localStorage.xu) {
      this.username = localStorage.xu;
    }

    if (this.page === 'edit' && !this.newarticle.title) {
      this.page = 'create';
    }

    let headers = {};
    if (localStorage.xs && localStorage.xi) {
      this.isLogin = true;
      headers = {
        headers: {
          authorization: `Bearer ${localStorage.xs}`,
        },
      };
    } else {
      this.isLogin = false;
    }
    this.$api = axios.create({
      baseURL: `${this.$baseURL}/api`,
      timeout: 3000,
      ...headers,
    });
  },
  components: {
    Navbar,
  },
};
</script>

<style lang="scss">
  @import "./assets/stylesheet/config";
  @import "~@fortawesome/fontawesome-free/css/all.css";

  $link: $color-primary;
  $title-color: $color-primary;

  $content-heading-color: $color-primary;

  $menu-item-hover-color: white;
  $menu-item-hover-background-color: $color-primary;

  $navbar-dropdown-item-hover-color: white;
  $navbar-dropdown-item-hover-background-color: $color-primary;

  $footer-background-color: white;
  $footer-padding: 0;

  @import "~bulma/bulma.sass";

</style>
