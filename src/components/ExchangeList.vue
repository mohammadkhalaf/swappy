<template>
  <section class="exchange-list">
    <div class="list-container">
      <!-- {{ exchanges }} -->
      <div
        v-for="exchange in filteredItems"
        :key="exchange.id"
        class="listitem"
      >
        <router-link :to="{ name: 'detail', params: { slug: exchange.slug } }">
          <img v-if="exchange.image" :src="exchange.image" class="img" />
          <img v-else src="../assets/img/noimage.gif" alt="" class="img" />

          <div class="iteminfo">
            <div v-for="tag in exchange.tags" class="tag" :key="tag">
              <span> {{ tag }}</span>
            </div>
            <div class="post-info">
              <h2>{{ exchange.title }}</h2>
              <span>{{ exchange?.createdAt }}</span>
            </div>
          </div>
        </router-link>
      </div>
    </div>
    {{ defaultImage }}
  </section>
</template>

<script>
export default {
  props: {
    searchedTiltle: {
      type: String,
    },
  },
  computed: {
    exchanges() {
      return this.$store.getters['exchanges/exchanges'];
    },
    filteredItems() {
      return this.exchanges.filter((item) => {
        return (
          item.title &&
          item.title.toLowerCase().includes(this.searchedTiltle.toLowerCase())
        );
      });
    },
  },
  created() {
    this.$store.dispatch('exchanges/getExchanges');
  },
};
</script>

<style scoped>
.exchange-list {
  background-color: rgb(240, 240, 240);

  padding: 2rem;
}
.list-container {
  display: grid;
  gap: 2.5rem;
  grid-template-columns: repeat(auto-fill, minmax(30rem, 1fr));
  margin-top: 2rem;
  align-content: center;
  justify-content: center;
}

.img {
  height: 20rem;
  width: 100%;
  object-fit: cover;
}

.post-info {
  margin-top: 0.7rem;
  color: black;

  font-size: 1rem;
  font-weight: 700;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.tag {
  font-size: 1.5rem;
  color: black;
  text-transform: capitalize;
}
a {
  text-decoration: none;
}
a:focus,
a:active {
  color: inherit;
  text-decoration: none;
}
</style>
