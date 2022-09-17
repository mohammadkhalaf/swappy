import { db } from '../../db/index';
import {
  addDoc,
  // addDoc,
  collection,
  collectionGroup,
  doc,
  getDocs,
  query,
  where,
  getDoc,
  // where,
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
      commit('setExchange', {});
      const docQuery = query(
        collection(db, 'exchanges'),
        where('slug', '==', slug)
      );
      const querySnap = await getDocs(docQuery);
      const exchange = querySnap.docs[0].data();
      const userSnap = await (await getDoc(exchange.user)).data();

      exchange.user = userSnap;

      commit('setExchange', exchange);
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
      const userRef = doc(db, 'users', rootState.user.user.id);
      data.user = userRef;
      data.slug = slugify(`${data.title} ${Date.now()}`, {
        lower: true,
        strict: true,
      });

      await addDoc(collection(db, 'exchanges'), data);
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
