<template>
  <section class="wrapper">
    <div class="column">
      <div>
        <h2>{{ isAuth.name }}</h2>
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

        <div class="item">
          <img src="" alt="" />
          <h3>Offer:300$</h3>
          <h3>request: HP laptop</h3>
          <span>Pending</span>
          <p>User want to exchange item 1 with item 2 for 200$</p>
          <button>Deal</button>
        </div>
      </div>
    </div>
    <div class="column">
      <div>
        <h2>recived</h2>
      </div>
      <div><h2>sent</h2></div>
      <div>
        <h2>Credit: {{ isAuth.credit }}</h2>
      </div>
    </div>
  </section>
</template>

<script>
// import ProfileModal from '../components/ProfileModal.vue';
import ModalComponent from '../components/ModalComponent.vue';
export default {
  components: { ModalComponent },
  data() {
    return {
      isOpen: false,
    };
  },
  methods: {
    openModal() {
      this.isOpen = true;
    },
    closeOverlay() {
      this.isOpen = false;
    },
    uppp() {
      console.log('uppp');
    },

    // updateProfile() {
    //   console.log('up');
    //   // this.$store.dispatch('user/updateUserProfile', this.userInfo);
    //   // this.closeOverlay();
    // },
  },
  watch: {
    isAuth(auth) {
      if (!auth) {
        this.$router.push('/');
      }
    },
  },
  computed: {
    isAuth() {
      return this.$store.getters['user/getUser'];
    },
  },
};
</script>

<style scoped>
.wrapper {
  border: 1px solid red;
  padding: 6rem;
  display: flex;
  justify-content: space-between;
}
.column {
  border: 1px solid green;
  flex-basis: 50%;
  margin-left: 3rem;
}
</style>
