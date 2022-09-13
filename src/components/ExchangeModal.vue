<template>
  <div class="overlay" @click="closeModal"></div>
  <dialog open>
    <div class="deal">
      <h2>{{ exchange.name }}</h2>
      <div class="deal-wrapper">
        <div>Offering {{ exchange.type }}</div>
        <div>{{ exchange.title }}</div>
      </div>
      <h2>Your Offer</h2>
      <div class="counter-offer">
        <div class="field">
          Would you prefer to exchange credit ?
          <label class="checkbox is-large">
            <input type="checkbox" v-model="checked" />
            Yes
          </label>
        </div>

        <div class="field disabled">
          <label class="label">How Much Credit ?</label>
          <div class="control">
            <input
              v-model="credit"
              class="input"
              type="number"
              placeholder="40"
              :disabled="!checked"
            />
            <i> You don't have enough of credit </i>
          </div>
        </div>
        <div class="field disabled">
          <label class="label">Exchange</label>
          <div class="control">
            <div class="select">
              <select v-model="selected" :disabled="checked">
                <option v-for="ex in user.exchanges" :value="ex" :key="ex.slug">
                  {{ ex.title }}
                </option>
              </select>
            </div>
          </div>
        </div>

        <div v-if="selected">
          Your price is:
          <span class="deal-highlight">{{ selected.price }}</span>
        </div>
        <div class="price price">You are offering the exact same amount</div>
        <i>Allowed difference is not less than 20%</i>
      </div>
    </div>

    <button @click="submitDeal">Make a deal</button>
    <button @click="closeModal">close</button>
  </dialog>
</template>

<script>
export default {
  props: {
    exchange: {
      type: Object,
      user: Object,
    },
  },
  data() {
    return {
      credit: null,
      checked: false,
      selected: null,
      exchanges: null,
    };
  },
  // created() {
  //   console.log(this.$store.getters['user/getUser']);
  // },
  // created() {
  //   this.exchangex =   this.$store.getters['user/getUser'].exchanges || [];
  //   console.log(this.$store.getters['user/getUser']);
  // },
  computed: {
    user() {
      return this.$store.getters['user/getUser'];
    },
  },

  methods: {
    closeModal() {
      this.$emit('closeModal');
    },
    submitDeal() {
      console.log(this.credit);
    },
  },
};
</script>

<style scoped>
.overlay {
  background-color: rgba(0, 0, 0, 0.3);
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
}
dialog {
  position: fixed;
  top: 20vh;
  left: 50%;
  transform: translateX(-50%);
  padding: 2rem;
  border: none;
}
h2 {
  margin-bottom: 1.5rem;
}
.deal-wrapper {
  border: 1px solid gray;
  padding: 0.5rem;
  margin-bottom: 0.5rem;
}
.counter-offer {
  border: 1px solid black;
  padding: 0.5rem;
}
</style>
