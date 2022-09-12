import { db } from '../../db/index';
import { addDoc, collection, getDocs } from 'firebase/firestore';
import slugify from 'slugify';

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

      const data = querySnapshot.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      });

      context.commit('setExchangs', data);
    },
    async createExchanges({ rootState }, data) {
      const numb = Math.floor(Math.random() * 10000);
      const id = rootState.user.user.id;
      // const userRef = doc(db, 'users', id);
      // console.log(id);
      // data.user = userRef;
      const created = await addDoc(collection(db, 'exchanges'), {
        ...data,
        slug: slugify(`${data.title} ${numb}`, {
          replacement: '-',

          lower: false,
          strict: false,

          trim: true,
        }),
        user: id,
        name: rootState.user.user.name,
      });

      return created;
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
