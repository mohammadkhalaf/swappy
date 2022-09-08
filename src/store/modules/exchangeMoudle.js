import { db } from '../../db/index';
import { collection, getDocs } from 'firebase/firestore';

export default {
  namespaced: true,
  state() {
    return {
      exchanges: [],
    };
  },
  actions: {
    async getExchanges(context) {
      const querySnapshot = await getDocs(collection(db, 'exchanges'));
      console.log(querySnapshot);
      const data = querySnapshot.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      });

      context.commit('setExchangs', data);
    },
  },
  mutations: {
    setExchangs(state, payload) {
      state.exchanges = payload;
    },
  },
  getters: {
    exchanges(state) {
      return state.exchanges;
    },
  },
};
