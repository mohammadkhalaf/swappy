<template>
  <div class="overlay" @click="closeModal"></div>
  <dialog open class="dialog">
    <h1 class="dialog-header">Your deals</h1>
    <div v-if="sentDeals">
      <div v-for="d in sentDeals" :key="d.id" class="deal">
        <img
          v-if="d.exchangedFor?.image"
          :src="d.exchangedFor.image"
          alt=""
          class="img"
        />
        <img v-else src="../assets/img/noimage.gif" alt="" class="img" />
        <h2>{{ d.title }}</h2>

        <h3>To {{ d.toUser.email }}</h3>
        <p v-if="d.status === 'accepted'" class="response accepted">
          {{ d.toUser.name }} has accepted the deal you get contact at
          {{ d.toUser.email }}
        </p>
        <p v-if="d.status === ' response declined'">
          {{ d.toUser.name }} has declined the deal.
        </p>
      </div>
    </div>
    <div v-if="receivedDeals">
      <div v-for="d in receivedDeals" :key="d.id" class="deal">
        <h2>
          {{ d.title }} from {{ d.fromUser.name }} for

          {{ d.toExchange?.title }}
        </h2>

        <img
          v-if="d.exchangedFor?.image"
          :src="d.exchangedFor?.image"
          alt=""
          class="img"
        />
        <img v-else src="../assets/img/noimage.gif" alt="" class="img" />
        <!-- <h2>{{ d.title }}</h2>
        <h2>To {{ d.fromUser.email }}</h2>  -->
        <div>
          <button
            class="btn"
            :disabled="d.status === 'accepted'"
            @click="accept(d)"
          >
            Accept
          </button>
          <button
            class="btn"
            :disabled="d.status === 'accepted'"
            @click="decline(d)"
          >
            Decline
          </button>
        </div>
        <p v-if="d.status === 'accepted'">
          You have accpeted the deal send {{ d.toUser.name }} email at
          {{ d.toUser.email }}
        </p>
      </div>
    </div>
  </dialog>
</template>

<script>
export default {
  props: ['sentDeals', 'receivedDeals'],
  created() {
    console.log(this.receivedDeals);
  },
  methods: {
    closeModal() {
      this.$emit('closeModal');
    },
    accept(d) {
      console.log(d);
      this.$store.dispatch('deals/acceptDeal', d);
      this.closeModal();
    },
    decline(d) {
      this.$store.dispatch('deals/declineDeal', d);
      this.closeModal();
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
  max-height: 60vh;
  overflow-y: auto;
}
.dialog-header {
  text-align: center;
  margin-bottom: 1.5rem;
}

h2 {
  margin-bottom: 1.5rem;
  text-transform: capitalize;
  margin-top: 0.5rem;
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
.accepted {
  margin-top: 1rem;
  font-weight: 700;
  font-size: 1.25rem;
}

.response.accepted {
  color: #2ba948;
}
.response.declined {
  color: #dc3545;
}
.deal {
  margin-bottom: 2rem;
}
.btn {
  background: orange;
  padding: 0.5rem;
  border: none;
  margin: 1rem 1rem 0 0;
  cursor: pointer;
}
</style>
