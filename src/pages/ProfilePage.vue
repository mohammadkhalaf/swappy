<template>
  <section class="wrapper">
    <div class="column">
      <div>
        <h2>Name</h2>
        <button>Update profile</button>

        <div class="item">
          <img src="" alt="" />
          <h3>Offer:300$</h3>
          <h3>request: HP laptop</h3>
          <span>Pending</span>
          <p>User want to exchange item 1 with item 2 for 200$</p>
          <button>Deal</button>
        </div>
      </div>
    </div>
    <div class="column">
      <div>
        <h2>recived</h2>
      </div>
      <div><h2>sent</h2></div>
      <div><h2>credits</h2></div>
    </div>
  </section>
</template>

<script>
export default {};
</script>

<style scoped>
.wrapper {
  border: 1px solid red;
  padding: 6rem;
  display: flex;
  justify-content: space-between;
}
.column {
  border: 1px solid green;
  flex-basis: 50%;
  margin-left: 3rem;
}
</style>
