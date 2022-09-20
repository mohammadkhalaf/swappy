<template>
  <div class="container">
    <section class="wrapper">
      <div class="column">
        >
        <div>
          <h2>{{ isAuth?.name }}</h2>
          <button @click="openModal">Update profile</button>
          <teleport to="body">
            <!-- <profile-modal
            :user="isAuth"
            @closeOverlay="closeOverlay"
            v-if="isOpen"
          ></profile-modal> -->
            <modal-component
              @closeOverlay="closeOverlay"
              v-if="isOpen"
              :isAuth="isAuth"
            >
              <form>
                <h2>form of user</h2>
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
          <h2>recived : {{ isAuth && receivedDeals?.length }}</h2>
        </div>
        <div @click="setTab('sent')" :class="{ active: openTab === 'sent' }">
          <h2>sent :{{ isAuth && sentDeals?.length }}</h2>
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
      <div v-if="openTab === 'received'" class="col">
        <div class="deals" v-for="deal in receivedDeals" :key="deal.id">
          <div class="deal">
            <img
              v-if="deal.exchangedFor"
              :src="deal.exchangedFor.image"
              alt=""
              class="img"
            />
            <img v-else src="../assets/img/noimage.gif" alt="" class="img" />
            <h3>
              Swap for
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
            <p>{{ deal.fromUser.email }}</p>
            <button class="btn" @click="openDealModal">Check a deal</button>
          </div>
        </div>
      </div>
      <div v-if="openTab === 'sent'" class="col">
        <div class="deals" v-for="deal in sentDeals" :key="deal.id">
          <div class="deal">
            <img
              v-if="deal.exchangedFor"
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
// import ProfileModal from '../components/ProfileModal.vue';
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
    uppp() {
      console.log('uppp');
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
  border: 1px solid red;
  padding: 6rem;
}
.wrapper {
  display: flex;

  justify-content: space-between;
}

.deal-container {
  display: flex;
}
.column {
  border: 1px solid green;
  flex-basis: 50%;
}
.col {
  display: flex;
}
.deals {
  max-width: 25rem;
  border: solid orange 1px;
}
/* .img {
  width: 100%;
  height: 60%;
} */
.active {
  color: purple;
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
}
</style>
