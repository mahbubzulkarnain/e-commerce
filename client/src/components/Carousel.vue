<template>
  <div id="carousel" class="slider">
    <div class="card">
      <div class="card-image">
        <figure class="image is-16by9  is-covered">
          <img
            src="https://images.unsplash.com/photo-1550921082-c282cdc432d6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
            alt="">
        </figure>
      </div>
      <div class="card-content">
        <div class="item__title">
          Mon titre 1
        </div>
        <div class="item__description">
          Ici une petite description pour tester le slider
        </div>
      </div>
    </div>

    <div class="card">
      <div class="card-image">
        <figure class="image is-16by9  is-covered">
          <img
            src="https://images.unsplash.com/photo-1550945771-515f118cef86?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80"
            alt="">
        </figure>
      </div>
      <div class="card-content">
        <div class="item__title">
          Mon titre 2
        </div>
        <div class="item__description">
          Ici une petite description pour tester le slider
        </div>
      </div>
    </div>

    <div class="card">
      <div class="card-image">
        <figure class="image is-16by9  is-covered">
          <img
            src="https://images.unsplash.com/photo-1550971264-3f7e4a7bb349?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
            alt="">
        </figure>
      </div>
      <div class="card-content">
        <div class="item__title">
          Mon titre 3
        </div>
        <div class="item__description">
          Ici une petite description pour tester le slider
        </div>
      </div>
    </div>

    <div class="card">
      <div class="card-image">
        <figure class="image is-16by9  is-covered">
          <img
            src="https://images.unsplash.com/photo-1550931937-2dfd45a40da0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
            alt="">
        </figure>
      </div>
      <div class="card-content">
        <div class="item__title">
          Mon titre 4
        </div>
        <div class="item__description">
          Ici une petite description pour tester le slider
        </div>
      </div>
    </div>

    <div class="card">
      <div class="card-image">
        <figure class="image is-16by9 is-covered">
          <img
            src="https://images.unsplash.com/photo-1550930516-af8b8cc4f871?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80"
            alt="">
        </figure>
      </div>
      <div class="card-content">
        <div class="item__title">
          Mon titre 5
        </div>
        <div class="item__description">
          Ici une petite description pour tester le slider
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import bulmaCarousel from 'bulma-carousel/dist/js/bulma-carousel.min.js';

export default {
  name: 'Carousel',
  created() {
    // Initialize all input of date type.
    bulmaCarousel.attach('#carousel');
  },
};
</script>

<style scoped lang="scss">
  @import "~bulma-carousel/src/sass/index";
</style>
