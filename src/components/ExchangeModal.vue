<template>
  <div class="overlay" @click="closeModal"></div>
  <dialog open>
    <div class="deal">
      <h2>{{ exchange.user.name }}</h2>
      <div class="deal-wrapper">
        <div>Offering {{ exchange.type }}</div>
        <div>{{ exchange.title }}</div>
      </div>
      <h2>Your Offer</h2>
      <div class="counter-offer">
        <div class="field">
          Would you prefer to exchange credit ?
          <label class="checkbox is-large">
            <input type="checkbox" v-model="isPriceExchange" />
            Yes
          </label>
        </div>

        <div class="field">
          <label class="label">How Much Credit ?</label>
          <div class="control">
            <input
              v-model="selectedPrice"
              class="input"
              type="number"
              placeholder="40"
              :disabled="!isPriceExchange"
            />
            <i> You don't have enough of credit </i>
          </div>
        </div>
        <div class="field">
          <label class="label">Exchange</label>
          <div class="control">
            <div class="select">
              <select v-model="selectedExchange" :disabled="isPriceExchange">
                <option
                  v-for="exchange in availableExchanges"
                  :value="exchange"
                  :key="exchange.slug"
                >
                  {{ exchange.title }}
                </option>
              </select>
            </div>
          </div>
        </div>

        <div v-if="offerdPrice">
          Your price is:
          <span class="deal-highlight">{{ offerdPrice }}</span>
        </div>

        <div class="price price">{{ priceDiffrenceText }}</div>
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
    },
    availableExchanges: {
      type: Array,
    },
    user: Object,
  },
  data() {
    return {
      selectedPrice: null,
      isPriceExchange: false,
      selectedExchange: null,
    };
  },
  watch: {
    isPriceExchange(value) {
      if (value) {
        this.selectedExchange = null;
      } else {
        this.selectedPrice = null;
      }
    },
  },

  computed: {
    offerdPrice() {
      if (this.isPriceExchange) {
        return this.selectedPrice;
      } else if (this.selectedExchange) {
        return this.selectedExchange.price;
      }
      return null;
    },
    dealDiffrence() {
      if (!this.offerdPrice) {
        return null;
      }
      const priceDiffrence = this.offerdPrice - this.exchange.price;
      return ((priceDiffrence / this.exchange.price) * 100).toFixed(2);
    },
    priceDiffrenceText() {
      if (this.dealDiffrence === '' || this.dealDiffrence === '') {
        return '';
      } else if (this.dealDiffrence === 0) {
        return 'You are offering the same price';
      }
      const diffrenceText = this.dealDiffrence > 0 ? 'higher' : 'lower';
      const roundedDiff = Math.round(this.dealDiffrence * 100) / 100;

      return `The offered price is ${Math.abs(
        roundedDiff
      )}% ${diffrenceText} than the actual price `;
    },
  },

  methods: {
    closeModal() {
      this.$emit('closeModal');
    },
    submitDeal() {
      const deal = {
        title: this.exchange.title,
        fromUser: { name: this.user.name, id: this.user.id },
        exchangedFor: null,
        exchangedTo: this.exchange?.id,
        toUser: this.exchange.user,
        price: null,
      };
      if (this.isPriceExchange) {
        deal.price = this.selectedPrice;
      } else {
        deal.exchangedFor = this.selectedExchange;
      }
      this.$store.dispatch('deals/createDeal', deal);
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
