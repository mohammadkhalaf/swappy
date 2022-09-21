<template>
  <exchange-modal
    :exchange="exchange"
    v-if="isOpen"
    @closeModal="closeModal"
    :user="user"
    :availableExchanges="userExchanges"
  ></exchange-modal>
  <section v-if="exchange && exchange.slug" class="wrapper">
    <div class="header">
      <div class="col">
        <h2 class="title">{{ exchange?.title }}</h2>
        <h2 class="type">Type: {{ exchange?.type }}</h2>
        <p class="name">By: {{ exchangeUser?.name }}</p>
        <p class="name">City: {{ exchange?.city }}</p>
      </div>
      <div class="col">
        <div>
          <img class="img" v-if="exchange?.image" src="" alt="item image" />
          <img
            class="img"
            v-else
            src="../assets/img/noimage.gif"
            alt="item image"
          />
          <p class="price">{{ exchange?.price }} $</p>

          <button
            class="btn"
            :disabled="isOwner"
            v-if="canCreateExchange"
            @click="openModal"
          >
            Make exchange
          </button>
          <router-link v-else to="/register"> Login to exchange</router-link>
        </div>
      </div>
    </div>
    <div class="details">
      <p>{{ exchange?.description }}</p>
    </div>
  </section>
</template>

<script>
import ExchangeModal from '../components/ExchangeModal.vue';
export default {
  components: {
    ExchangeModal,
  },
  data() {
    return {
      isOpen: false,
    };
  },
  created() {
    const { slug } = this.$route.params;
    this.$store.dispatch('exchanges/getSingleExchange', slug);
  },

  computed: {
    exchange() {
      return this.$store.getters['exchanges/exchange'];
    },
    exchangeUser() {
      return this.exchange.user;
    },
    user() {
      return this.$store.getters['user/getUser'];
    },
    userExchanges() {
      return this.user?.exchanges || [];
    },
    canCreateExchange() {
      return this.$store.getters['user/isAuth'];
    },
    isOwner() {
      return this.exchange.user.id === this.user.id;
    },
  },
  methods: {
    openModal() {
      this.isOpen = true;
    },
    closeModal() {
      this.isOpen = false;
    },
  },
};
</script>

<style scoped>
.wrapper {
  padding: 7rem;
}
.header {
  background-color: #132130;
  color: white;
  display: flex;
  justify-content: space-between;
  padding: 2rem 5%;
}
.hader img {
  width: 10%;
}
.price {
  font-size: 1.7rem;
}
.btn {
  margin-top: 0.5rem;
  padding: 0.5rem;
  cursor: pointer;
}
.title {
  font-size: 3rem;
  text-transform: capitalize;
}
h2,
p {
  line-height: 145%;
}
.type,
.name {
  font-size: 2rem;
  font-weight: 700;
}

.details {
  padding: 2rem 5%;
  background-color: rgba(197, 197, 197, 0.712);
  margin-top: 2rem;
  display: flex;
  justify-content: space-between;
}
.details {
  font-size: 1.7rem;
}

@media (max-width: 850px) {
  .header {
    flex-direction: column-reverse;
  }
  .col {
    margin-bottom: 3.5rem;
  }
}
@media (max-width: 650px) {
  .name,
  .type {
    font-size: 1.5rem;
  }
  .title {
    font-size: 2.25rem;
  }
  .details {
    font-size: 1.25rem;
  }
}
</style>
