<template>
  <div class="page-wrapper">
    <div class="form-container">
      <h2>What do you want to exchange</h2>
      <form @submit.prevent="createExchange">
        <div class="field">
          <label class="label">Type</label>
          <div class="select">
            <select v-model="form.type">
              <option value="service">Service</option>
              <option value="product">Product</option>
            </select>
          </div>
        </div>
        <div class="field">
          <label class="label">Title</label>
          <input v-model="form.title" class="input" type="text" />
        </div>
        <div class="field">
          <label class="label">Description</label>
          <textarea rows="5" v-model="form.description" class="textarea">
          </textarea>
        </div>
        <div class="field">
          <label class="label">Image Link</label>
          <input v-model="form.image" class="input" type="text" />
        </div>
        <div class="field">
          <label class="label">Price</label>
          <input v-model="form.price" class="input" type="number" />
        </div>
        <div class="field">
          <label class="label">City</label>
          <input v-model="form.city" class="input" type="text" />
        </div>

        <div class="field">
          <label class="label">Tags</label>
          <input v-model="form.tags" class="input" type="text" />
        </div>

        <button type="button" @click="createExchange" class="button">
          Submit
        </button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        title: '',
        description: '',
        type: 'product',
        image: '',
        price: null,

        city: '',
        tags: [],
      },
    };
  },
  methods: {
    createExchange() {
      alert(JSON.stringify(this.form));
    },
  },
};
</script>

<style scoped>
.page-wrapper {
  padding: 5rem;
  border: 1px solid red;
}
.form-container {
  margin: 0 auto;
  margin-top: 40px;
  border: 1px solid green;
  max-width: 50rem;
  padding: 2rem;
}
h2 {
  text-align: center;
}
.field {
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
}
.label {
  margin-bottom: 1rem;
  font-size: 1.4rem;
  font-weight: 700;
}
.input {
  height: 3rem;
}
.input,
textarea {
  width: 100%;
  padding-left: 0.5rem;
}
.input,
textarea:focus {
  outline: none;
}
button {
  width: 100%;
  height: 3rem;
  background-color: rgb(32, 53, 76);
  border: none;
  color: white;
  font-weight: 700;
  font-size: 1.7rem;
}
</style>
