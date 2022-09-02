<template>
  <nav-bar></nav-bar>
  <hero-section></hero-section>
  <h1>hello</h1>
</template>

<script>
import HeroSection from './components/HeroSection.vue';
import NavBar from './components/NavBar.vue';
export default {
  components: {
    NavBar,
    HeroSection,
  },
};
</script>

<style>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
</style>
