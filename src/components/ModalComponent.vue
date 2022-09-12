<template>
  <div class="overlay" @click="closeOverlay"></div>
  <dialog open>
    <slot></slot>
    <div>
      <footer class="modal-card-foot">
        <button @click="updateProfile" class="button is-success">
          Save changes
        </button>
        <button @click="closeOverlay" class="button">Cancel</button>
      </footer>
    </div>
  </dialog>
</template>

<script>
export default {
  props: {
    isAuth: {
      type: Object,
    },
  },
  methods: {
    closeOverlay() {
      this.$emit('closeOverlay');
    },

    updateProfile() {
      console.log('asdfaf');
      console.log(this.isAuth);
      this.$store.dispatch('user/updateUserProfile', this.isAuth);
      this.closeOverlay();
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
}
</style>
