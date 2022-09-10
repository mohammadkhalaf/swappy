<template>
  <div class="overlay" @click="closeOverlay"></div>
  <dialog open>
    <div>
      <form>
        <div class="field">
          <label class="title">Username</label>
          <input v-model="userInfo.name" class="input" />
        </div>

        <div class="field">
          <label class="title">Info about user</label>
          <input class="input" />
        </div>
      </form>
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
    user: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      userInfo: { ...this.user },
    };
  },
  methods: {
    closeOverlay() {
      this.$emit('closeOverlay');
    },
    updateProfile() {
      console.log(this.userInfo);
    },
  },
  created() {
    console.log(this.userInfo);
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
