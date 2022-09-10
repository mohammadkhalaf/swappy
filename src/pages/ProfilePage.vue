<template>
  <section class="wrapper">
    <div class="column">
      <div>
        <h2>Name</h2>
        <button @click="openModal">Update profile</button>
        <teleport to="body">
          <profile-modal
            :user="isAuth"
            @closeOverlay="closeOverlay"
            v-if="isOpen"
          ></profile-modal>
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
      <div><h2>credits</h2></div>
    </div>
  </section>
</template>

<script>
import ProfileModal from '../components/ProfileModal.vue';
export default {
  components: { ProfileModal },
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
