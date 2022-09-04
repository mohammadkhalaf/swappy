<template>
  <div class="wrapper">
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
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.wrapper {
  border: 1px solid green;
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
  h1 {
    color: red;
  }
  .hero-search {
    width: 80%;
  }
}
</style>
