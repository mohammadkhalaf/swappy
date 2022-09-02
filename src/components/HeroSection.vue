<template>
  <section class="hero-section">
    <div class="hero-text">
      <h1>Let's exchange</h1>
      <h2>Products that you can exchange with others</h2>
    </div>
    <div class="hero-search">
      <span>Search for </span>
      <input type="text" placeholder="Search..." />
    </div>
  </section>
</template>

<script>
export default {};
</script>

<style scoped>
.hero-section {
  background-image: url('https://images.unsplash.com/photo-1556741533-6e6a62bd8b49?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  width: 100%;

  height: 80vh;
  /* position: relative; */
}
.hero-text {
  border: green solid 2px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.hero-search {
  border: green solid 2px;
  position: absolute;
  top: 80%;
  left: 50%;
  transform: translate(-50%, -50%);
}
@media screen and (max-width: 600px) {
}
</style>
