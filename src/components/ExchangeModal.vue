<template>
  <div class="overlay" @click="closeModal"></div>
  <dialog class="dialog" open>
    <div>
      <h2>{{ exchange.user.name }}</h2>
      <div class="deal-wrapper">
        <h3>Offering {{ exchange.type }}</h3>
        <h3>{{ exchange.title }}</h3>
      </div>
      <h2>Your Offer</h2>
      <div class="deal-wrapper">
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
          </div>
        </div>
        <div class="field">
          <label class="label">Exchange</label>
          <div class="control">
            <div>
              <select
                v-model="selectedExchange"
                :disabled="isPriceExchange"
                class="select"
              >
                <option
                  v-for="exchange in availableExchanges"
                  :value="exchange"
                  :key="exchange.slug"
                  class="options"
                  :disabled="
                    checkSentDeals?.find((i) => {
                      return i?.exchangedFor.id === exchange.id;
                    })
                  "
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
        <div class="msg" v-if="checkCredit">
          You do not have enough credit. Remain credit is {{ user.credit }}
        </div>
        <div class="msg" v-if="err">
          {{ err }}
        </div>
      </div>
    </div>

    <button @click="submitDeal" :disabled="checkCredit">Make a deal</button>
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
  created() {
    console.log(this.$store.getters['deals/getSentDeals']);
    this.$store.dispatch('deals/getSentDeals');
  },
  data() {
    return {
      selectedPrice: null,
      isPriceExchange: false,
      selectedExchange: null,
      err: null,
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

    err(value) {
      if (value) {
        setTimeout(() => {
          this.err = null;
        }, 2000);
      }
    },
  },

  computed: {
    checkCredit() {
      if (!this.isPriceExchange) {
        return false;
      }
      return this.user.credit < this.selectedPrice;
    },
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
    checkSentDeals() {
      return this.$store.getters['deals/getSentDeals'];
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
      if (this.selectedExchange || this.selectedPrice) {
        this.$store.dispatch('deals/createDeal', deal);
        this.closeModal();
      } else {
        this.err = 'You have to choose one of your exchanges';
      }
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
.dialog {
  top: 20vh;
  left: 50%;
  transform: translateX(-50%);
  padding: 2rem;
  border: none;
}
h2 {
  margin-bottom: 1.5rem;
  text-transform: capitalize;
}
h2,
h3 {
  line-height: 150%;
}
.deal-wrapper {
  border: 1px solid gray;
  padding: 0.5rem;
  margin-bottom: 0.5rem;
}

button {
  margin-top: 1rem;
  background-color: orange;
  color: white;
  border: none;
  padding: 0.5rem;
  margin-right: 1rem;
  cursor: pointer;
}
.select {
  position: relative;
}
.options {
  color: red;
  border-radius: 100%;
  width: 50%;
}
.msg {
  color: #dc3545;
  font-weight: 700;
}
.field {
  margin-bottom: 1.25rem;
}

@media (max-width: 550px) {
  .option {
    position: absolute;
    top: 30vh !important;
  }
}
</style>
