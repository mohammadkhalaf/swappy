<template>
  <div class="wrapper">
    <section class="hero-section">
      <div class="hero-text">
        <h1>Let's swap this for that!</h1>
        <h2>
          A nonprofit movement of people who are giving and getting stuff for
          free. It's all about reuse and keeping good stuff out of landfills.
        </h2>
      </div>
      <div class="hero-search">
        <span>Search for </span>
        <input
          class="input"
          @input="handleSearch"
          type="text"
          placeholder="Search..."
        />
      </div>
    </section>
  </div>
</template>

<script>
export default {
  props: {
    filteredItems: {
      type: Function,
    },
  },
  data() {
    return {
      searchTerm: '',
    };
  },
  methods: {
    handleSearch(e) {
      const { value } = e.target;
      this.searchTerm = value;
      this.filteredItems(value);
    },
  },
};
</script>

<style scoped>
h1,
h2 {
  color: white;
}
h1 {
  font-size: 3rem;
  line-height: 150%;
  margin-bottom: 3rem;
}
h2 {
  font-size: 1.75rem;
  letter-spacing: 0.2rem;
}
.wrapper {
  height: 550px;
  position: relative;
}
.hero-section {
  background-image: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.3),
      rgba(0, 0, 0, 0.3)
    ),
    url('../assets/img/test.jpg');
  background-repeat: no-repeat;
  /* background-size: 100% 100%; */
  background-size: cover;

  background-position: center center;
  width: 100%;
  height: 100%;

  /* padding: 40rem; */
}
.hero-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.hero-search {
  background-color: rgb(32, 54, 76);

  position: absolute;
  top: 100%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 50%;

  max-width: 60rem;
  height: 4rem;
  color: white;
  display: flex;
  align-items: center;
  padding: 0 2%;
  border-radius: 0.4rem;
}
.hero-search span {
  font-size: 1.5rem;
  margin-right: 1.4rem;
}
.hero-search input {
  height: 70%;
  width: 40%;
  flex: 1;
  padding-left: 1rem;
}
.hero-search input:focus {
  outline: none;
}
@media screen and (max-width: 700px) {
  .wrapper {
    max-height: 400px;
  }

  .hero-search {
    width: 60%;
  }
  .hero-search span {
    font-size: 1.25rem;
  }
  h1 {
    font-size: 2.2rem;
  }
  h2 {
    font-size: 1.5rem;
  }
}
</style>
