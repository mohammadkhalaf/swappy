<template>
  <hero-section></hero-section>
  <exchange-list></exchange-list>
</template>

<script>
import ExchangeList from '../components/ExchangeList.vue';
import HeroSection from '../components/HeroSection.vue';
export default {
  components: {
    ExchangeList,
    HeroSection,
  },
  created() {
    this.user && this.$store.dispatch('user/getUserProfile', this.user);
  },
  computed: {
    user() {
      return this.$store.getters['user/getUser'];
    },
  },
};
</script>

<style></style>
