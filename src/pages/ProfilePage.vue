<template>
  <div class="container">
    <section class="wrapper">
      <div class="column">
        <div>
          <h2>Name: {{ isAuth?.name }}</h2>
          <button class="btn" @click="openModal">Update profile</button>
          <teleport to="body">
            <modal-component
              @closeOverlay="closeOverlay"
              v-if="isOpen"
              :isAuth="isAuth"
            >
              <form class="form">
                <h2 class="form-title">Update your Profile</h2>
                <div class="field">
                  <label class="title">Username</label>
                  <input v-model="isAuth.name" class="input" />
                </div>

                <div class="field">
                  <label class="title">Info about user</label>
                  <input class="input" />
                </div>
                <div class="field">
                  <label class="title">Your city</label>
                  <input v-model="isAuth.city" class="input" />
                </div>
                <div class="field">
                  <label class="title">Phone</label>
                  <input v-model="isAuth.phone" class="input" />
                </div>
              </form>
            </modal-component>
          </teleport>
        </div>
      </div>
      <div class="column">
        <div
          @click="setTab('received')"
          :class="{ active: openTab === 'received' }"
        >
          <h2>Recived : {{ isAuth && receivedDeals?.length }}</h2>
        </div>
        <div @click="setTab('sent')" :class="{ active: openTab === 'sent' }">
          <h2>Sent :{{ isAuth && sentDeals?.length }}</h2>
        </div>
        <div>
          <h2>Credit: {{ isAuth?.credit }}</h2>
        </div>
      </div>
    </section>
    <div
      v-if="
        (isAuth && receivedDeals.length > 0) || (isAuth && sentDeals.length > 0)
      "
      class="deal-container"
    >
      <div v-if="openTab === 'received'" class="deals">
        <div class="deals" v-for="deal in receivedDeals" :key="deal.id">
          <div class="deal">
            <img
              v-if="deal.exchangedFor?.image"
              :src="deal.exchangedFor.image"
              alt=""
              class="img"
            />
            <img v-else src="../assets/img/noimage.gif" alt="" class="img" />
            <h3>
              Swap {{ deal.toExchange.title }} for
              {{ deal.price || deal.exchangedFor.title }}
            </h3>
            <p class="status">status {{ deal.status }}</p>
            <teleport to="body">
              <deal-modal
                :receivedDeals="receivedDeals"
                @close-modal="closeDealModal"
                v-if="dealModalOpen"
              ></deal-modal>
            </teleport>

            <button class="btn" @click="openDealModal">Check a deal</button>
          </div>
        </div>
      </div>
      <div v-if="openTab === 'sent'" class="deals">
        <div v-for="deal in sentDeals" :key="deal.id" class="deal">
          <div>
            <img
              v-if="deal.exchangedFor?.image"
              :src="deal.exchangedFor.image"
              alt=""
              class="img"
            />
            <img v-else src="../assets/img/noimage.gif" alt="" class="img" />
            <h3>
              {{ deal.title }} for
              {{ deal.price || deal.exchangedFor.title }}
            </h3>
            <p v-if="deal.status === 'accepted'">
              {{ deal.toUser.name }} has accepted the deal. Send
              {{ deal.toUser.name }} email at {{ deal.toUser.email }}
            </p>
            <p v-if="deal.status === 'declined'">
              {{ deal.toUser.name }} has declined the deal
            </p>

            <button class="btn" @click="openDealModal">Check a deal</button>
            <p class="status">status {{ deal.status }}</p>
            <teleport to="body">
              <deal-modal
                :sentDeals="sentDeals"
                @close-modal="closeDealModal"
                v-if="dealModalOpen"
              ></deal-modal>
            </teleport>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ModalComponent from '../components/ModalComponent.vue';
import DealModal from '../components/DealModal.vue';
export default {
  components: { ModalComponent, DealModal },
  data() {
    return {
      isOpen: false,
      openTab: 'received',
      dealModalOpen: false,
    };
  },
  methods: {
    setTab(tab) {
      this.openTab = tab;
    },
    openModal() {
      this.isOpen = true;
    },
    openDealModal() {
      this.dealModalOpen = true;
    },
    closeOverlay() {
      this.isOpen = false;
    },
    closeDealModal() {
      this.dealModalOpen = false;
    },
  },
  watch: {
    user(auth) {
      if (!auth) {
        this.$router.push('/');
      }
    },
  },
  created() {
    this.$store.dispatch('deals/getDeals');
    this.$store.dispatch('deals/getSentDeals');
  },
  computed: {
    cotnact(x) {
      console.log(x);
      return 'mailto: ' + x;
    },
    isAuth() {
      return this.$store.getters['user/getUser'];
    },
    receivedDeals() {
      return this.$store.getters['deals/getReceivedDeals'];
    },
    sentDeals() {
      return this.$store.getters['deals/getSentDeals'];
    },
  },
};
</script>

<style scoped>
.container {
  padding: 6rem;
}
.wrapper {
  display: flex;
  justify-content: space-between;
}

.deals {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(30rem, 1fr));
  gap: 2.5rem;
}
.deal-container {
  margin-top: 2rem;
}

.column {
  flex-basis: 50%;
  display: flex;
  justify-content: space-between;
}

.column:nth-child(2) div {
  flex: 1;
  cursor: pointer;
}

.active {
  border-bottom: 2px solid orange;
}
.status {
  background-color: orange;
  width: fit-content;
  padding: 0.5rem;
  margin-top: 1rem;
  font-size: 1.25srem;
  font-weight: bold;
  letter-spacing: 0.1rem;
}

.btn {
  margin-top: 1em;
  background-color: orange;
  border: none;
  padding: 0.5rem;
  cursor: pointer;
}

.field {
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
}
.field .title {
  font-size: 1.5rem;
}
.input {
  height: 2rem;
}
.form-title {
  text-align: center;
  margin-bottom: 1.5rem;
}
.img {
  width: 100%;
  height: 20rem;
}
</style>
