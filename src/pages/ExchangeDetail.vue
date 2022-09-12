<template>
  <section class="wrapper">
    <div class="header">
      <div class="col">
        <h2>{{ exchange.title }}</h2>
        <h3>type {{ exchange.type }}</h3>
        <p>By: {{ exchange.name }}</p>
      </div>
      <div class="col">
        <div>
          <img src="" alt="item image" />
          <p>{{ exchange.Price }}$</p>
          <button>Make exchange</button>
        </div>
      </div>
    </div>
    <div class="details">
      <h1>{{ exchange.city }}</h1>
      <p>Detail</p>
    </div>
  </section>
</template>

<script>
export default {
  created() {
    const { slug } = this.$route.params;
    this.$store.dispatch('exchanges/getSingleExchange', slug);
  },
  computed: {
    exchange() {
      return this.$store.getters['exchanges/exchange'];
    },
  },
};
</script>

<style scoped>
.wrapper {
  padding: 7rem;
}
.header {
  background-color: #132130;
  color: white;
  display: flex;
  justify-content: space-between;
  padding: 2rem 5%;
}
.hader img {
  max-height: 300px;
}
.details {
  padding: 2rem 5%;
  background-color: rgba(197, 197, 197, 0.712);
  margin-top: 2rem;
  display: flex;
  justify-content: space-between;
}
</style>
