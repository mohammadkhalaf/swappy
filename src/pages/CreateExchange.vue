<template>
  <div class="page-wrapper">
    <div class="form-container">
      <h2>What do you want to exchange</h2>

      <p v-if="isLoading">loading</p>
      <p v-if="msg">created !!</p>
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
          <div v-if="v$.form.title.$error" class="error">
            <span v-if="v$.form.title.required.$invalid">Title is require</span>
          </div>
          <div v-if="v$.form.title.$error" class="error">
            <span v-if="v$.form.title.minLength.$invalid"
              >Title must be at least 10 charachters long</span
            >
          </div>
        </div>
        <div class="field">
          <label class="label">Description</label>
          <textarea rows="5" v-model="form.description" class="textarea">
          </textarea>
          <div v-if="v$.form.description.$error" class="error">
            <span v-if="v$.form.description.required.$invalid"
              >Description is require</span
            >
          </div>
        </div>
        <div class="field">
          <label class="label">Image Link</label>
          <input v-model="form.image" class="input" type="text" />
        </div>
        <div class="field">
          <label class="label">Price</label>
          <input v-model="form.price" class="input" type="number" />
          <div v-if="v$.form.price.$error" class="error">
            <span v-if="v$.form.price.required.$invalid">Price is require</span>
          </div>
          <div v-if="v$.form.price.$error" class="error">
            <span v-if="v$.form.price.minValue.$invalid"
              >Price must be at least 1$</span
            >
          </div>
        </div>
        <div class="field">
          <label class="label">City</label>
          <input v-model="form.city" class="input" type="text" />
          <div v-if="v$.form.city.$error" class="error">
            <span v-if="v$.form.city.required.$invalid">Title is require</span>
          </div>
        </div>

        <div class="field">
          <label class="label">Tags</label>
          <input @input="handleTags" class="input" type="text" />
          <div class="tags">
            <span v-for="t in form.tags" :key="t"> {{ t }}</span>
          </div>
        </div>

        <button type="button" @click="createExchange" class="button">
          Submit
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import useVuelidate from '@vuelidate/core';
import { required, minLength, minValue } from '@vuelidate/validators';
export default {
  setup() {
    return { v$: useVuelidate() };
  },
  validations() {
    return {
      form: {
        title: { required, minLength: minLength(10) },
        description: { required },
        type: { required },
        image: {},
        price: { required, minValue: minValue(1) },

        city: {},
        tags: {},
      },
    };
  },
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
      isLoading: false,
      msg: null,
    };
  },
  methods: {
    handleTags(event) {
      const { value } = event.target;
      if (
        value &&
        value.trim().length > 1 &&
        (value.substr(-1) === ',' || value.substr(-1) === ' ')
      ) {
        const _value = value.split(',')[0].trim();
        if (!this.form.tags.includes(_value)) {
          this.form.tags.push(_value);
        }
        event.target.value = '';
      }
    },
    clearForm() {
      this.form = {
        title: '',
        description: '',
        type: 'product',
        image: '',
        price: null,

        city: '',
        tags: [],
      };
    },
    async createExchange() {
      const isValid = await this.v$.$validate();

      if (isValid) {
        this.isLoading = true;
        this.v$.$reset();
        this.$store.dispatch('exchanges/createExchanges', this.form);
        // this.$store.dispatch('user/getUserProfile', this.form);
        this.msg = true;

        this.clearForm();
        this.isLoading = false;
      }
    },
  },
  watch: {
    msg() {
      setTimeout(() => {
        this.msg = null;
      }, 2500);
    },
  },
};
</script>

<style scoped>
.page-wrapper {
  padding: 5rem;
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
.error {
  color: red;
  margin-top: 0.5rem;
}
.tags {
  display: flex;
  margin-top: 0.5rem;
}
.tags span {
  color: white;
  background-color: orange;
  border-radius: 0.4rem;
  padding: 1rem;
  margin-left: 0.5rem;
}
</style>
