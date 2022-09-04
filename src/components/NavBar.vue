<template>
  <header :class="stylednavbar">
    <nav>
      <div>
        <h1>Brand name</h1>
      </div>

      <ul>
        <li>
          <router-link to="/">Home</router-link>
        </li>
        <li>
          <router-link to="/about">About</router-link>
        </li>
        <li>
          <router-link to="/register">Register</router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  computed: {
    stylednavbar() {
      return this.$route.path === '/' ? '' : 'coloredBG';
    },
  },
};
</script>

<style>
header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 5rem;
  padding: 0 5%;
  z-index: 10;
}
.coloredBG {
  background-color: rgb(32, 54, 76);
}
nav {
  display: flex;
  justify-content: space-between;
  color: white;
  align-items: center;
  height: 100%;
}
ul {
  list-style: none;
  display: flex;
}
li {
  font-size: 1.5rem;
  margin-left: 2.5rem;
}
a {
  text-decoration: none;
  font-weight: 500;
  color: white;
}
a:hover {
  color: orange;
}
a.router-link-exact-active {
  color: orange;
}
</style>
