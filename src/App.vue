<template>
  <div>
    <nav-bar></nav-bar>
  </div>
  <router-view></router-view>
</template>

<script>
import NavBar from './components/NavBar.vue';
export default {
  components: {
    NavBar,
  },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,300;0,400;0,500;1,300;1,500&family=Ubuntu:wght@300;400;500&display=swap');
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
html {
  font-size: 62.5%;
}
body {
  font-family: 'Montserrat', sans-serif;
}
</style>
