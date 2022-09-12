<template>
  <section class="exchange-list">
    <div class="list-container">
      <!-- {{ exchanges }} -->
      <div v-for="exchange in exchanges" :key="exchange.id" class="listitem">
        <img :src="exchange.image" :alt="exchange.title" class="img" />

        <div class="iteminfo">
          <div v-for="tag in exchange.tags" :key="tag">{{ tag }}</div>
          <h2>{{ exchange.title }}</h2>
          <div class="post-info">
            <h3>{{ exchange.name }}</h3>
            <p>22th Sep 2020</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  computed: {
    exchanges() {
      console.log(this.$store.getters['exchanges/exchanges']);
      return this.$store.getters['exchanges/exchanges'];
    },
  },
  created() {
    this.$store.dispatch('exchanges/getExchanges');
  },
};
</script>

<style scope>
.exchange-list {
  background-color: rgb(184, 150, 184);
  min-height: 30rem;
  height: auto;
  padding: 2rem;
}
.list-container {
  display: grid;

  grid-template-columns: repeat(auto-fit, minmax(40rem, 1fr));
  margin-top: 2rem;
  align-content: center;
  justify-content: center;

  /* justify-content: center;

  flex-wrap: wrap; */
}
.listitem {
  max-width: 45rem;

  /* min-width: 30rem; */
  /* flex-basis: 25%; */

  border: 1px solid purple;
}
.img {
  border: 1px solid blue;
  height: 20rem;
  width: 100%;
  object-fit: cover;
}
.post-info {
  display: flex;
  justify-content: space-between;
}
</style>
