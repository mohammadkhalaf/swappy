import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
export default {
  namespaced: true,
  state() {
    return {
      //   isLoading: false,
      error: null,
    };
  },
  mutations: {
    setError(state, error) {
      console.log('from mutaion' + error);
      state.error = error;
    },
    removeAlert(state) {
      state.error = null;
    },
  },

  actions: {
    async register({ commit, dispatch }, payload) {
      const { email, password } = payload;
      try {
        const auth = getAuth();
        const userCredetials = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        return userCredetials.user;
      } catch (error) {
        commit('setError', error.message);
        dispatch('remvoeAlert');
      }
    },
    async remvoeAlert({ commit }) {
      setTimeout(() => {
        commit('removeAlert');
      }, 3000);
    },
  },
  getters: {
    getErorrMsg(state) {
      return state.error;
    },
  },
};
