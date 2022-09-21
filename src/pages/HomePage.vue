<template>
  <hero-section :filteredItems="filteredItems"></hero-section>
  <exchange-list :searchedTiltle="searchedTiltle"></exchange-list>
</template>

<script>
import ExchangeList from '../components/ExchangeList.vue';
import HeroSection from '../components/HeroSection.vue';
export default {
  components: {
    ExchangeList,
    HeroSection,
  },
  data() {
    return {
      searchedTiltle: '',
    };
  },
  created() {
    this.user && this.$store.dispatch('user/getUserProfile', this.user);
  },
  methods: {
    filteredItems(value) {
      this.searchedTiltle = value;
    },
  },
  computed: {
    user() {
      return this.$store.getters['user/getUser'];
    },
  },
};
</script>

<style></style>
