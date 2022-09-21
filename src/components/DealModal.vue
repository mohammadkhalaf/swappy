<template>
  <div class="overlay" @click="closeModal"></div>
  <dialog open>
    <h1>deal modal</h1>
    <div v-if="sentDeals">
      <div v-for="d in sentDeals" :key="d.id">
        <img
          v-if="d.exchangedFor"
          :src="d.exchangedFor.image"
          alt=""
          class="img"
        />
        <img v-else src="../assets/img/noimage.gif" alt="" class="img" />
        <h2>{{ d.title }}</h2>

        <h2>To {{ d.toUser.email }}</h2>
      </div>
    </div>
    <div v-if="receivedDeals">
      <div v-for="d in receivedDeals" :key="d.id">
        {{ d.title }}
        {{ d.fromUser.email }}

        {{ d.exchangedFor?.title }}
        <img
          v-if="d.exchangedFor"
          :src="d.exchangedFor?.image"
          alt=""
          class="img"
        />
        <img v-else src="../assets/img/noimage.gif" alt="" class="img" />
        <!-- <h2>{{ d.title }}</h2>
        <h2>To {{ d.fromUser.email }}</h2>  -->

        <div>
          <button :disabled="d.status === 'accepted'" @click="accept(d)">
            Accept
          </button>
          <button :disabled="d.status === 'accepted'" @click="decline(d)">
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
