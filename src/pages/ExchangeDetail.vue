<template>
  <section class="wrapper">
    <div class="header">
      <div class="col">
        <h2>Tilte</h2>
        <h3>type</h3>
        <p>By: User</p>
      </div>
      <div class="col">
        <div>
          <img src="" alt="item image" />
          <p>Price</p>
          <button>Make exchange</button>
        </div>
      </div>
    </div>
    <div class="details">
      <h1>City</h1>
      <p>Detail</p>
    </div>
  </section>
</template>

<script>
export default {};
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
