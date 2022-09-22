<template>
  <header :class="stylednavbar">
    <nav>
      <div>
        <h1>Brand name</h1>
      </div>
      <div @click="openNav" v-if="open" class="overlay"></div>
      <ul :class="open ? 'open' : ''">
        <li v-if="isAuth">{{ getUser?.email }}</li>
        <li>
          <router-link @click="openNav" to="/">Home</router-link>
        </li>
        <li>
          <router-link @click="openNav" to="/about">About</router-link>
        </li>
        <li>
          <router-link @click="openNav" to="/profile">Profile</router-link>
        </li>
        <li>
          <router-link @click="openNav" to="/create"
            >Create exchange</router-link
          >
        </li>
        <li v-if="!isAuth">
          <router-link @click="openNav" to="/register">Register</router-link>
        </li>
        <li @click="logoutHandler" class="clickable" v-if="isAuth">Logout</li>
      </ul>

      <div @click="openNav" class="menu">
        <font-awesome-icon v-if="open" icon="fa-solid fa-times" />
        <font-awesome-icon v-else icon="fa-solid fa-bars" />
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  data() {
    return {
      open: false,
    };
  },
  computed: {
    stylednavbar() {
      return this.$route.path === '/' ? '' : 'coloredBG';
    },
    isAuth() {
      return this.$store.getters['user/isAuth'];
    },
    getUser() {
      return this.$store.getters['user/getUser'];
    },
  },
  methods: {
    logoutHandler() {
      this.$store.dispatch('user/logOutHandler');
      this.openNav();
    },
    openNav() {
      this.open = !this.open;
    },
  },
};
</script>

<style scoped>
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
.clickable {
  cursor: pointer;
}
a:hover {
  color: orange;
}
a.router-link-exact-active {
  color: orange;
}
.menu {
  display: none;
}
@media (max-width: 800px) {
  ul {
    position: absolute;
    display: flex;
    flex-direction: column;
    padding-right: 2rem;
    padding-top: 5rem;
    top: 0rem;
    left: 0rem;
    background-color: rgb(32, 54, 76);
    height: 100vh;
    z-index: 10;
    width: 25rem;
    transform: translate(-100%);
    transition: 0.4s all ease;
  }
  li,
  li a {
    margin-left: auto;
    line-height: 150%;
    margin-bottom: 2rem;
    font-weight: 700;
  }
  ul.open {
    transform: translate(0);
  }
  .overlay {
    background-color: rgba(0, 0, 0, 0.3);
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
  }
  .menu {
    display: block;
    font-size: 1.75rem;
    transition: 4s all ease;
  }
}
</style>
