import { db } from '../../db/index';
import {
  addDoc,
  collection,
  collectionGroup,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
import slugify from 'slugify';

export default {
  namespaced: true,
  state() {
    return {
      exchanges: [],
      exchange: {},
    };
  },
  actions: {
    async getSingleExchange({ commit }, slug) {
      const q = query(collection(db, 'exchanges'), where('slug', '==', slug));
      const querySnapshot = (await getDocs(q)).docs[0].data();

      commit('setExchange', querySnapshot);
      return querySnapshot;
    },
    async getExchanges(context) {
      const q = query(collectionGroup(db, 'exchanges'));
      const querySnapshot = await getDocs(q);

      const exchanges = querySnapshot.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      });

      context.commit('setExchangs', exchanges);
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
    setExchange(state, payload) {
      state.exchange = payload;
    },
  },
  getters: {
    exchanges(state) {
      return state.exchanges;
    },
    exchange(state) {
      return state.exchange;
    },
  },
};
